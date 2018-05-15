<template>
 <q-layout view="Hhh lpr Fff" class="bg-primary" id="qr-detail">
    <q-layout-header>
      <q-toolbar>
          <a @click="$router.goBack()" class="back-a font-14">
          <q-item-side left  icon="keyboard arrow left" class="back-left "/>
          返回
        </a>
        <q-toolbar-title class="header-title" v-if="info.alias">
          {{info.alias}}
        </q-toolbar-title>
         <q-item-side class="white-right" right></q-item-side>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <div class="bg-white">
        <div class="qr-info pv-15 bg-white box">
          <div class="qr-info bg-white">
            <p><span class="wp-30 ib title-font-color">植物名称：</span><span v-if="info.alias" class="ib wp-70 float-right"  v-line-clamp:20="1">{{info.alias}}</span></p>
            <p><span class="wp-30 ib title-font-color">数量：</span><span v-if="info.amount" v-line-clamp:20="1" class="wp-70 ib float-right">{{info.amount}}</span></p>
            <p><span class="wp-30 ib title-font-color">位置：</span><span v-if="info.location" v-line-clamp:20="1" class="wp-70 ib float-right">{{info.location.formattedAddress}}</span></p>
            <p><span class="wp-30 ib title-font-color">苗木分类：</span><span v-if="info.category">{{info.category.name}}</span></p>
            <p class="param"><span class="wp-30 ib title-font-color">苗木规格：</span><span class="ib pr-5">胸径：{{info.xiongJing}}cm</span><span  class="ib pr-5">高度：{{info.gaoDu}}cm</span><span  class="ib pr-5">冠幅：{{info.guanFu}}cm</span></p>
            <p><span class="wp-30 ib title-font-color">苗木商名称：</span><span v-if="info.dealer" class="ib wp-70 float-right"  v-line-clamp:20="1">{{info.dealer}}</span></p>
            <p><span class="wp-30 ib title-font-color">苗木其它信息：</span><span class="ib wp-70 float-right"  v-line-clamp:20="1">{{info.other}}</span></p>
            <p v-if="info.description"><span class="block title-font-color">备注：</span>{{info.description}}</p>
            <p class="pic-field"  v-if="info.pictures">
              <span class="block title-font-color">现场图片：</span>
              <span v-for="item in info.pictures" v-bind:key="item.id">
                <img :src="picUrl+item.filePath" v-preview="previewApi+item.filePath"
                      :key="item.id"
                      preview-title-enable="false" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { server } from '../../const'
import _ from 'lodash'
export default {
  data () {
    return {
      info: {},
      picUrl: '',
      previewApi: ''
    }
  },
  async mounted () {
    this.picUrl = server.THUMBNAIL_API
    this.previewApi = server.PREVIEW_API
    let info = this.$store.getters['Qrcode/getCurrent']
    if (!_.isUndefined(info) && !_.isNull(info)) {
      this.info = this.$store.getters['Qrcode/getCurrent']
      console.log(this.info)
    } else {
      this.$q.notify({
        timeout: 2000,
        type: 'warning',
        message: '参数错误！'
      })
      this.$router.goBack()
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#area-detail {
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
  .q-tab {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .qr-info {
    p {
      margin-bottom: 5px;
      font-size: 14px;
      color: #333333;
      line-height: 23px;
    }
  }
  .pic-field img {
    width: 23%;
    margin-right: 1%;
  }
}
</style>
