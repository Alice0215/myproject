<template>
  <q-layout view="hHh lpr fFf" id="single_info">
    <q-page-container>
      <q-page>
        <q-list>
          <q-item>
            <div class="title">二维码编号：</div>
            <div class="ml-20 content">{{ qrCode.identifier }}</div>
            <q-item-side  class="active btn-right" right v-if="detail.editable"  @click.native="edit">修改</q-item-side>
          </q-item>
          <q-item>
            <div class="title">植物名称：</div>
            <div class="ml-20 content" v-line-clamp:20="1">
              {{ qrCode.alias }}
            </div>
          </q-item>
          <q-item v-if="detail.position">
            <div class="title">相对位置：</div>
            <div class="ml-20 content" v-line-clamp:20="1">
              {{ detail.position }}
            </div>
          </q-item>
          <q-item>
            <div class="title">所属项目：</div>
            <div class="ml-20 content" v-line-clamp:20="1">
              {{ qrCode.project? qrCode.project.projectName : "" }}
            </div>
          </q-item>
          <q-item>
            <div class="title">地址：</div>
            <div class="ml-20 content" v-line-clamp:20="1">
              {{ qrCode.location? qrCode.location.formattedAddress : ""  }}
            </div>
          </q-item>
          <q-item v-if="detail.area && detail.area.code">
            <div class="title">所属片区：</div>
            <div class="ml-20 content" v-line-clamp:20="1">
              {{ detail.area.code.alias }}
            </div>
          </q-item>
          <q-item>
            <div class="title">苗木分类：</div>
            <div class="ml-20 content" v-line-clamp:20="1">{{ detail.category.name }}</div>
          </q-item>
          <q-item v-if="detail.amount">
            <div class="title">苗木面积：</div>
            <div class="ml-20 content" v-line-clamp:20="1">{{ detail.amount + detail.uomName}}</div>
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
            <div class="title">苗源地：</div>
            <div class="ml-20 content" v-line-clamp:20="1">{{ detail.source }}</div>
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
              <div class="content">{{ qrCode.description }}</div>
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

export default {
  props: [
    "detail",
    "qrCode",
    "previews",
    "thumbnails"
  ],
  methods: {
    preview (i) {
      ImagePreview(this.previews, i)
    }
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
