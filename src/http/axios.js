import axios from 'axios'
import qs from 'qs'
import showMessage from 'iview/src/components/message'
import LoadingBar from 'iview/src/components/loading-bar'
import { util } from 'util'
// axios 配置
axios.defaults.timeout = 20000
axios.defaults.baseURL = ''
// 允许向其他域发送cookie
// axios.defaults.withCredentials = true
var baseURL = 'http://192.168.23.1:9518/'
if (location.host.indexOf('prep') > -1 || location.host.indexOf('localhost') > -1) {
  baseURL = 'https://prep.tingjiandan.com/'
} else if (location.host.indexOf('open') > -1) {
  baseURL = 'https://open.tingjiandan.com/'
}
const service = axios.create({
  timeout: 20000
})
// http request 拦截器
axios.interceptors.request.use(
  config => {
    LoadingBar.start()
    config.url = baseURL + config.url
    if (config.url.indexOf('loginpost') > -1 || config.url.indexOf('loginWX') > -1) {
      config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
      config.data = qs.stringify(config.data)
    } else if (config.url.indexOf('filedepot') > -1) {
      config.headers.post['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers.post['Content-Type'] = 'application/text'
    }
    return config
  },
  err => {
    LoadingBar.error()
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.isSuccess === '9') {
      //登录超时
      LoadingBar.finish()
      location.href = location.origin + '/question/#/login'
    } else if (response.data.isSuccess === '4') {
      util.setCookie('prom', '', -1)
      showMessage.error(response.data.msg)
      LoadingBar.error()
      setTimeout(() => {
        location.href = location.origin + '/question/#/login'
      }, 2000)
    } else if (response.data.isSuccess === '1' || response.data.isSuccess === '2') { //业务异常
      // console.log(error)
      showMessage.error(response.data.msg)
      LoadingBar.error()
      return Promise.reject(response.data.msg)
    } else {
      LoadingBar.finish()
      return response.data
    }
  },
  error => {
    if (error.response) {
      showMessage.error(error.message)
      switch (error.response.status) {
        case 401:
      }
    } else {
      LoadingBar.error()
      showMessage.error(error.message)
      return Promise.reject(error)
    }
    showMessage.error(error.message)
    LoadingBar.error()
    return Promise.reject(error.response.data)
  }
)

export default axios
