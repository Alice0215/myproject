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
  </q-layout>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      back () {
        if (window.QRScanner) {
          window.QRScanner.cancelScan(statu => {
            console.log(statu)
          })
          window.QRScanner.hide()
        }
        this.$router.back()
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
                  window.QRScanner.cancelScan(statu => {
                    console.log(statu)
                  })
                  window.QRScanner.hide()
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
    }
  }
</script>

<style lang="scss">
  #scan-page {

  }
</style>
