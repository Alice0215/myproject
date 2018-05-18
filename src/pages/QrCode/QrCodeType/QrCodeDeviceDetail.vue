<template>
  <q-layout view="hHh lpr fFf" id="device_detail">
    <q-layout-header>
      <q-toolbar class='nav-header bg-white'>
        <q-item-side @click.native="$router.goBack()" left icon="keyboard arrow left" class="back-left">
          <label>返回</label>
        </q-item-side>
        <q-toolbar-title class='header-title text-center'>
          {{ code.alias }}
        </q-toolbar-title>
        <q-item-side class="white-right" right/>
      </q-toolbar>
      <q-tabs inverted align="justify" no-pane-border class="tab-class">
        <q-tab default name="equipment-info" slot="title" label="设备信息" />
        <q-tab name="occupy-records" slot="title" label="领用记录" />
        <q-tab name="patrol-records" slot="title" label="巡查记录" />
        <q-tab-pane name="equipment-info" class="tab-pane-class">
          <common-info></common-info>
        </q-tab-pane>
        <q-tab-pane name="occupy-records"></q-tab-pane>
        <q-tab-pane name="patrol-records"></q-tab-pane>
      </q-tabs>
    </q-layout-header>
  </q-layout>
</template>

<script>
import CommonInfo from '../Information/CommonInfo'

export default {
  components: {
    CommonInfo
  },
  data () {
    return {
      code: {}
    }
  },
  methods: {
  },
  mounted () {
    eventBus.$on('set-qrCodeDetail-code', (code) => {
      this.code = code
    })
  }
}
</script>

<style lang='scss'>
@import "../../../assets/css/common";
#device_detail {

}
</style>
