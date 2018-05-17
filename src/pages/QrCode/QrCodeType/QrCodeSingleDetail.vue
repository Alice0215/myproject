<template>
  <q-layout view="hHh lpr fFf" class="bg-primary" id="qr-detail">
  </q-layout>
</template>

<script>
  import QrCodeDetailMixin from '../../../mixin/QrCodeDetailMixin'
  export default {
    mixins: [
      QrCodeDetailMixin
    ],
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style lang='scss'>
  @import "../../../assets/css/common";
</style>
