<template>
  <q-layout id="project-info" view="Hhh lpr Fff"  class="bg-primary">
    <q-layout-header class="no-box-shadow q-toolbar">
      <q-toolbar class="pl-0">
        <a @click="$router.goBack()" class="back-a text-white">
          <q-item-side left  icon="keyboard arrow left" class="back-left text-white"/>
          返回
        </a>
        <q-toolbar-title class="header-title text-white">
          项目名称
        </q-toolbar-title>
        <q-item-side class="white-right" right/>
      </q-toolbar>
      <div class="background-view">
        <div class="mh-3">
          <div class="q-title pt-10">11111</div>
          <div class="row q-body-1 mt-3">
            <div class="col">工期 1111111</div>
            <div class="v-border-right-line mv-3"></div>
            <div class="col ml-20" v-line-clamp:20="1">项目 11111111</div>
          </div>
        </div>
      </div>
    </q-layout-header>
    <q-page-container>
      <div class="wp-100 p-15">
         <q-btn class="wp-100 font-16 no-color-btn" @click="$router.push('/project/add')">申请制作二维码</q-btn>
      </div>
      <q-list>
        <q-card inline class="q-ma-sm full-width bg-white">
          <q-card-title class="no-padding-bottom" v-line-clamp:20="1">
            <span class="project-title font-16">项目二维码</span>
            <q-btn flat  class="card-btn float-right card-color font-14"  icon-right="keyboard arrow right"  @click="$router.push('/qcode/list?projectId='+item.id)">更多</q-btn>
          </q-card-title>
          <q-card-main class="pb-10">
            <div class="text-center mb-20">
              <div class="pb-5 font-14"><span class="font-20 active">120</span>/160</div>
              <div v-line-clamp:20="1" class="font-12">已录入二维码数量</div>
            </div>
            <div class="project-item text-center">
              <div class="active font-18  pb-5" v-line-clamp:20="1">1</div>
              <div v-line-clamp:20="1" class="font-14">单株植物</div>
            </div>
            <div class="project-item text-center ">
              <div class="active font-18  pb-5" v-line-clamp:20="1">
                1
              </div>
              <div class="font-14" v-line-clamp:20="1">片区植物</div>
            </div>
            <div class="project-item text-center">
              <div class="active font-18  pb-5" v-line-clamp:20="1">
                1
              </div>
              <div class="font-14" v-line-clamp:20="1">设备</div>
            </div>
            <div class="project-item text-center">
              <div class="active font-18  pb-5" v-line-clamp:20="1">11</div>
              <div class="font-14" v-line-clamp:20="1">其它</div>
            </div>
          </q-card-main>
        </q-card>
      </q-list>
      <q-list class="bg-white">
        <q-card inline class="q-ma-sm full-width">
          <q-card-title class="no-padding-bottom" v-line-clamp:20="1">
            <span class="project-title font-16">养护记录</span>
            <q-btn flat  class="card-btn float-right card-color font-14"  icon-right="keyboard arrow right"  @click="$router.push('/qcode/list?projectId='+item.id)">更多</q-btn>
          </q-card-title>
          <q-card-main class="pb-10">
            <div class="project-item text-center wp-32">
              <div class="active font-18  pb-5" v-line-clamp:20="1">1</div>
              <div v-line-clamp:20="1" class="font-14">本周记录</div>
            </div>
            <div class="project-item text-center wp-32">
              <div class="active font-18  pb-5" v-line-clamp:20="1">
                1
              </div>
              <div class="font-14" v-line-clamp:20="1">本月</div>
            </div>
            <div class="project-item text-center  wp-32">
              <div class="active font-18  pb-5" v-line-clamp:20="1">
                1
              </div>
              <div class="font-14" v-line-clamp:20="1">设备</div>
            </div>
          </q-card-main>
        </q-card>
        <div class="wp-100 pl-16 underline">
          2018年4月
          <q-item-side class="float-right" icon="date_range"/>
        </div>
        <div class="underline">
        <q-item>
          <q-item-main >
            <q-progress percentage="20" height="8px" class="progress-index" />
          </q-item-main>
          <q-item-side class="font-15 inherit" >
            <div class="mr-10 width-10" right >20%</div>
          </q-item-side>
        </q-item>
        <q-item>
          <q-item-main >
            <q-progress percentage="20" height="8px" class="progress-index" />
          </q-item-main>
          <q-item-side class="font-15 inherit" >
            <div class="mr-10 width-10" right >20%</div>
          </q-item-side>
        </q-item>
        <q-item>
          <q-item-main >
            <q-progress percentage="20" height="8px" class="progress-index" />
          </q-item-main>
          <q-item-side class="font-15 inherit" >
            <div class="mr-10 width-10" right >20%</div>
          </q-item-side>
        </q-item>
        </div>
        <q-card inline class="q-ma-sm full-width">
          <q-card-title class="no-padding-bottom" v-line-clamp:20="1">
            <span class="project-title font-16">现场巡查记录</span>
            <q-btn flat  class="card-btn float-right card-color font-14"  icon-right="keyboard arrow right"  @click="$router.push('/qcode/list?projectId='+item.id)">更多</q-btn>
          </q-card-title>
          <q-card-main class="pb-10">
            <div class="project-item text-center wp-48 border-bottom">
              <div class="active font-18  pb-5" v-line-clamp:20="1">1</div>
              <div v-line-clamp:20="1" class="font-14">本月发现问题</div>
            </div>
            <div class="project-item text-center wp-48 border-bottom">
              <div class="active font-18  pb-5" v-line-clamp:20="1">
                1
              </div>
              <div class="font-14" v-line-clamp:20="1">本月巡查记录</div>
            </div>
            <div class="project-item text-left wp-48 border-right">
              <div class="active font-18  pb-5" v-line-clamp:20="1">1</div>
              <div v-line-clamp:20="1" class="font-14">本月发现问题</div>
            </div>
            <div class="project-item text-left wp-48">
              <div class="active font-18  pb-5" v-line-clamp:20="1">
                1
              </div>
              <div class="font-14" v-line-clamp:20="1">本月巡查记录</div>
            </div>
          </q-card-main>
        </q-card>
      </q-list>
    </q-page-container>
  </q-layout>
</template>

<script>
import { request } from '../../common'

export default {
  data () {
    return {
      list: '',
      loading: false,
      pageNo: 1,
      hasLoadAll: false
    }
  },
  mounted () {
  },
  methods: {
    toDetail (projectId) {
      return 'qcode/List?projectId' + projectId
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#project-info {
  .background-view {
    height: 90px;
    color: white;
    background: -webkit-gradient(
      linear,
      left top,
      right bottom,
      from(#239f41),
      to(#239f5b)
    );
  }
  .q-toolbar {
    background: -webkit-gradient(
      linear,
      left top,
      right bottom,
      from(#239f41),
      to(#239f5b)
    ) !important;
  }
  .project-item {
    display: inline-block;
    overflow: hidden;
    width: 24%;
  }
  .project-title {
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .q-card {
    border-radius: 0px;
    box-shadow: none;
  }
  .wp-48{
    width: 48%;
  }
   .border-bottom {
    border-bottom: 1px solid #e8e8e8;
  }
  .border-right {
    border-right: 1px solid #e8e8e8;
  }
}
</style>
