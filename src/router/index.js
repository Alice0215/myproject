import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})
Router.beforeEach((to, from, next) => {
  const u = localStorage.getItem('token')
  if (u) {
    if (to.fullPath === '/login' || to.fullPath === '/register' || to.fullPath === '/partyregister') {
      return Router.replace('/')
    }
    // Update module and sub
    const path = to.fullPath
    console.log('TO: ' + path)
    return next()
  }
  if (to.fullPath === '/login' || to.fullPath === '/register' || to.fullPath === '/partyregister') {
    return next()
  }
  Router.replace('/login')
})

export default Router
