<template>
  <q-layout view="hHh lpr fFf" id="area_info">
    <q-page-container>
      <q-page>
        <q-list>
          <q-item>
            <div class="title">二维码编号：</div>
            <div class="ml-20 content">{{ qrCode.identifier }}</div>
            <q-item-side  class="active btn-right" right v-if="detail.editable"  @click.native="edit(qrCode)">修改</q-item-side>
          </q-item>
          <q-item>
            <div class="title">片区名称：</div>
            <div class="ml-20 content" v-line-clamp:20="1">
              {{ qrCode.alias }}
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
          <q-item>
            <div class="title">片区面积：</div>
            <div class="ml-20 content" v-line-clamp:20="1">{{ detail.acreage ? detail.acreage : '' }}</div>
          </q-item>
        </q-list>
        <q-list class="mt-10 singles-list" v-if="detail.singles.length > 0">
          <q-list-header class="list-header">片区植物</q-list-header>
          <q-item v-for="item in detail.singles" :key="item.id" class="bg-white" @click.native="toAreaDetail(item)">
            <q-item-main>
              <div class="wp-40 float-left title font-17" v-line-clamp:20="1">
                {{item.alias}}
              </div>
              <div class="wp-30 float-left title-count font-17" v-line-clamp:20="1">
                数量：{{item.amount}}
              </div>
              <div class="wp-20 float-right font-15" v-line-clamp:20="1">
                详情
                <q-icon name="keyboard arrow right" size="20px"></q-icon>
              </div>
            </q-item-main>
          </q-item>
        </q-list>
        <q-list class="mt-10">
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
import QrCodeDetailMixin from '../../../mixin/QrCodeDetailMixin'

export default {
  props: [
    "detail",
    "qrCode",
    "previews",
    "thumbnails"
  ],
  mixins: [
    QrCodeDetailMixin
  ],
  methods: {
    toAreaDetail (info) {
      info.areaName = this.qrCode.alias
      this.$store.commit('Qrcode/setCurrent', info)
      this.$router.push('/areaDetail')
    }
  }

}
</script>

<style lang='scss'>
  @import "../../../assets/css/_variable.scss";
  #area_info {
    background: $bgcolor;
    .q-list {
      background: white;
      .q-item {
        padding-top: 8px;
      }
    }
    .singles-list {
      background: $bgcolor;
      .list-header {
        font-size: 15px !important;
        color: $text;
      }
      .q-item {
        padding: 15px 12px;
        margin: 10px;
        border-radius: 5px;
        .title {
          color: $text-highlight !important;
        }
      }
    }
    img {
      width: 75px;
      height: 75px;
    }
    .title {
      width: 105px !important;
      font-size: 15px;
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
