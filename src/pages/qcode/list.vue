<template>
  <q-layout view="Hhh lpr Fff" class="bg-primary" id="qr-list">
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
      <q-tabs inverted align="justify" no-pane-border>
        <q-tab default name="maintenance-records" slot="title" label="全部"  class="mt-5 pb-0"/>
        <q-tab slot="title" label="单株植物" class="mt-5 pb-0"/>
        <q-tab slot="title" label="片区植物" class="mt-5 pb-0"/>
        <q-tab slot="title" label="设备" class="mt-5 pb-0"/>
        <q-tab slot="title" label="其它" class="mt-5 pb-0" />
      </q-tabs>
    </q-layout-header>
    <q-page-container >
      <q-item link class="full-width">
        <q-item-main>
          已录入二维码 120/160
        </q-item-main>
      </q-item>
      <q-item link class="full-width bg-white qr-item mt-15 pb-10">
        <q-item-main v-line-clamp:20="1" class="wp-30">
          国槐国槐国槐国槐
        </q-item-main>
        <div class="wp-25 ib left pr-25 " v-line-clamp:20="1">A片区</div>
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
#qr-list {
  .auto-width {
    min-width: auto !important;
  }
  .q-tab-label {
    padding-bottom: 5px;
    color: #666;
    opacity: 1;
    width: 100%;
  }
  .active .q-tab-label {
    border-bottom: 2px solid;
    color: #239f5b;
  }
  .q-tab{
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}
</style>
