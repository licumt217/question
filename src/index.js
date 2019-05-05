/**
 * Created by liqiang on 2017/5/21.
 */
import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS
import router from './routers'
import './filters/'
import './assets/js/customPrototype'
import axios from './http/axios'
import store from './store'

import myCommponents from './components'

Vue.use(iView)
Vue.use(myCommponents)

Vue.config.devtools = process.env.NODE_ENV !== 'prod'
Vue.prototype.http = axios
const app = new Vue({
  el: '#app',
  axios,
  store: store,
  router: router,
  render: h => h(App)
})