// import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import Vue from 'vue'
import Vuex from 'vuex' // 引入 Vuex

Vue.use(Vuex)

const state = {
  username: '',
  password: '',
  menus:[],
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
