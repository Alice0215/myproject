<template>
  <q-layout view="hHh lpr fFf" id="single_info">
    <q-layout-header>
      <q-toolbar class='nav-header bg-white'>
        <q-item-side @click.native="$router.goBack()" left icon="keyboard arrow left" class="back-left">
          <label>返回</label>
        </q-item-side>
        <q-toolbar-title class='header-title text-center'>
          {{ detail.areaName }}
        </q-toolbar-title>
        <q-item-side class="white-right" right/>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <q-page>
        <q-list class="mt-10">
          <q-item>
            <div class="title">植物名称：</div>
            <div class="ml-20 content" v-line-clamp:20="1">
              {{ detail.alias }}
            </div>
          </q-item>
          <q-item v-if="detail.amount">
            <div class="title">数量 | 面积：</div>
            <div class="ml-20 content" v-line-clamp:20="1">
              {{ detail.amount }}
              {{ detail.uomName ? detail.uomName : '' }}
            </div>
          </q-item>
          <q-item v-if="detail.position">
            <div class="title">相对位置：</div>
            <div class="ml-20 content" v-line-clamp:20="1">
              {{ detail.position }}
            </div>
          </q-item>
          <q-item>
            <div class="title">苗木分类：</div>
            <div class="ml-20 content" v-line-clamp:20="1">{{ detail.category ? detail.category.name : ''}}</div>
          </q-item>
          <q-item>
            <div class="title">苗木规格：</div>
            <div class="ml-20 content" v-line-clamp:20="1">
              <span class="ib pr-5">胸径：{{ detail.xiongJing }}cm</span>
              <span  class="ib pr-5">高度：{{ detail.gaoDu }}cm</span>
              <span  class="ib pr-5">冠幅：{{ detail.guanFu }}cm</span>
            </div>
          </q-item>
          <q-item>
            <div class="title">苗木商信息：</div>
            <div class="ml-20 content" v-line-clamp:20="1">{{ detail.dealer }}</div>
          </q-item>
          <q-item>
            <div class="title">苗木其他信息：</div>
            <div class="ml-20 content" v-line-clamp:20="1">{{ detail.other }}</div>
          </q-item>
          <q-item>
            <div class="ib">
              <div class="mb-10">备注：</div>
              <div class="content">{{ detail.description }}</div>
            </div>
          </q-item>
          <q-item>
            <div class="ib">
              <div class="mb-10">现场图片：</div>
              <span v-for="(item, i) in thumbnails" v-bind:key="i" :class="{'ml-10': i !== 0}">
              <img :src="item" preview-title-enable="false" :key="i" @click="preview(i)">
            </span>
            </div>
          </q-item>
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ImagePreview } from 'vant'
import { server} from "../../../const"

export default {
  data () {
    return {
      thumbnails: [],
      previews: [],
      detail: {}
    }
  },
  methods: {
    dealPictures () {
      if (!_.has(this.detail, 'pictures') || this.detail.pictures.length === 0) {
        return
      }

      _.forEach(this.detail.pictures, v=>{
        this.thumbnails.push(server.THUMBNAIL_API + v.filePath)
        this.previews.push(server.PREVIEW_API + v.filePath)
      })
    },
    preview (i) {
      ImagePreview(this.previews, i)
    }
  },
  mounted () {
    this.detail = this.$store.state.Qrcode.current
    this.dealPictures()
  }
}
</script>

<style lang='scss'>
  @import "../../../assets/css/_variable.scss";
  #single_info {
    background: $bgcolor;
    .q-list {
      background: white;
      .q-item {
        padding-top: 8px;
      }
    }
    img {
      width: 75px;
      height: 75px;
    }
    .title {
      width: 105px !important;
      font-size: 15px !important;
    }
    .content {
      width: calc(100% - 105px - 32px);
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
