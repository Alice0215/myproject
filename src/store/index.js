import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import plantInfo from './plantInfo'
import User from './modules/User'
import Location from './modules/Location'
import Organization from './modules/Organization'
import Project from './modules/Project'
import Maintenance from './modules/Maintenance'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    plantInfo,
    User,
    Location,
    Organization,
    Project,
    Maintenance
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      paths: [
        'User.current',
        'Module.paths',
        'Organization'
      ]
    })
  ]
})

export default store
