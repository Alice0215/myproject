<template>
  <q-layout view="Hhh lpr Fff">
    <q-layout-header>
      <q-toolbar>
          <a @click="back" class="back-a font-14">
          <q-item-side left  icon="keyboard arrow left" class="back-left "/>
          返回
        </a>
        <q-toolbar-title class="header-title">
          {{count}}个项目
        </q-toolbar-title>
         <q-item-side class="white-right" right/>
      </q-toolbar>
    </q-layout-header>
    <q-page-container id="project-list" class="bg-primary">
    <q-infinite-scroll :handler="load" class="scroll-field" ref="scroll">
      <q-list class="full-width card">
        <q-card inline class="q-ma-sm full-width bg-white"  v-for="(item, index) in list" :key="index" @click.native="$router.push('/ProjectInfo?projectId='+item.id)">
          <q-card-title class="no-padding-bottom" v-line-clamp:20="1">
            <span class="project-title font-18 bold wp-80" v-line-clamp:20="1">{{item.projectName}}</span>
            <span class="float-right font-14 text-right wp-15 card-color">{{item.projectType.name}}</span>
          </q-card-title>
          <q-card-main class="underline pb-10">
            <div class="project-item text-center">
              <div class="active font-18 bold pb-5" v-line-clamp:20="1">{{item.others.memberSize}}</div>
              <div v-line-clamp:20="1" class="font-12">项目成员/人</div>
            </div>
            <div class="project-item text-center">
              <div class="active font-18 bold pb-5" v-line-clamp:20="1"><span v-if="item.others.codeCount">{{item.others.codeCount}}</span><span v-if="!item.others.codeCount">0</span></div>
              <div class="font-12" v-line-clamp:20="1">二维码数量/个</div>
            </div>
            <div class="project-item text-center">
              <div class="active font-18 bold pb-5" v-line-clamp:20="1"><span v-if="item.others.groupCount">{{item.others.groupCount}}</span><span v-if="!item.others.groupCount">0</span></div>
              <div class="font-12" v-line-clamp:20="1">今日记录/个</div>
            </div>
            <div class="project-item text-center">
              <div class="active font-18 bold pb-5" v-line-clamp:20="1">{{item.others.problems}}</div>
              <div class="font-12" v-line-clamp:20="1">现场巡查/个</div>
            </div>
          </q-card-main>
          <q-card-actions class="col-12">
            <span class="col-8 float-left leaders font-14">负责人：<span class="i-item" v-for="(v, index) in item.others.leaders" :key="index">
              <span v-if="index===0">{{v}}</span><span v-if="index < 2 && index > 0">、{{v}}</span><span v-if="index===2">等</span></span></span>
            <div class="col-4">
              <q-btn flat  class="card-btn float-right card-color font-14"  icon-right="keyboard arrow right"  @click="$router.push('/ProjectInfo?projectId='+item.id)">查看详情</q-btn>
            </div>
          </q-card-actions>
        </q-card>
      </q-list>
      <div class="row justify-center" style="margin-bottom: 50px;" v-if="!hasLoadAll">
        <q-spinner name="dots" slot="message" :size="40"></q-spinner>
      </div>
    </q-infinite-scroll>
    </q-page-container>
    <q-layout-footer class="footer" id="projectList">
       <q-btn class="full-width btn m-0 font-16" @click="$router.push('/project/add')">新建项目</q-btn>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import { request } from '../../common'
import InfiniteScroll from '../../mixin/InfiniteScroll'

export default {
  data () {
    return {
      count: 0
    }
  },
  mixins: [
    InfiniteScroll
  ],
  mounted () {
    this.apiUrl = 'project/list/v2?'
    this.scroll = this.$refs.scroll
    this.getProjectCount()
  },
  methods: {
    back(){
      this.$router.push('/')
    },
    getProjectCount () {
      request('project/count', 'get', '', 'json', true).then(response => {
        if (response) {
          this.count = response.data.resultMsg
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#project-list {
  .q-list {
    border: none;
  }
  .underline{
    border-bottom: 1px solid #E8E8E8 !important;
  }
  margin-top: 15px;
  .project-title {
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .project-item {
    width: 23%;
    display: inline-block;
    overflow: hidden;
  }
  .q-card-container {
    margin: 10px;
    padding: 0px;
  }
  .leaders {
    line-height: 35px;
  }
  .q-card-title {
    line-height: inherit;
    padding-top: 10px;
    display: inherit;
  }
  .q-card {
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14),
      0 1px 1px -2px rgba(0, 0, 0, 0.12);
  }
  .card-color {
    color: #999999;
  }
}
</style>
