<template>
  <q-layout view="hHh lpr fFf" id="empty_detail">
    <q-layout-header>
      <q-toolbar class='nav-header bg-white'>
        <q-item-side @click.native="$router.goBack()" left icon="keyboard arrow left" class="back-left">
          <label>返回</label>
        </q-item-side>
      </q-toolbar>
      <common-info class="mt-10" :qrCode="qrCode"></common-info>
    </q-layout-header>
  </q-layout>
</template>

<script>
import CommonInfo from '../Information/CommonInfo'

export default {
  components: {
    CommonInfo
  },
  props: [
    "qrCode"
  ]    
}
</script>

<style lang="scss">
  @import "../../../assets/css/_variable.scss";
  #empty_detail {
    background: $bgcolor !important;
  }
</style>
