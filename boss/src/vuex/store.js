// 参考地址http://www.kuangzen.com/2016/07/15/Vuex-And-Vue-router-Tabs/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  islike: false,
  search:["web前端","html5"]
}

const mutations = {
  LIKECHANGE (state, islike) {
    state.islike = !islike
  },
  ADDSEARCH (state, what) {
    state.search = state.search.push(what)
  }
}

export default new Vuex.Store({
  state,
  mutations
})