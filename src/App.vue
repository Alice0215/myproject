<template>
  <div id="q-app">
    <!--<transition :name="transitionName">-->
      <router-view class="child-view"></router-view>
    <!--</transition>-->
    <lg-preview id="preview-cover"></lg-preview>
    <datePicker></datePicker>
  </div>
</template>

<script>

import eventBus from './eventBus'
import _ from 'lodash'
import { removeLocalStory } from './common'
import datePicker from './pages/Common/CustomDatePicker'
import $ from 'jquery'

function backEvent () {
  eventBus.$emit('backButton-clicked')
}

function getCameraPermission () {
  if (!cordova.plugins.permissions) {
    return false
  }
  let permissions = cordova.plugins.permissions
  permissions.hasPermission(permissions.CAMERA, (status) => {
    if (!status.hasPermission) {
      let errorCallback = function () {
        console.warn('摄像头的权限没有打开')
      }
      permissions.requestPermission(
        permissions.CAMERA,
        function (status) {
          if (!status.hasPermission) errorCallback()
          console.log('获取权限成功！')
        },
        errorCallback)
    }
  }, null)
}

document.addEventListener('deviceready', () => {
  if (StatusBar) {
    StatusBar.styleDefault()
  }
  getCameraPermission()
  document.addEventListener('backbutton', backEvent, false)
}, false)

export default {
  name: 'App',
  components: {
    datePicker
  },
  metaInfo: {
    titleTemplate: '%s | e园林'
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
      this.$q.notify({
        message: params.msg,
        timeout: 2000,
        type: 'warning'
      })
      if (params.msg === '用户未登录') {
        delete window.user
        localStorage.removeItem('user')
        window.history.go(-1)
      }
    })
    eventBus.$on('backButton-clicked', () => {
      if ($('.van-image-preview').css('display') !== 'none') {
        $('.van-modal').click()
        return false
      } else {
        let exitArray = ['/', '/login']
        let menuArray = ['/register', '/partyRegister', '/jobGroup/byUser']
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
          this.$router.goBack()
        }
      }
    })
  }
}
</script>

<style lang="scss">
  .van-image-preview {
    z-index: 9999 !important;
  }
  .van-modal {
    z-index: 3002 !important;
  }
  .modal {
    z-index: 3001 !important;
  }
  .van-dialog {
    z-index: 3004 !important;
  }
  .van-popup {
    z-index: 3003 !important;
  }
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
