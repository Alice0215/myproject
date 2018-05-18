<template>
  <q-layout view="hHh lpr fFf">
    <q-page-container>
      <q-page id="maintenance">
        <div  class="bg-white mt-10">
          <q-infinite-scroll :handler="load" ref="scroll">
            <q-list separator v-if="list.length > 0">
              <q-item v-for="item in list"
                      :key="item.id"
                      @click.native="$router.push('/jobGroup/detail?jobGroupId='+ item.id)">
                <q-item-main>
                  <q-item-tile class="content">
                    <div class="pv-4 row">
                      <div class="work-content-title">工作内容：</div>
                      <div class="work-content bold" v-line-clamp:20="1">
                        <span v-for="v in item.jobs" v-if="item.jobs" :key="v.id">
                          <span v-if="v.action" class="ml-5">{{ v.action.name }}</span>
                        </span>
                      </div>

                    </div>
                  </q-item-tile>
                  <q-item-tile class="content">
                    <div class="pv-4 font-14">
                      <div class="ib font-14">记录人：</div>
                      <div class="ib font-14">{{ item.user.fullname }}</div>
                    </div>
                  </q-item-tile>
                  <q-item-tile>
                    <div class="pv-4 row font-14">
                      <div class="col-8">
                        <div class="inline-flex">
                          <div>时间：</div>
                          <div>{{ item.createTime }}</div>
                        </div>
                      </div>
                      <div class="col-4 text-right btn-light">
                        <div class="font-14">查看详情<q-icon name="keyboard arrow right" size="20px"/></div>
                      </div>
                    </div>
                  </q-item-tile>
                </q-item-main>
              </q-item>
            </q-list>
            <div class="row justify-center" style="margin-bottom: 50px;" v-if="!hasLoadAll">
              <q-spinner name="dots" slot="message" :size="40"></q-spinner>
            </div>
          </q-infinite-scroll>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { request } from '../../../common'
import eventBus from '../../../eventBus'
import InfiniteScroll from '../../../mixin/InfiniteScroll'

export default {
  
  props: [
    "codeId"
  ],
  mixins: [
    InfiniteScroll
  ],
  mounted () {
    this.apiUrl = 'jobGroup/list/byCode?codeId=' + this.codeId
    this.scroll = this.$refs.scroll
  }
}
</script>

<style lang='scss'>
  @import "../../../assets/css/_variable.scss";
  #common_info {
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
