<template>
  <q-layout view="Hhh lpr Fff" class="bg-primary">
    <q-layout-header>
      <q-toolbar>
          <a @click="this.$router.goBack()" class="back-a font-14">
          <q-item-side left  icon="keyboard arrow left" class="back-left "/>
          返回
        </a>
        <q-toolbar-title class="header-title">
          项目二维码
        </q-toolbar-title>
         <q-item-side class="white-right" right/>
      </q-toolbar>
    </q-layout-header>
    <q-page-container id="qr-list">
      <q-item link class="full-width">
        <q-item-main>
          已录入二维码 120/160
        </q-item-main>
      </q-item>
      <q-item link class="full-width bg-white qr-item mt-15">
        <q-item-main>
          <span>国槐</span>
          <span>A片区</span>
        </q-item-main>
        <i class="iconfont active pr-8">&#xe909;</i>
        详情<q-item-side right icon="keyboard arrow right" class="auto-width" />
      </q-item>
    </q-page-container>
  </q-layout>
</template>

<script>
// import { request } from '../../common'
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
.auto-width{
  min-width: auto !important;
}
</style>
