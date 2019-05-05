import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userName: 'Admin',
  },
  mutations: {
    changeName (state, payload) {
      state.userName = payload.userName
    },
  }
})

export default store