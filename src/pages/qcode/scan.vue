<template>
  <q-layout id="scan-page">

  </q-layout>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
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
