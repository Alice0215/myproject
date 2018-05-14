<template>
  <q-layout id="project-info" view="Hhh lpr Fff"  class="bg-primary">
    <q-layout-header class="no-box-shadow q-toolbar">
      <q-toolbar class="pl-0">
        <a @click="$router.goBack()" class="back-a text-white">
          <q-item-side left  icon="keyboard arrow left" class="back-left text-white"/>
          返回
        </a>
        <q-toolbar-title class="header-title text-white">
          {{info.projectName}}
        </q-toolbar-title>
        <q-item-side class="white-right" right/>
      </q-toolbar>
      <div class="background-view">
        <div class="mh-3 float-left">
          <div class="font-12 lh-1-8 pv-2 address"> <q-item-side float-left  icon="room" class="float-left color-white mw-unset pr-5"/>
          <span>{{formattedAddress}}</span></div>
          <div class="row q-body-1 mt-3 pv-2">
            <div class="col font-12">简介： {{info.projectDesc}}</div>
          </div>
           <div class="row q-body-1 mt-3 pv-2">
            <div class="col font-12">负责人：
              <span class="i-item pr-5" v-for="(v, index) in info.projectJobList" :key="index" v-if="v.jobType.key==='TL'">{{v.user.username}}</span>
            </div>
          </div>
        </div>
         <a class="top-btn font-12 float-right bg-white active ph-5 pv-3">查看全部</a>
      </div>
    </q-layout-header>
    <q-page-container>
      <div class="wp-100 ph-15 pt-15">
         <q-btn class="wp-100 font-16 no-color-btn" @click="$router.push('/project/add')">申请制作二维码</q-btn>
      </div>
      <q-list>
        <q-card inline class="q-ma-sm full-width bg-white">
          <q-card-title class="no-padding-bottom" v-line-clamp:20="1">
            <span class="project-title font-16 pb-0"> <i class="iconfont active pr-10">&#xe701;</i>项目二维码</span>
            <q-btn flat  class="card-btn float-right card-color font-14 pr-0"  icon-right="keyboard arrow right"  @click="$router.push('/qcode/list?projectId='+item.id)">更多</q-btn>
          </q-card-title>
          <q-card-main class="pb-10">
            <div class="text-center mb-20">
              <div class="pb-5 font-14"><span class="font-20 active">{{qrcodeInfo.qrCount}}</span>/{{qrcodeInfo.qrAllCount}}</div>
              <div v-line-clamp:20="1" class="font-12">已录入二维码数量</div>
            </div>
            <div class="project-item text-center">
              <div class="active font-18  pb-5" v-line-clamp:20="1">{{qrcodeInfo.SingleCount}}</div>
              <div v-line-clamp:20="1" class="font-14">单株植物</div>
            </div>
            <div class="project-item text-center ">
              <div class="active font-18  pb-5" v-line-clamp:20="1">
               {{qrcodeInfo.AreaCount}}
              </div>
              <div class="font-14" v-line-clamp:20="1">片区植物</div>
            </div>
            <div class="project-item text-center">
              <div class="active font-18  pb-5" v-line-clamp:20="1">
              {{qrcodeInfo.EquipmentCount}}
              </div>
              <div class="font-14" v-line-clamp:20="1">设备</div>
            </div>
            <div class="project-item text-center">
              <div class="active font-18  pb-5" v-line-clamp:20="1">{{qrcodeInfo.OtherCount}}</div>
              <div class="font-14" v-line-clamp:20="1">其它</div>
            </div>
          </q-card-main>
        </q-card>
      </q-list>
      <q-list class="bg-white">
        <q-card inline class="q-ma-sm full-width bg-white">
          <q-card-title class="no-padding-bottom" v-line-clamp:20="1">
            <q-item-side float-left  icon="assignment" class="active float-left"/><span class="project-title font-16 float-left">养护记录</span>
            <q-btn flat  class="card-btn float-right card-color font-14 pr-0"  icon-right="keyboard arrow right"  @click="$router.push('/qcode/list?projectId='+item.id)">更多</q-btn>
          </q-card-title>
          <q-card-main class="pb-10">
            <div class="project-item text-center wp-32">
              <div class="active font-18  pb-5" v-line-clamp:20="1">{{groupCountMap.weekGroupCount}}</div>
              <div v-line-clamp:20="1" class="font-14">本周记录</div>
            </div>
            <div class="project-item text-center wp-32">
              <div class="active font-18  pb-5" v-line-clamp:20="1">
               {{groupCountMap.monthGroupCount}}
              </div>
              <div class="font-14" v-line-clamp:20="1">本月</div>
            </div>
            <div class="project-item text-center  wp-32">
              <div class="active font-18  pb-5" v-line-clamp:20="1">
                {{groupCountMap.todayGroupCount}}
              </div>
              <div class="font-14" v-line-clamp:20="1">今天</div>
            </div>
          </q-card-main>
        </q-card>
        <div class="wp-100 pl-16 underline select-time">
          2018年4月
          <q-item-side class="float-right" icon="date_range" @click.native="chooseDateTime()"/>
        </div>
        <div class="underline">
        <div>
        <q-item class="pv-0">
          <q-item-main >
            苗木栽培-栽植修剪
            <span class="font-12 card-color">6条记录</span>
          </q-item-main>
        </q-item>
        <q-item class="pt-0">
          <q-item-main >
            <q-progress :percentage="per" height="8px" class="progress-index" />
          </q-item-main>
          <q-item-side class="font-15 inherit" >
            <div class="mr-10 width-10" right >20%</div>
          </q-item-side>
        </q-item>
        </div>
        <div>
        <q-item class="pv-0">
          <q-item-main >
            苗木栽培-栽植修剪
            <span class="font-12 card-color">6条记录</span>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main >
            <q-progress :percentage="per" height="8px" class="progress-index" />
          </q-item-main>
          <q-item-side class="font-15 inherit" >
            <div class="mr-10 width-10" right >20%</div>
          </q-item-side>
        </q-item>
        </div>
        </div>
        <q-card inline class="q-ma-sm full-width">
          <q-card-title class="no-padding-bottom" v-line-clamp:20="1">
            <q-item-side float-left  icon="assignment" class="active float-left"/><span class="project-title font-16 float-left">现场巡查记录</span>
            <!-- <span class="project-title font-16">现场巡查记录</span> -->
            <q-btn flat  class="card-btn float-right card-color font-14 pr-0"  icon-right="keyboard arrow right"  @click="$router.push('/qcode/list?projectId='+item.id)">更多</q-btn>
          </q-card-title>
          <q-card-main class="pb-10">
            <div class="underline wp-100">
            <div class="project-item text-center wp-48 pb-25">
              <div class="active font-18  pb-5" v-line-clamp:20="1">1</div>
              <div v-line-clamp:20="1" class="font-14">本月发现问题</div>
            </div>
            <div class="project-item text-center wp-48  pb-25">
              <div class="active font-18  pb-5" v-line-clamp:20="1">
                1
              </div>
              <div class="font-14" v-line-clamp:20="1">本月巡查记录</div>
            </div>
            </div>
            <div class="project-item text-left wp-48 border-right pl-10 pv-20">
              <div v-line-clamp:20="1" class="font-14">苗木到场记录</div>
              <div class="font-14 pt-10 pb-5" v-line-clamp:20="1"><span class="pr-8">1</span>本月记录</div>
            </div>
            <div class="project-item text-left wp-48 pl-10 pv-20">
              <div class="font-14" v-line-clamp:20="1">设备领用记录</div>
              <div class="font-14 pb-5 pt-10" v-line-clamp:20="1">
                <span class="pr-8">1</span>本月记录
              </div>
            </div>
          </q-card-main>
        </q-card>
      </q-list>
    </q-page-container>
  </q-layout>
</template>

<script>
import { request } from '../../common'
import { date } from 'quasar'
import _ from 'lodash'
import eventBus from '../../eventBus'
import { plantType } from '../../const'

export default {
  data () {
    return {
      per: 20,
      info: {},
      qrcodeInfo: { SingleCount: 0, EquipmentCount: 0, OtherCount: 0, AreaCount: 0 },
      projectId: '',
      groupCountMap: { weekGroupCount: 0, monthGroupCount: 0, todayGroupCount: 0 },
      formattedAddress: '',
      actionCountMap: []
    }
  },
  created () {
    this.projectId = this.$route.query.projectId
    this.getInfo()
  },
  methods: {
    chooseDateTime () {
      eventBus.$emit('open-date-picker', date.formatDate(Date.parse(new Date()), 'M月D日'))
    },
    getInfo () {
      this.$q.loading.show()
      request('project/detail/v2?projectId=' + this.projectId, 'get', null, 'json', true).then(response => {
        if (response) {
          this.$q.loading.hide()
          this.info = response.data.resultMsg
          let qrAllCount = 0
          let qrCount = 0
          this.formattedAddress = this.info.location.formattedAddress
          if (this.info.groupCountMap) {
            this.groupCountMap.weekGroupCount = this.info.groupCountMap.weekGroupCount
            this.groupCountMap.monthGroupCount = this.info.groupCountMap.monthGroupCount
            this.groupCountMap.todayGroupCount = this.info.groupCountMap.todayGroupCount
          }
          if (this.info.actionCountMap) {
            this.actionCountMap = this.info.actionCountMap
          }

          _.forEach(this.info.others.codeCountMap, v => {
            qrAllCount = qrAllCount + v.codeCount
            if (v.type !== null) {
              qrCount = qrCount + v.codeCount
            }
            if (v.type === plantType.SINGLE) {
              this.qrcodeInfo.SingleCount = v.codeCount
            }
            if (v.type === plantType.EQUIPMENT) {
              this.qrcodeInfo.EquipmentCount = v.codeCount
            }
            if (v.type === plantType.OTHER) {
              this.qrcodeInfo.OtherCount = v.codeCount
            }
            if (v.type === plantType.AREA) {
              this.qrcodeInfo.AreaCount = v.codeCount
            }
          })
          this.qrcodeInfo.qrCount = qrCount
          this.qrcodeInfo.qrAllCount = qrAllCount
        }
      })
    },
    actionCount () {
      this.$q.loading.show()
      let select = '2018-05-01'
      request('jobGroup/actionCount?projectId=' + this.projectId + '&from=' + select, 'get', null, 'json', true).then(response => {
        if (response) {
          this.$q.loading.hide()
          this.actionCountMap = response.data.resultMsg
        }
      })
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
  .address .q-icon.material-icons {
    font-size: 15px;
  }
  .q-progress-track {
    color: #f0f0f0;
    opacity: 1;
  }
  .progress-index {
    color: #fea817 !important;
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
  .wp-48 {
    width: 48%;
  }
  .border-bottom {
    border-bottom: 1px solid #e8e8e8;
  }
  .border-right {
    border-right: 1px solid #e8e8e8;
  }
  .select-time {
    line-height: 35px;
    font-size: 12px;
    .q-icon.material-icons {
      font-size: 18px;
    }
  }
  .card-color {
    color: #999999;
  }
}
</style>
