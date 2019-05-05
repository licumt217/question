/**
 * Created by liqiang on 2017/6/2.
 */
/**
 * Created by liqiang on 2017/5/26.
 */

var constants = function () {
  switch (process.env.NODE_ENV) {
    case 'prod':
      return require('../../../config/settings.prod')
    case 'prep':
      return require('../../../config/settings.prep')
    case 'test':
      return require('../../../config/settings.test')
    case 'dev':
      return require('../../../config/settings.dev')
    default:
      return require('../../../config/settings.local')
  }
}()

let validates = {

  /**
   * 是否全是数字
   * @param p
   * @returns
   */
  isAllNum: function (p) {
    var re = /^\d*$/
    return re.test(p)
  },
  /**
   * 验证手机号
   */
  isValidPhone: function (p) {
    var re = /^1\d{10}$/
    return re.test(p)
  },
  /**
   * 验证身份证号
   */
  isValidID: function (p) {
    p = String(p).toUpperCase()
    var re = /(^\d{15}$)|(^\d{17}([0-9]|X$))/
    return re.test(p)
  },
  /**
   * 验证必须正数，小数点后两位
   */
  isNumberWith2AfterDot: function (p) {

    var re = /^[0-9]{0,5}(\.[0-9]{0,2})?$/
    return re.test(p)
  },
  /**
   * 信用卡有效期输入是否合法01/18
   * @param p
   */
  isValidCreditCardExpireDate: function (p) {
    var re = /^\d{2}\/\d{2}$/
    return re.test(p)
  }
}

var util = {
  urlContains: function (param) {
    return location.href.indexOf(param) != -1
  },
  /**
   * 取得url后边的参数
   * @param name
   * @returns
   */
  getUrlParam: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r !== null) return unescape(r[2])
    return null
  },

  /**
   * 判断给定对象是否为空
   * @param str
   * @returns {Boolean}
   */
  isEmpty: function (str) {
    var flag = false
    if (!str || str === 'null' || str === 'undefined' || str === '0' || str.length == 0) {
      flag = true
    }
    return flag
  },

  encodeUrl: function (url) {

    return encodeURIComponent(url)
  },

  Map: function () {
    var Struct = function (key, value) {
      this.key = key
      this.value = value
    }
    var put = function (key, value) {
      for (var i = 0; i < this.arr.length; i++) {
        if (this.arr[i].key === key) {
          this.arr[i].value = value
          return this
        }
      }
      this.arr[this.arr.length] = new Struct(key, value)
      return this
    }
    var get = function (key) {
      for (var i = 0; i < this.arr.length; i++) {
        if (this.arr[i].key === key) {
          return this.arr[i].value
        }
      }
      return null
    }
    //通过索引返回相应的key对应的value
    var getByIndex = function (index) {
      var exp = /^(([1-9])[\d]{0,15}|0)$/
      var returnStr = null
      if (exp.test(index) && (index < this.arr.length)) {
        returnStr = this.arr[index].value
      }
      return returnStr
    }
    //通过索引返回对应的key
    var getKeyByIndex = function (index) {
      var exp = /^(([1-9])[\d]{0,15}|0)$/
      var returnStr = null
      if (exp.test(index) && (index < this.arr.length)) {
        returnStr = this.arr[index].key
      }
      return returnStr
    }
    var remove = function (key) {
      //var v;
      for (var i = 0; i < this.arr.length; i++) {
        if (this.arr[i].key === key) {
          //从数组删除此元素
          this.arr.splice(i, 1)
          return
        }
      }
    }
    var toJson = function () {
      var array = this
      return JSON.stringify(new function () {
        if (array.size() > 0) {
          for (var i = 0; i < array.size(); i++) {
            this[array.getKeyByIndex(i)] = array.getByIndex(i)
          }
        }
      })
    }
    var size = function () {
      return this.arr.length
    }
    var isEmpty = function () {
      return this.arr.length <= 0
    }
    this.arr = new Array()
    this.get = get
    this.getByIndex = getByIndex
    this.getKeyByIndex = getKeyByIndex
    this.put = put
    this.remove = remove
    this.size = size
    this.isEmpty = isEmpty
    this.toJson = toJson
  },

  getParamFromStr: function (str, name) {
    str = str.substring(str.indexOf('?'))
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = str.substr(1).match(reg)
    if (r !== null) return r[2]
    return null
  },
  //取后台推送的链接中的参数数组
  getUrlArray: function () {
    var arr = []
    if (window.location.href.split('?').length > 1) {
      if (window.location.href.split('?')[1].split('=')[0].indexOf('data') != -1) {
        arr = window.location.href.split('?')[1].split('=')[1].split('&')[0].split('tingjiandan')
      }
    }
    return arr
  },

  /**
   * 设置授权码字段
   */
  setAuthCodeColumn: function (authCodeColumn) {
    sessionStorage.authCodeColumn = authCodeColumn
  },
  /**
   * 获取授权码字段
   */
  getAuthCodeColumn: function () {
    var returnStr = sessionStorage.authCodeColumn
    if (util.isEmpty(sessionStorage.authCodeColumn)) {
      returnStr = util.authCodeColumns.baidu
    }
    return returnStr
  },

  getCookie: function (key) {
    return localStorage.getItem(key)
  },
  getSession: function (key) {
    return sessionStorage.getItem(key)
  },
  removeCookie: function (key) {
    if (key) {
      localStorage.removeItem(key)
    }
  },
  setSession: function (key, value) {
    if (sessionStorage) {
      try {
        sessionStorage.removeItem(key)
        sessionStorage.setItem(key, value)
      } catch (oException) {
        if (oException.name === 'QuotaExceededError') {
          //console.log('超出本地存储限额！');
          //如果历史信息不重要了，可清空后再设置
          sessionStorage.clear()
          sessionStorage.setItem(key, value)
        }
      }
    }

  },
  removeSession: function (key) {
    if (key) {
      sessionStorage.removeItem(key)
    }
  },

  /**
   * 清空本地所有localStorage中的信息
   */
  clearAllCookies: function () {
    localStorage.clear()
    sessionStorage.clear()
  },

  /**
   * 判断当前浏览器是否支持html5
   * @returns
   */
  isSupportH5: function () {
    var flag = false
    if (window.sessionStorage) {
      flag = true
    }
    return flag
  },
  /**
   *取得本地存储中的userId
   */
  getUserId: function () {
    return sessionStorage.commonUserId
  },

  setUserId: function (userId) {
    sessionStorage.commonUserId = userId
    sessionStorage.userId = userId
  },

  /**
   *取得本地存储中的phone
   */
  getPhone: function () {
    return sessionStorage.phone
  },
  /**
   *取得本地存储中的phone
   */
  setPhone: function (phone) {
    sessionStorage.phone = phone
  },

  /**
   * 构造通用的对象，方便转换为json字符串。参数为map对象
   */
  commObj: function (map) {
    var obj = {}
    if (map && map.size() > 0) {
      var curKey = null,
        curValue = null
      for (var i = 0; i < map.size(); i++) {
        curKey = map.getKeyByIndex(i)
        curValue = map.getByIndex(i)
        obj[curKey] = curValue
      }
    }
    return obj
  },
  /**
   * 返回对象的json字符串
   * @param map
   * @returns
   */
  makeJsonStr: function (map) {
    var commObj = util.commObj(map)

    return JSON.stringify(commObj)
  },

  /**
   * 返回当前日期的8位日期
   * @returns {String}
   */
  getNowEightDate: function () {
    var nowDate = new Date()

    var y = nowDate.getFullYear()
    var m = nowDate.getMonth() + 1
    var d = nowDate.getDate()
    var h = nowDate.getHours()
    var mi = nowDate.getMinutes()
    var s = nowDate.getSeconds()
    m = String(m)
    d = String(d)
    h = String(h)
    mi = String(mi)
    s = String(s)
    if (m.length < 2) {
      m = '0' + m
    }
    if (d.length < 2) {
      d = '0' + d
    }
    if (h.length < 2) {
      h = '0' + h
    }
    if (mi.length < 2) {
      mi = '0' + mi
    }
    if (s.length < 2) {
      s = '0' + s
    }
    return y + m + d
  },
  /**
   * 返回当前日期，用给定分隔符分割，如果传入了日期，则用指定日期代替当前日期
   * @param symbol
   * @param nowDate
   * @returns {*}
   */
  getNowDateStr: function (symbol, nowDate) {
    if (util.isEmpty(nowDate)) {
      nowDate = new Date()
    }
    if (util.isEmpty(symbol)) {
      symbol = '-'
    }

    var y = nowDate.getFullYear()
    var m = nowDate.getMonth() + 1
    var d = nowDate.getDate()
    var h = nowDate.getHours()
    var mi = nowDate.getMinutes()
    var s = nowDate.getSeconds()
    m = String(m)
    d = String(d)
    h = String(h)
    mi = String(mi)
    s = String(s)
    if (m.length < 2) {
      m = '0' + m
    }
    if (d.length < 2) {
      d = '0' + d
    }
    if (h.length < 2) {
      h = '0' + h
    }
    if (mi.length < 2) {
      mi = '0' + mi
    }
    if (s.length < 2) {
      s = '0' + s
    }
    return y + symbol + m + symbol + d
  },
  /**
   * 返回当前日期或给定日期的用指定字符分割的时间字符串
   * @param symbol
   * @param nowDate
   * @returns {number}
   */
  getNowSixTime: function (symbol, nowDate) {
    if (util.isEmpty(symbol)) {
      symbol = ':'
    }
    if (util.isEmpty(nowDate)) {
      nowDate = new Date()
    }

    var y = nowDate.getFullYear()
    var m = nowDate.getMonth() + 1
    var d = nowDate.getDate()
    var h = nowDate.getHours()
    var mi = nowDate.getMinutes()
    var s = nowDate.getSeconds()
    m = String(m)
    d = String(d)
    h = String(h)
    mi = String(mi)
    s = String(s)
    if (m.length < 2) {
      m = '0' + m
    }
    if (d.length < 2) {
      d = '0' + d
    }
    if (h.length < 2) {
      h = '0' + h
    }
    if (mi.length < 2) {
      mi = '0' + mi
    }
    if (s.length < 2) {
      s = '0' + s
    }
    return h + mi + s
  },

  getHmsByTime: function (symbol, nowDate) {
    if (util.isEmpty(symbol)) {
      symbol = ':'
    }
    if (util.isEmpty(nowDate)) {
      nowDate = new Date()
    }

    var h = nowDate.getHours()
    var mi = nowDate.getMinutes()
    var s = nowDate.getSeconds()
    h = String(h)
    mi = String(mi)
    s = String(s)
    if (h.length < 2) {
      h = '0' + h
    }
    if (mi.length < 2) {
      mi = '0' + mi
    }
    if (s.length < 2) {
      s = '0' + s
    }
    return h + symbol + mi + symbol + s
  },

  /**
   * 设置文档标题
   * @param title
   */
  setTitle: function (title) {
    if (util.isEmpty(title)) {
      title = ''
    }
    document.title = title
  },
  /**
   * 获取当前文档标题
   * @returns {*|string}
   */
  getTitle: function () {
    return document.title
  },

  clone: function (obj) {
    if (typeof obj === 'object') {
      var returnObj = null
      if ($.isArray(obj)) {
        returnObj = []
        for (var i = 0; i < obj.length; i++) returnObj.push(obj[i])
      } else {
        returnObj = {}
        for (var key in obj) {
          returnObj[key] = util.clone(obj[key])
        }
      }
      return returnObj
    }
    return obj
  },

  freshMain: function () {
    location.reload()
  },

  /**
   * 给定日期加减给定月份
   * @param date
   * @param num
   */
  sysdateAddMons: function (num, symbol, date) {
    if (util.isEmpty(symbol)) {
      symbol = '.'
    }
    if (util.isEmpty(date)) {
      date = new Date()
    }
    date.setMonth(date.getMonth() + num)
    return date.getFullYear() + symbol + util.transNum2Two((date.getMonth() + 1)) + symbol + util.transNum2Two(date.getDate())

  },

  /**
   * 将给定的数字转换为01，02类的
   */
  transNum2Two: function (num) {
    var returnStr = ''
    if (num < 10) {
      returnStr = '0' + num
    } else {
      returnStr = String(num)
    }
    return returnStr
  },

  /**
   * 将毫秒数的时间戳转化日期Date型
   */
  transMilli2Date: function (millis) {
    var startDate = new Date()
    startDate.setTime(millis)
    return startDate
  },
  /**
   * 将毫秒数的时间戳转化日期Date型字符串
   */
  transMilli2DateStr: function (millis) {
    var symbol = '.'
    var date = new Date()
    date.setTime(millis)
    return date.getFullYear() + symbol + util.transNum2Two((date.getMonth() + 1)) + symbol + util.transNum2Two(date.getDate())
  },

  /**
   *设置本地存储中的openId
   */
  setOpenId: function (openId) {
    sessionStorage.openId = openId
  },
  /**
   *取得本地存储中的openId
   */
  getOpenId: function () {
    return sessionStorage.openId
  },
  /**
   * tjd日志输出，简单包装下console.log (这个有点长)，
   * @param msg
   */
  log: function (msg) {
    console.log('tjd_log_:' + msg)
  },

  setItem: function (key, value) {
    sessionStorage.setItem(key, value)
  },
  getItem: function (key) {
    return sessionStorage.getItem(key)
  },
  removeItem: function (key) {
    sessionStorage.removeItem(key)
  },

  /**
   * 当前页面是否在微信浏览器中打开的
   * @returns {boolean}
   */
  isWeixinBrowser: function () {
    var flag = false
    var ua = window.navigator.userAgent.toLowerCase()
    if (!util.isEmpty(ua.match(/MicroMessenger/i)) && ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
      flag = true
    }
    return flag
  },

  /**
   * 当前页面是否在支付宝浏览器中打开的
   * @returns {boolean}
   */
  isAlipayBrowser: function () {
    var flag = false
    var ua = window.navigator.userAgent.toLowerCase()
    if (!util.isEmpty(ua.match(/alipay/i)) && ua.match(/alipay/i)[0] === 'alipay') {
      flag = true
    }
    return flag
  },
  /**
   * 微信授权页面
   * @param pageUrl 重定向页面地址
   * @param paramArray 页面需要挂载的参数
   * @returns {string}
   */
  getWechatAuthUrl: function (pageUrl, paramArray) {
    var str = 'https://open.weixin.qq.com/connect/oauth2/authorize?appId=' + constants.wechatAppId + '&redirect_uri='
    var tail = '&response_type=code&scope=snsapi_base&state=about#wechat_redirect'
    var paramStr = ''
    str += constants.tcweixinUrl

    str += ('index.html#/' + pageUrl)
    if (!util.isEmpty(paramArray)) {
      for (var i = 0; i < paramArray.length; i++) {
        if (i === 0) {
          paramStr += '?data='
          paramStr += paramArray[i]
        } else {
          paramStr += (constants.splitParam + paramArray[i])
        }
      }
    }

    str += paramStr
    str += tail
    return str

  },

  /**
   * 检查当前网络是否可用
   */
  isNetOnline: function () {
    return navigator.onLine
  },

  /**
   * 是否在进行python脚本测试
   */
  isTest: function () {
    var flag = false
    if (sessionStorage.isTest) {
      flag = true
    }
    return flag
  },
  handleTest: function () {
    if (sessionStorage.isTest) {
      var a = $('*[v-on\\:touchend]')
      console.log(a.length)
      for (var i = 0; i < a.length; i++) {
        var origin = $(a[i]).parent().html()
        if (!util.isEmpty(origin)) {
          $(a[i]).parent().html(origin.replaceAll('v-on:touchend', '@click'))
        }

      }
    }
  },
  /**
   * 取得类似url的字符串中给定的key对应的值
   */
  getStrParam: function (str, key) {
    if (util.isEmpty(str) || str.indexOf('?') == -1 || str.indexOf(key) == -1) {
      return -1
    } else {
      var valArray = str.split('?')[1].split('&')
      var obj = {}
      valArray.forEach(function (item) {
        var original = item
        item = item.split('=')
        obj[item[0]] = original.substring(item[0].length + 1)
      })
      return obj[key]
    }
  },
  /**
   * 八位日期字符串转为日期对象
   */
  eight2Date: function (str) {
    var y = str.substring(0, 4)
    var m = str.substring(4, 6)
    var d = str.substring(6, 8)
    var splitParam = '-'
    return new Date(y + splitParam + m + splitParam + d)

  },
  /**
   * 八位日期字符串转为日期字符串
   */
  eight2DateStr: function (str, splitP) {
    var y = str.substring(0, 4)
    var m = str.substring(4, 6)
    var d = str.substring(6, 8)
    var splitParam = splitP || '-'
    return y + splitParam + m + splitParam + d

  },
  /**
   * 八位日期字符串转为日期字符串
   */
  milli2DateStr: function (milli, splitP) {
    var date = new Date()
    date.setTime(milli)
    var y = date.getFullYear()
    var m = util.fixZero(date.getMonth() + 1)
    var d = util.fixZero(date.getDate())
    var splitParam = splitP || '-'
    return y + splitParam + m + splitParam + d

  },

  /**
   * 第一个日期参数是否早于第二个日期(毫秒数)
   * @param date1
   * @param date2
   * @returns {boolean}
   */
  isBefore: function (date1, date2) {
    return date1 < date2

  },

  /**
   * 给定日期加减给定日、或月或周、或年,返回毫秒数
   * @param num 整数代表+，负数代表-
   * @param symbol 日期的链接符号
   * @param date
   * @param type 1,2,3,4,5分别代表小时、日、周、月、年
   * @returns {String}
   */
  dateAdd: function (date, num, type) {
    date = date || new Date()
    if (!type) {
      type = '4' //默认月
    }
    if (!num) {
      num = 0 //默认0,返回自身的时间戳
    }
    switch (type) {
      case '1': //小时
        break
      case '2': //天
        date.setDate(date.getDate() + num)
        break
      case '3': //周
        date.setDate(date.getDate() + num * 7)
        break
      case '4': //月
        date.setMonthLikeJava(date.getMonth() + num)
        break
      case '5': //年
        date.setMonthLikeJava(date.getMonth() + (num * 12))
        break
      case '6': //季
        date.setMonthLikeJava(date.getMonth() + (num * 3))
        break
      case '7': //半年
        date.setMonthLikeJava(date.getMonth() + (num * 6))
        break

    }
    return date.getTime()
  },
  //将2016.12.12类型的日期字符串转为20161212000000的14位日期字符串
  dateStr216Str: function (str) {
    return str.substring(0, 4) + str.substring(5, 7) + str.substring(8, 10) + '000000'
  },
  dateStr28Str: function (str) {
    return str.substring(0, 4) + str.substring(5, 7) + str.substring(8, 10)
  },
  rmFromArray: function (arr, val) {
    arr.splice($.inArray(val, arr), 1)
  },

  //UUID生成器
  uuid: function () {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  },
  fixZero: function (val) {
    if (val < 10) {
      return '0' + val
    } else {
      return val
    }
  },

  /**
   * 星花掩码
   * @param str
   * @returns {*}
   */
  mask: function (str, index, num) {
    if (str) {
      var strMask = ''
      for (var i = 0; i < num; i++) {
        strMask += '*'
      }
      str = str.split('')
      str.splice(index, num, strMask)
      str = str.join('')
      return str
    } else {
      return str
    }
  },
  /**
   * 将用户登录状态设置为已登录
   */
  logined: function () {
    sessionStorage.isLogin = '1'
  },
  /**
   * 微信jsAPI已准备就绪
   */
  setWxReady: function () {
    util.setSession('wxReady', '1')
  },
  /**
   * 判断微信jsAPI是否准备就绪
   */
  isWxReady: function () {
    return util.getSession('wxReady')
  },

  /**
   * 动态加载js脚本文件
   * @param url
   */
  dynamicLoadJs: function (url, callback) {
    var loadFunction = function () {
      alert(this.readyState)
      if (this.readyState == 'complete' || this.readyState == 'loaded') {
        if (callback) {
          callback()
        }
      }
    }

    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.onreadystatechange = loadFunction
    script.onload = callback

    //calling a function after the js is loaded (Firefox)
    //script.onload = callback;
    document.body.appendChild(script)
  },

  // 动态加载css文件
  dynamicLoadCss: function (url) {
    var link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = url
    document.getElementsByTagName('head')[0].appendChild(link)
  },
  dynamicLoadMeta: function (opts) {
    var oMeta = document.createElement('meta')
    for (var key in opts) {
      oMeta[key] = opts[key]
    }

    document.getElementsByTagName('head')[0].appendChild(oMeta)
  },
  /**
   * 返回登录注册页面
   */
  return2Login: function (self) {
    self.$router.push({ path: '/login' })
  },
  /**
   * 导航到指定页面
   */
  goto: function (self, url, query) {

    if (query) {
      self.$router.push({ path: '/' + url, query: query })
    } else {
      self.$router.push({ path: '/' + url })
    }

  },
  /**
   * 获取导航带过来的参数
   */
  getRouteParam: function (self, key) {
    return self.$route.query[key]

  },
  /**
   * 设置cookie信息
   */
  setCookie: function (name, value, expireTime) {
    let exp = new Date()
    exp.setTime(exp.getTime() + expireTime * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
  },

}

util.validates = validates
util.constants = constants

export { util }