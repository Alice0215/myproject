import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  module,
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      paths: [
        'User.current',
        'Module.paths'
      ]
    })
  ]
})

export default store
