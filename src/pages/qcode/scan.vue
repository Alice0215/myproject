<template>
  <q-layout id="scan-page">
    <q-toolbar class='header'>
      <q-toolbar class='fix'>
        <a @click="back" class="back-a">
          <q-item-side left icon='keyboard arrow left' class='back-left'/>
          返回</a>
        <q-toolbar-title class='header-title'>
          扫描二维码
        </q-toolbar-title>
        <q-item-side right/>
      </q-toolbar>
    </q-toolbar>
    <q-icon v-show="false" name="ion-qr-scanner" class="fixed-center"
            style="font-size: 360px; color: lightskyblue"/>
  </q-layout>
</template>

<script>
import { request } from '../../common'
import { server, plantType } from '../../const'
import _ from 'lodash'

export default {
  data () {
    return {
      borderShow: true
    }
  },
  methods: {
    back () {
      this.$router.goBack()
    },
    async handleScanResult (url) {
      this.borderShow = false
      this.$q.loading.show()
      let resp = await request(url, 'get', '', 'json', false, true)
      this.$q.loading.hide()
      let msg = resp.data.resultMsg
      let qrCodeId = null
      if (msg.code) {
        qrCodeId = msg.code.id
      } else {
        qrCodeId = msg.id
      }
      let project = null
      if (msg.project) {
        project = msg.project
      }
      let typeKey = null
      if (msg.type) {
        typeKey = msg.type.key
      }
      let imageArray = []
      if (msg.pictures) {
        _.forEach(msg.pictures, v => {
          let previewUrl = server.THUMBNAIL_API + v.filePath
          imageArray.push({
            'previewUrl': previewUrl,
            'contentUrl': v.filePath
          })
        })
        localStorage.setItem('qrcode-image', JSON.stringify(imageArray))
      }
      localStorage.setItem('qrCodeId', qrCodeId)
      localStorage.setItem('typeKey', typeKey)
      localStorage.setItem('choose-project', JSON.stringify(project))
      if (typeKey === null) {
        if (msg.editable) {
          this.$router.replace('/choose/qrtype?id=' + qrCodeId)
        } else {
          this.$router.replace('/qcode/detail?id=' + qrCodeId + '&type=' + typeKey)
        }
      } else if (this.type === 'jobGroup') {
        if ((typeKey === plantType.SINGLE || typeKey === plantType.AREA)) {
          if (msg.maintainable) {
            this.$router.replace('/project/maintenance?codeId=' + qrCodeId)
          } else {
            this.$q.notify({
              message: '您无权限添加养护记录',
              timeout: 3000,
              type: 'info'
            })
            this.$router.replace('/qcode/detail?id=' + qrCodeId + '&type=' + typeKey)
          }
        } else {
          // 设备类型或其他类型二维码，没有养护记录
          this.$router.replace('/qcode/detail?id=' + qrCodeId + '&type=' + typeKey)
        }
      } else if (this.type === 'qrcode') {
        if (msg.editable) {
          this.$router.replace('/qcode/edit?id=' + qrCodeId + '&typeKey=' + typeKey)
        } else {
          this.$q.notify({
            message: '您无权限编辑此二维码',
            timeout: 3000,
            type: 'info'
          })
          this.$router.replace('/qcode/detail?id=' + qrCodeId + '&type=' + typeKey)
        }
      } else {
        // 扫一扫，显示详情
        this.$router.replace('/qcode/detail?id=' + qrCodeId + '&type=' + typeKey)
      }
    },
    openScan () {
      if (cordova.plugins.barcodeScanner) {
        cordova.plugins.barcodeScanner.scan(
          (result) => {
            this.handleScanResult(result.text)
          },
          (error) => {
            alert('Scanning failed: ' + error)
          },
          {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: false, // iOS and Android
            showTorchButton: false, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: false, // Android, save scan history (default false)
            prompt: '在扫描区域内放置一个二维码', // Android
            resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: 'QR_CODE', // default: all but PDF_417 and RSS_EXPANDED
            orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: true, // iOS
            disableSuccessBeep: false // iOS and Android
          }
        )
      }
    }
  },
  mounted () {
    this.type = this.$route.query.type
    // let url = 'http://60.195.68.29:3535/landscape/ls/info/qr/detail/496665'
    // this.handleScanResult(url)
    this.openScan()
  },
  beforeDestroy () {
    //    this.cancelScan()
  }
}
</script>
