<template>
  <q-layout id="scan-page">
    <q-toolbar class='header'>
      <q-toolbar class='fix'>
        <a @click="back">
          <q-item-side left icon='keyboard arrow left' class='reback'/>
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
 import {request} from '../../common'
 import {server, plantType} from '../../const'
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
        this.borderShow = false
        this.$q.loading.show()
        let resp = await request(url, 'get', '', 'json', false, true)
        this.$q.loading.hide()
        let msg = resp.data.resultMsg
        let qrCodeId = msg.id
        let typeKey = null
        if (msg.type) {
            typeKey = msg.type.key
        }
        console.log(typeKey)
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
        if (typeKey === plantType.SINGLE || typeKey === plantType.AREA) {
          this.$router.push('/project/maintenance')
        } else {
          this.$router.push('/qcode/edit?id=' + qrCodeId + '&typeKey=' + typeKey)
        }
      },
      cancelScan () {
        if (window.QRScanner) {
          window.QRScanner.cancelScan(statu => {
            console.log(statu)
          })
          window.QRScanner.hide()
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
    mounted () {
      this.openScan()
    },
    beforeDestroy () {
      this.cancelScan()
    }
  }
</script>

<style lang="scss">
  #scan-page {

  }
</style>
