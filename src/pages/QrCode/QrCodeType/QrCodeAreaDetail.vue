<template>
  <q-layout view="hHh lpr fFf" class="bg-primary" id="qr-detail">
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
      <q-tabs inverted align="justify" no-pane-border class="tab-class" ref="tabs">
        <q-tab default name="area-info" slot="title" label="片区信息" />
        <q-tab name="maintenance-records" slot="title" label="养护记录" />
        <q-tab name="patrol-records" slot="title" label="巡查记录" />
        <q-tab-pane name="area-info" class="tab-pane-class">
          <q-scroll-area class="scroll-height">
            <qr-area-info
              :qrCode="qrCode"
              :detail="detail"
              :thumbnails="thumbnails"
              :previews="previews">
            </qr-area-info>
          </q-scroll-area>
        </q-tab-pane>
        <q-tab-pane name="maintenance-records">
          <QrCodeMaintenance :codeId="qrCode.id">
          </QrCodeMaintenance>
        </q-tab-pane>
        <q-tab-pane name="patrol-records"></q-tab-pane>
      </q-tabs>
    </q-layout-header>
  </q-layout>
</template>

<script>
import QrAreaInfo from '../Information/QrAreaInfo'
import QrCodeMaintenance from '../Information/QrCodeMaintenance'
import QrCodeDetailMixin from '../../../mixin/QrCodeDetailMixin'

export default {
  components: {
    QrCodeMaintenance,
    QrAreaInfo
  },
  mixins: [
    QrCodeDetailMixin
  ],
  props: [
    "qrCode",
    "previews",
    "thumbnails",
    "detail"
  ],
  mounted() {
    let tab = this.$route.query.tab
    if(tab){
      this.$refs.tabs.selectTab(tab)
    } else {
      this.$refs.tabs.selectTab('area-info')
    }      
  }
}
</script>

<style lang='scss'>
</style>
