<template>
  <q-layout id="stepper-plant">
  <q-layout-header>
    <q-toolbar class="nav-header">
        <q-item-side @click="back" left icon="keyboard arrow left" class="back-left">
          <label>返回</label>
          </q-item-side>
        <q-toolbar-title class="header-title">
          二维码
        </q-toolbar-title>
          <q-item-side class="no-info" right/>
    </q-toolbar>
  </q-layout-header>
  <q-page-container>
    <q-stepper ref="stepper" alternative-labels class="full-width">
      <q-step default title="选择类型">
      </q-step>
      <q-step title="填写基本类型">
      </q-step>
      <q-step title="填写植物数据">
      </q-step>
      <q-step title="完成">
      </q-step>
    </q-stepper>
  </q-page-container>
  </q-layout>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.goBack()
    }
  }
}
</script>

<style lang="scss">
#stepper-plant {
  .q-stepper-tab {
    width: 20% !important;
    padding-left: 4px !important;
    padding-right: 4px !important;
  }
}
</style>
