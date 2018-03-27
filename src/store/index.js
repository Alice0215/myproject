import Vue from 'vue'
import Vuex from 'vuex'

import module from './module'

Vue.use(Vuex)

const state = {
  current: null,
  old: null
}

const mutations = {
  chooseUser (state, o) {
    if (o) {
      if (o.userId && o.userName && o.type) {
        state.current = o
        state.current.userInfo = o
      }
      if (o.projectName) {
        state.old = o
        state.old.userInfo = o
      }
    }
  }
}

const store = new Vuex.Store({
  modules: {
    module
  },
  state,
  mutations
})

export default store
