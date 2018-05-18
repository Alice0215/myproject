<template>
  <q-layout view="hHh lpr fFf" id="empty_detail">
    <q-layout-header>
      <q-toolbar class='nav-header bg-white'>
        <q-item-side @click.native="$router.goBack()" left icon="keyboard arrow left" class="back-left">
          <label>返回</label>
        </q-item-side>
        <q-toolbar-title class='header-title text-center'>
        </q-toolbar-title>
        <q-item-side class="white-right" right @click.native="openQrCode(qrCode)">
          <i class="iconfont text-black font-20">&#xe701;</i>
        </q-item-side>
      </q-toolbar>
      <common-info class="mt-10" :qrCode="qrCode"></common-info>
    </q-layout-header>
  </q-layout>
</template>

<script>
import CommonInfo from '../Information/CommonInfo'
import QrCodeDetailMixin from '../../../mixin/QrCodeDetailMixin'

export default {
  components: {
    CommonInfo
  },
  mixins: [
    QrCodeDetailMixin
  ],
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
