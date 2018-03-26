import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example'

Vue.use(Vuex)

const state = {
  count: 1
}

const mutations = {
  add (state) {
    state.count += 1
  },
  reduce (state) {
    state.count -= 1
  }
}

const store = new Vuex.Store({
  modules: {
    example
  },
  state,
  mutations
})

export default store
