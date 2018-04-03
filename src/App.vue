<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>

  import eventBus from './eventBus'

  document.addEventListener('deviceready', () => {
    console.log(navigator.camera)
  }, false)

  export default {
    name: 'App',
    metaInfo: {
      titleTemplate: '%s | E园林'
    },
    mounted () {
      eventBus.$on('request-error', params => {
        this.$q.dialog({
          title: '提示',
          message: params.msg
        })
      })
    }
  }
</script>

<style>
</style>
