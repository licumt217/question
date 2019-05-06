
import axios from 'axios'
// axios 配置
axios.defaults.timeout = 20000;
axios.defaults.baseURL = '';

var baseURL = 'http://192.168.23.1:9518/'
if (location.host.indexOf('prep') > -1 || location.host.indexOf('localhost') > -1) {
    baseURL = 'http://localhost:3000/'
} else if (location.host.indexOf('open') > -1) {
    baseURL = 'https://open.tingjiandan.com/'
}


// http request 拦截器
axios.interceptors.request.use(
    config => {

        config.url = baseURL + config.url
        // config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        return config;
    },
    err => {
        console.log(55555,err)
        return Promise.reject(err);
    });
// http response 拦截器
axios.interceptors.response.use(
    response => {

        let data=response.data;

        if (data.isSuccess === '0' ) {
            return Promise.resolve(data.data);
        }else {
            console.log(4,data.errorMsg)
            return Promise.reject(data.errorMsg);
        }
    },
    error => {


        let errorMsg="请求异常"
        if(error.message && error.message==='Network Error'){
            errorMsg="网络异常"
        }else if(error.response.status===404){
            errorMsg="请求地址不存在"
        }


        return Promise.reject(errorMsg)

    }
);

export default axios;
