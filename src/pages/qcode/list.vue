<template>
  <q-layout view="Hhh lpr Fff" class="bg-primary" id="qr-list">
    <q-layout-header>
      <q-toolbar>
          <a @click="back" class="back-a font-14">
          <q-item-side left  icon="keyboard arrow left" class="back-left "/>
          返回
        </a>
        <q-toolbar-title class="header-title">
          项目二维码
        </q-toolbar-title>
         <q-item-side class="white-right" right/>
      </q-toolbar>
      <q-tabs inverted align="justify" no-pane-border>
        <q-tab default name="maintenance-records" slot="title" label="全部"  class="mt-5 pb-0" @click.native="chooseType('')"/>
        <q-tab slot="title" label="单株植物" class="mt-5 pb-0"  @click.native="chooseType('SINGLE')"/>
        <q-tab slot="title" label="片区植物" class="mt-5 pb-0"  @click.native="chooseType('AREA')"/>
        <q-tab slot="title" label="设备" class="mt-5 pb-0"  @click.native="chooseType('EQUIPMENT')"/>
        <q-tab slot="title" label="其它" class="mt-5 pb-0"  @click.native="chooseType('OTHER')"/>
      </q-tabs>
    </q-layout-header>
    <q-page-container>
      <q-item link class="full-width">
        <q-item-main v-if="type===''">
          已录入二维码 {{count.active}}/{{count.total}}
        </q-item-main>
        <q-item-main v-else>
          共{{count.total}}个
        </q-item-main>
      </q-item>
      <q-infinite-scroll :handler="load" ref="scroll">
        <q-item link class="full-width bg-white qr-item mt-15 pb-10" v-for="item in list" :key="item.id"
          @click.native="$router.push('/qcode/detail?projectId='+projectId+'&id='+item.id+'&type='+item.type.key)">
          <q-item-main v-line-clamp:20="1" class="wp-30">
           {{item.identifier + " " + item.alias}} {{(item.type && item.type.key==='SINGLE')?item.position:''}}
          </q-item-main>

          <i class="iconfont active pr-8" v-if="item.type && item.type.key==='SINGLE'">&#xe64c;</i>
          <i class="iconfont active pr-8" v-if="item.type && item.type.key==='AREA'">&#xe909;</i>
          <i class="iconfont active pr-8" v-if="item.type && item.type.key==='EQUIPMENT'">&#xe62f;</i>
          <i class="iconfont active pr-8" v-if="item.type && item.type.key==='OTHER'">&#xe64b;</i>
          详情<q-item-side right icon="keyboard arrow right" class="auto-width" />
        </q-item>
        <div class="row justify-center" style="margin-bottom: 50px;" v-if="!hasLoadAll">
          <q-spinner name="dots" slot="message" :size="40"></q-spinner>
        </div>
      </q-infinite-scroll>
    </q-page-container>
  </q-layout>
</template>

<script>
import { request } from "../../common";
import _ from "lodash";
import InfiniteScroll from '../../mixin/InfiniteScroll'

export default {
  data() {
    return {
      count: { active: 0, total: 0 },
      projectId: 0,
      type: ""
    };
  },
  mixins: [
    InfiniteScroll
  ],
  mounted () {
    this.projectId = this.$route.query.projectId;
    this.getCount();
    this.apiUrl = 'qrcode/list?projectId=' + this.projectId
    this.scroll = this.$refs.scroll
  },
  methods: {
    back () {
      this.$router.push('/ProjectInfo?projectId='+this.projectId)
    },
    chooseType(type) {
      this.type = type;
      this.apiUrl = 'qrcode/list?projectId=' + this.projectId + "&type=" + type
      this.scroll.reset();
      this.hasLoadAll = false;
      this.pageNo = 1;
      this.count = { active: 0, total: 0 };
      this.list = [];
      this.getCount();
      this.scroll.resume();
    },

    getCount() {
      request(
        "qrcode/count?projectId=" + this.projectId + "&type=" + this.type,
        "get",
        null,
        "json",
        true
      ).then(response => {
        if (response) {
          let count = response.data.resultMsg;
          if (this.type === "") {
            this.count = count;
          } else {
            this.count.total = count.total;
          }
        }
      });
    }
  }
};
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
  .q-tab {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}
</style>
