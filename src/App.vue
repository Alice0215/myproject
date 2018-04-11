<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>

  import eventBus from './eventBus'
  import _ from 'lodash'

  function backEvent () {
    eventBus.$emit('backButton-clicked')
  }

  document.addEventListener('deviceready', () => {
    document.addEventListener('backbutton', backEvent, false)
  }, false)

  export default {
    name: 'App',
    metaInfo: {
      titleTemplate: '%s | E园林'
    },
    methods: {
      exitApp () {
        if (navigator.app) {
          navigator.app.exitApp()
        }
        else if (navigator.device) {
          navigator.device.exitApp()
        }
      }
    },
    mounted () {
      eventBus.$on('request-error', params => {
        this.$q.loading.hide()
        this.$q.dialog({
          title: '提示',
          message: params.msg
        })
      })
      eventBus.$on('backButton-clicked', () => {
        console.log(this.$router.currentRoute.path)
        let exitArray = ['/', '/login']
        if (_.indexOf(exitArray, this.$router.currentRoute.path) > -1) {
          this.$q.notify({
            message: '再按一次退出',
            timeout: 3000,
            type: 'info',
            position: 'center'
          })
          document.removeEventListener('backbutton', backEvent, false) // 注销返回键
          document.addEventListener('backbutton', this.exitApp, false) // 绑定退出事件
          setTimeout(() => {
            document.removeEventListener('backbutton', this.exitApp, false) // 注销返回键
            document.addEventListener('backbutton', backEvent, false) // 返回键
          }, 3000)
        } else {
          console.log('back')
          this.$router.go(-1)
        }
      })
    }
  }
</script>

<style>
</style>
