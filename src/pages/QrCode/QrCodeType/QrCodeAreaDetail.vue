<template>
  <q-layout view="hHh lpr fFf" class="bg-primary" id="qr-detail">
    <q-layout-header>
      <q-toolbar class='nav-header bg-white'>
        <q-item-side @click.native="$router.goBack()" left icon="keyboard arrow left" class="back-left">
          <label>返回</label>
        </q-item-side>
        <q-toolbar-title class='header-title text-center'>
          {{ qrCode.alias }}
        </q-toolbar-title>
        <q-item-side class="white-right" right/>
      </q-toolbar>
      <q-tabs inverted align="justify" no-pane-border class="tab-class">
        <q-tab default name="area-info" slot="title" label="片区信息" />
        <q-tab name="occupy-records" slot="title" label="养护记录" />
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
        <q-tab-pane name="occupy-records"></q-tab-pane>
        <q-tab-pane name="patrol-records"></q-tab-pane>
      </q-tabs>
    </q-layout-header>
  </q-layout>
</template>

<script>
import QrAreaInfo from '../Information/QrAreaInfo'

export default {
  components: {
    QrAreaInfo
  },
  props: [
    "qrCode",
    "previews",
    "thumbnails",
    "detail"
  ]
}
</script>

<style lang='scss'>
</style>
