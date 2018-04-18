<template>
  <div id="q-app">
    <!--<transition :name="transitionName">-->
      <router-view class="child-view"></router-view>
    <!--</transition>-->
    <lg-preview id="preview-cover"></lg-preview>
  </div>
</template>

<script>

import eventBus from './eventBus'
import _ from 'lodash'
import { removeLocalStory } from './common'
import $ from 'jquery'

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
  data () {
    return {
      transitionName: ''
    }
  },
  methods: {
    deleteLocalStory () {
      removeLocalStory('qrCodeId')
      removeLocalStory('typeKey')
      removeLocalStory('top-index')
      removeLocalStory('qrcode-form')
      removeLocalStory('qrcode-image')
      removeLocalStory('qrcode-single-property')
      removeLocalStory('choose-project')
    },
    exitApp () {
      if (navigator.app) {
        navigator.app.exitApp()
      } else if (navigator.device) {
        navigator.device.exitApp()
      }
    }
  },
  mounted () {
    this.deleteLocalStory()
    eventBus.$on('router-back', () => {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
    })
    eventBus.$on('request-error', params => {
      this.$q.loading.hide()
      this.$q.dialog({
        title: '提示',
        message: params.msg
      })
    })
    eventBus.$on('backButton-clicked', () => {
      if ($('#preview-cover').css('display') !== 'none') {
        $('#preview-cover').click()
      } else {
        console.log(this.$router.currentRoute.path)
        let exitArray = ['/', '/login']
        let menuArray = ['/register', '/qcode/scan', '/partyRegister', '/jobGroup/byUser']
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
        } else if (_.indexOf(menuArray, this.$router.currentRoute.path) > -1) {
          this.$router.push('/')
        } else {
          console.log('back')
          this.$router.goBack()
        }
      }
    })
  }
}
</script>

<style lang="scss">
.child-view {
  position: absolute;
  width: 100%;
  transition: all 0.8s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
</style>
