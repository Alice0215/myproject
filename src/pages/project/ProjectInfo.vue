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
          <div class="font-12 lh-1-8 address"> <q-item-side float-left  icon="room" class="float-left color-white mw-unset pr-5"/>
          <span v-line-clamp:20="1">{{formattedAddress}}</span></div>
          <div class="mt-3">
            <div class="col font-12 wp-70 pv-2 mt-3 float-left"  v-line-clamp:30="1">简介：{{info.projectDesc}}</div>
            <div class="col font-12 wp-70 pv-2 mt-3 float-left" v-line-clamp:30="1">负责人：
              <span class="i-item pr-5" v-for="(v, index) in info.projectJobList" :key="index" v-if="v.jobType.key==='TL'">{{v.user.fullname}}</span>
            </div>
            <a class="top-btn font-12 float-right bg-white active ph-5 pv-3" @click="$router.push('/projectDetail?id='+projectId)">查看全部</a>
          </div>
        </div>

      </div>
    </q-layout-header>
    <q-page-container>
      <div class="wp-100 ph-15 pt-15">
         <q-btn class="wp-100 font-16 no-color-btn" @click="$router.push('/qcode/add?projectId='+projectId)">申请制作二维码</q-btn>
      </div>
      <q-list v-if="info.others && info.others.codeCountMap.length>0">
        <q-card inline class="q-ma-sm full-width bg-white">
          <q-card-title class="no-padding-bottom" v-line-clamp:20="1">
            <span class="project-title font-16 pb-0"> <i class="iconfont active pr-10">&#xe701;</i>项目二维码</span>
            <q-btn flat  class="card-btn float-right card-color font-14 pr-0"  icon-right="keyboard arrow right"  @click="$router.push('/qcode/list?projectId='+info.id)">更多</q-btn>
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
      <q-list class="bg-white" v-if="info.others &&info.others.codeCountMap.length>0">
        <q-card inline class="q-ma-sm full-width bg-white">
          <q-card-title class="no-padding-bottom" v-line-clamp:20="1">
            <q-item-side float-left  icon="assignment" class="active float-left"/><span class="project-title font-16 float-left">养护记录</span>
            <q-btn flat  class="card-btn float-right card-color font-14 pr-0"  icon-right="keyboard arrow right"  @click="$router.push('/project/maintenance-records?projectId='+info.id)">更多</q-btn>
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
         {{nowTime}}
          <q-item-side class="float-right" icon="date_range" @click.native="openDate"/>
        </div>
        <div class="underline"  v-if="actionCountMap.length > 0">
          <div v-for="(v, index) in actionCountMap" :key="index">
            <q-item class="pv-0">
              <q-item-main >
                {{v.action.name}}
                <span class="font-12 card-color">{{v.actionCount}}条记录</span>
              </q-item-main>
            </q-item>
            <q-item class="pt-0">
              <q-item-main >
                <q-progress :percentage="v.actionCount/actionAllCount*100" height="8px" class="progress-index" />
              </q-item-main>
              <q-item-side class="font-15 inherit" >
                <div class="mr-10 width-10" right >{{Math.round((v.actionCount/actionAllCount)*1000)/10}} %</div>
              </q-item-side>
            </q-item>
          </div>
        </div>
        <div class="underline text-center" v-else>
          <span class="font-16">{{nowTime}}没有养护记录</span>
        </div>
        <q-card inline class="q-ma-sm full-width">
          <q-card-title class="no-padding-bottom" v-line-clamp:20="1">
            <q-item-side float-left  icon="assignment" class="active float-left"/><span class="project-title font-16 float-left">现场巡查记录</span>
            <q-btn flat  class="card-btn float-right card-color font-14 pr-0"  icon-right="keyboard arrow right"  @click="$router.push('/qcode/list?projectId='+item.id)">更多</q-btn>
          </q-card-title>
          <q-card-main class="pb-10">
            <div class="underline wp-100">
            <div class="project-item text-center wp-48 pb-25">
              <div class="font-18  pb-5" v-line-clamp:20="1">0</div>
              <div v-line-clamp:20="1" class="font-14">本月发现问题</div>
            </div>
            <div class="project-item text-center wp-48  pb-25">
              <div class="font-18 pb-5" v-line-clamp:20="1">
                0
              </div>
              <div class="font-14" v-line-clamp:20="1">本月巡查记录</div>
            </div>
            </div>
            <div class="project-item text-center wp-48 border-right pl-10 pv-20">
              <div v-line-clamp:20="1" class="font-14">苗木到场记录</div>
              <div class="font-14 pt-10 pb-5" v-line-clamp:20="1"><span class="pr-8 font-18">0</span>本月记录</div>
            </div>
            <div class="project-item text-center wp-48 pl-10 pv-20">
              <div class="font-14" v-line-clamp:20="1">设备领用记录</div>
              <div class="font-14 pb-5 pt-10" v-line-clamp:20="1">
                <span class="pr-8 font-18">0</span>本月记录
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
      selectData: Date.now(),
      info: {},
      qrcodeInfo: { SingleCount: 0, EquipmentCount: 0, OtherCount: 0, AreaCount: 0 },
      projectId: '',
      groupCountMap: { weekGroupCount: 0, monthGroupCount: 0, todayGroupCount: 0 },
      formattedAddress: '无',
      actionCountMap: [],
      actionAllCount: 0
    }
  },
  computed: {
    nowTime: function () {
      return date.formatDate(this.selectData, 'YYYY年M月')
    }
  },
  mounted () {
    this.projectId = this.$route.query.projectId
    this.getInfo()

    eventBus.$on('close-date-picker', arg => {
      this.selectData = arg
      this.actionCount()
    })
  },
  methods: {
    openDate () {
      eventBus.$emit('open-date-picker', {dateTime: this.selectData, pickerClass: 'month-datetime'})
    },
    getInfo () {
      this.$q.loading.show()
      request('project/detail/v2?projectId=' + this.projectId, 'get', null, 'json', true).then(response => {
        if (response) {
          this.$q.loading.hide()
          this.info = response.data.resultMsg
          let qrAllCount = 0
          let qrCount = 0
          if (!_.isUndefined(this.info.location) && !_.isNull(this.info.location)) {
            this.formattedAddress = this.info.location.formattedAddress
          }
          if (this.info.others.groupCountMap) {
            this.groupCountMap.weekGroupCount = this.info.others.groupCountMap.weekGroupCount
            this.groupCountMap.monthGroupCount = this.info.others.groupCountMap.monthGroupCount
            this.groupCountMap.todayGroupCount = this.info.others.groupCountMap.todayGroupCount
          }
          if (this.info.others.actionCountMap) {
            this.actionCountMap = this.info.others.actionCountMap
            _.forEach(this.actionCountMap, v => {
              this.actionAllCount = this.actionAllCount + v.actionCount
            })
          }

          _.forEach(this.info.others.codeCountMap, v => {
            qrAllCount = qrAllCount + v.codeCount
            if (v.type !== null) {
              qrCount = qrCount + v.codeCount
              if (v.type.key === plantType.SINGLE) {
                this.qrcodeInfo.SingleCount = v.codeCount
              } else if (v.type.key === plantType.DEVICE) {
                this.qrcodeInfo.EquipmentCount = v.codeCount
              } else if (v.type.key === plantType.OTHER) {
                this.qrcodeInfo.OtherCount = v.codeCount
              } else if (v.type.key === plantType.AREA) {
                this.qrcodeInfo.AreaCount = v.codeCount
              }
            }
          })
          this.qrcodeInfo.qrCount = qrCount
          this.qrcodeInfo.qrAllCount = qrAllCount
        }
      })
    },
    actionCount () {
      let from = date.formatDate(this.selectData, 'YYYY-MM') + '-01'
      this.$q.loading.show()
      request('jobGroup/actionCount?projectId=' + this.projectId + '&from=' + from, 'get', null, 'json', true).then(response => {
        if (response) {
          this.$q.loading.hide()
          this.actionCountMap = response.data.resultMsg
          this.actionAllCount = 0
          _.forEach(this.actionCountMap, v => {
            this.actionAllCount = this.actionAllCount + v.actionCount
          })
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
