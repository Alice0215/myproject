import Vue from 'vue'
import VueRouter from 'vue-router'
import eventBus from '../eventBus'
import { Dialog } from 'quasar'

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
  scrollBehavior: () => ({y: 0}),
  routes
})

Router.goBack = function (backOrNot = false, title, message) {
  if (backOrNot) {
    Dialog.create({
      title: title,
      message: message,
      ok: '留在当前页',
      cancel: '确认放弃'
    }).then(() => {

    }).catch(() => {
      console.log('Disagreed')
      this.isBack = true
      console.log(this.isBack)
      window.history.go(-1)
    })
  } else {
    this.isBack = true
    console.log(this.isBack)
    window.history.go(-1)
  }
}

Router.beforeEach((to, from, next) => {
  eventBus.$emit('router-back')
  const u = localStorage.getItem('user')
  if (u) {
    if (to.fullPath === '/login' || to.fullPath === '/register' ||
      to.fullPath === '/partyregister') {
      return Router.replace('/')
    }
    // Update module and sub
    return next()
  }
  if (to.fullPath === '/login' || to.fullPath === '/register' || to.fullPath ===
    '/partyregister') {
    return next()
  }
  Router.replace('/login')
  return next()
})

export default Router
