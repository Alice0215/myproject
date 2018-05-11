import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import plantInfo from './plantInfo'

Vue.use(Vuex)

const store = new Vuex.Store({
  module,
  modules: {
    plantInfo
  },
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
