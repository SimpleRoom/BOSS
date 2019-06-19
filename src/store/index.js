import Vue from 'vue'
import Vuex from 'vuex'

import logIn from './modules/logIn'

Vue.use(Vuex)

const state = {}
const actions = {}
const mutations = {}
const store = new Vuex.Store({
  modules: {
    logIn
  },
  actions,
  state,
  mutations,
})
export default store
