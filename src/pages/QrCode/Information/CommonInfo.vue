<template>
  <q-layout view="hHh lpr fFf" id="common_info">
    <q-page-container>
      <q-page>
        <q-list>
          <q-item>
            <div class="title">二维码编号：</div>
            <div class="ml-20 content">{{ code.identifier }}</div>
            <q-item-side  class="active btn-right" right v-if="code.editable"  @click.native="edit">修改</q-item-side>
          </q-item>
          <q-item>
            <div class="title">所属项目：</div>
            <div class="ml-20 content" v-line-clamp:20="1">{{code.project.projectName}}</div>
          </q-item>
          <q-item>
            <div class="title">地址：</div>
            <div class="ml-20 content" >{{ code.location? code.location.formattedAddress : ""  }}</div>
          </q-item>
        </q-list>
        <q-list class="mt-10">
          <q-item class="ib">
            <div class="mb-10">备注：</div>
            <div class="content">{{ code.description }}</div>
          </q-item>
          <q-item>
            <span v-for="(item, i) in thumbnails" v-bind:key="i" :class="{'ml-10': i !== 0}">
              <img :src="item" preview-title-enable="false" :key="i" @click="ImagePreview(previews, i)">
            </span>
          </q-item>
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ImagePreview } from 'vant'

export default {
  data () {
    return {
      code: {},
      previews: {},
      thumbnails: {}
    }
  },
  methods: {
  },
  mounted () {
    eventBus.$on('set-qrCodeDetail-code', (code) => {
      this.code = code
    })
    eventBus.$on('set-qrCodeDetail-previews', (previews) => {
      this.previews = previews
    })
    eventBus.$on('set-qrCodeDetail-thumbnails', (thumbnails) => {
      this.thumbnails = thumbnails
    })
  }
}
</script>

<style lang='scss'>
  @import "../../../assets/css/_variable.scss";
  #common_info {
    background: $bgcolor;
    .q-list {
      background: white;
    }
    img {
      width: 80px;
      height: 80px;
    }
    .title {
      width: 90px;
      font-size: 15px !important;
    }
    .content {
      color: $text-highlight;
      font-size: 15px !important;
    }
    .btn-right {
      font-size: 15px;
      position: absolute;
      right: 16px;
    }
  }
</style>
