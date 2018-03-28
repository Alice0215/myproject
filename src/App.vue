<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>

  document.addEventListener('deviceready', () => {
    console.log(navigator.camera)
  }, false)

  export default {
    name: 'App',
    metaInfo: {
      titleTemplate: '%s | E园林'
    },
  }
</script>

<style>
</style>
