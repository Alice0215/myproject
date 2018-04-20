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
    <q-icon v-show="borderShow" name="ion-qr-scanner" class="fixed-center"
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
      if (window.QRScanner) {
        window.QRScanner.cancelScan(statu => {
          console.log(statu)
        })
        window.QRScanner.hide()
      }
      this.$router.goBack()
    },
    async handleScanResult (url) {
      this.cancelScan()
      this.borderShow = false
      this.$q.loading.show()
      let resp = await request(url, 'get', '', 'json', false, true)
      this.$q.loading.hide()
      let msg = resp.data.resultMsg
      if (window.QRScanner) {
        window.QRScanner.cancelScan(statu => {
          console.log(statu)
        })
        window.QRScanner.hide()
      }

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
      if (_.isNull(msg.location)) {
        localStorage.setItem('user_location', msg.location)
      }
      localStorage.setItem('qrCodeId', qrCodeId)
      localStorage.setItem('typeKey', typeKey)
      localStorage.setItem('choose-project', JSON.stringify(project))
      if (typeKey === plantType.SINGLE || typeKey === plantType.AREA) {
        if (msg.maintainable) {
          this.$router.push('/project/maintenance?codeId=' + qrCodeId)
        } else {
          this.$router.push('/qcode/detail?id=' + qrCodeId + '&type=' + typeKey)
        }
      } else if (typeKey === plantType.EQUIPMENT || typeKey === plantType.OTHER) {
        this.$router.push('/qcode/detail?id=' + qrCodeId + '&type=' + typeKey)
      } else if (msg.editable) {
        this.$router.push('/qcode/edit?id=' + qrCodeId + '&typeKey=null')
      } else {
        this.$router.push('/qcode/detail?id=' + qrCodeId + '&type=' + typeKey)
      }
    },
    cancelScan () {
      if (window.QRScanner) {
        window.QRScanner.cancelScan(statu => {
          console.log(statu)
        })
        window.QRScanner.hide()
        window.QRScanner.destroy((status) => {
          console.log(status)
        })
      }
    },
    openScan () {
      if (window.QRScanner) {
        window.QRScanner.prepare((err, status) => {
          if (err) {
            console.error(err)
          }
          if (status.authorized) {
            console.log('authorized')
            window.QRScanner.scan((e, content) => {
              if (e) {
                console.log(e)
              } else {
                console.log(content)
                this.handleScanResult(content)
                this.cancelScan()
              }
            })
            window.QRScanner.show(sta => {
              console.log(sta)
            })
          } else if (status.denied) {
            console.log(status)
            window.QRScanner.openSettings()
          } else {
            console.log(status)
          }
        })
      }
    }
  },
  created () {
    // let url = 'http://60.195.68.29:3535/landscape/ls/info/qr/detail/496665'
    // this.handleScanResult(url)
    this.openScan()
  },
  beforeDestroy () {
    this.cancelScan()
  }
}
</script>
