<template>
  <q-layout view="hHh lpr fFf" id="device_detail">
    <q-layout-header>
      <q-toolbar class='nav-header bg-white'>
        <q-item-side @click.native="back" left icon="keyboard arrow left" class="back-left">
          <label>返回</label>
        </q-item-side>
        <q-toolbar-title class='header-title text-center'>
          {{ qrCode.alias }}
        </q-toolbar-title>
        <q-item-side class="white-right" right @click.native="openQrCode(qrCode)">
          <i class="iconfont text-black font-20">&#xe701;</i>
        </q-item-side>
      </q-toolbar>
      <q-tabs inverted align="justify" no-pane-border class="tab-class">
        <q-tab default name="other-info" slot="title" label="其他信息" />
        <q-tab name="patrol-records" slot="title" label="巡查记录" />

        <q-tab-pane name="other-info" class="tab-pane-class">
          <common-info :qrCode="qrCode" :thumbnails="thumbnails" :previews="previews"></common-info>
        </q-tab-pane>
        <q-tab-pane name="patrol-records"></q-tab-pane>
      </q-tabs>
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
    "qrCode",
    "previews",
    "thumbnails"
  ]
}
</script>

<style>
</style>
