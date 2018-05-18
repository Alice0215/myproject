<template>
  <q-layout view="hHh lpr fFf" class="bg-primary" id="qr-detail">
  </q-layout>
</template>

<script>
  export default {
    props: [
      "qrCode",
      "previews",
      "thumbnails",
      "detail"
    ]    
  }
</script>

<style lang='scss'>
  @import "../../../assets/css/common";
</style>
