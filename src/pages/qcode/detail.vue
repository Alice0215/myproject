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
         <q-toolbar-title class="header-title" v-if="info.code && info.code.alias">
          {{info.code.alias}}
        </q-toolbar-title>
         <q-item-side class="white-right" right><i class="iconfont">&#xe701;</i></q-item-side>
      </q-toolbar>
      <q-tabs inverted align="justify" no-pane-border>
        <q-tab default name="maintenance-records" slot="title" v-if="info.code" :label="info.code.type.value"  class="mt-5 pb-0" @click.native="choose('qr')"/>
        <q-tab default name="maintenance-records" slot="title" v-if="!info.code" label="二维码信息"  class="mt-5 pb-0" @click.native="choose('qr')"/>
        <q-tab slot="title" label="养护记录" class="mt-5 pb-0" @click.native="choose('maintenance')"/>
        <q-tab slot="title" label="巡查记录" class="mt-5 pb-0" @click.native="choose('')"/>
      </q-tabs>
    </q-layout-header>
    <q-page-container>
      <div v-if="tab==='qr'"  class="bg-white mt-10">
        <div class="qr-info pv-15 bg-white box">
          <div v-if="type==='EQUIPMENT' || type==='OTHER'">
            <p><span class="wp-30 ib title-font-color">名称：</span><span v-if="info.alias"  v-line-clamp:20="1" class="ib wp-70 float-right">{{info.alias}}</span></p>
            <p><span class="wp-30 ib title-font-color">所属项目：</span><span v-if="info.project" v-line-clamp:20="1" class="wp-70 ib float-right">{{info.project.projectName}}</span></p>
            <p><span class="wp-30 ib title-font-color">地址：</span><span v-if="info.location" v-line-clamp:20="1" class="wp-70 ib float-right">{{info.location.formattedAddress}}</span></p>
            <p v-if="info.description"><span class="block title-font-color title-font-color">备注：</span>{{info.description}}</p>
            <p class="pic-field" v-if=" info.pictures">
              <span class="block title-font-color">现场图片：</span>
              <span v-for="item in info.pictures" v-bind:key="item.id">
                <img :src="picUrl+item.filePath" v-preview="previewApi+item.filePath"/>
              </span>
            </p>
          </div>
        </div>
        <div v-if="type==='SINGLE'|| type==='AREA'">
          <div class="qr-info bg-white box">
            <p><span class="wp-30 ib title-font-color">二维码编号：</span><span v-if="info.code && info.code.identifier">{{info.code.identifier}}</span></p>
            <p><span class="wp-30 ib title-font-color">二维码类型：</span><span v-if="info.code && info.code.type" >{{info.code.type.value}}</span></p>
            <p><span class="wp-30 ib title-font-color">所属项目：</span><span v-if="info.code && info.code.project" v-line-clamp:20="1" class="ib wp-70 float-right">{{info.code.project.projectName}}</span></p>
            <p><span class="wp-30 ib title-font-color">地址：</span><span v-if="info.code && info.code.location" v-line-clamp:20="1" class="wp-70 ib float-right">{{info.code.location.formattedAddress}}</span></p>
            <div v-if="type==='SINGLE'">
            <p><span class="wp-30 ib title-font-color">植物名称：</span><span v-if="info.code && info.code.alias" class="ib wp-70 float-right"  v-line-clamp:20="1">{{info.code.alias}}</span></p>
            <p><span class="wp-30 ib title-font-color">苗木分类：</span><span v-if="info.category">{{info.category.name}}</span></p>
            <p class="param"><span class="wp-30 ib title-font-color">苗木规格：</span><span class="ib pr-5">胸径：{{info.xiongJing}}cm</span><span  class="ib pr-5">高度：{{info.gaoDu}}cm</span><span  class="ib pr-5">冠幅：{{info.guanFu}}cm</span></p>
            <p><span class="wp-30 ib title-font-color">苗木商名称：</span><span v-if="info.dealer" class="ib wp-70 float-right"  v-line-clamp:20="1">{{info.dealer}}</span></p>
            <p><span class="wp-30 ib title-font-color">苗木其它信息：</span><span class="ib wp-70 float-right"  v-line-clamp:20="1">{{info.other}}</span></p>
            </div>
          </div>

          <div v-if="type==='AREA'">
            <div class="qr-info bg-white box">
              <p><span class="wp-30 ib title-font-color">片区名称：</span><span v-if="info.code && info.code.alias" class="ib wp-70 float-right"  v-line-clamp:20="1">{{info.code.alias}}</span></p>
              <p><span class="wp-30 ib title-font-color">片区面积：</span><span>{{info.acreage}}</span></p>
            </div>
            <div class="qr-info box bg-primary">
              <p class="pt-10">片区植物:</p>
              <div v-for="item in info.singles" :key="item.id" class="full-width">
                <q-item link class="bg-white" @click.native="toAreaDetail(item)">
                  <q-item-main>
                    <div class="wp-50 float-left" v-line-clamp:20="1">{{item.alias}}</div><div class="wp-32 float-left" v-line-clamp:20="1">数量：{{item.amount}}</div>
                  </q-item-main>
                  <div class="wp-15 float-right" v-line-clamp:20="1">详情</div><q-item-side right icon="keyboard arrow right" class="auto-width" />
                </q-item>
                <div class="h-10"></div>
              </div>
            </div>
          </div>
           <div class="qr-info bg-white box">
          <p v-if="info.code && info.code.description"><span class="block title-font-color">备注：</span>{{info.code.description}}</p>
          <p class="pic-field"  v-if="info.code && info.code.pictures">
            <span v-for="item in info.code.pictures" v-bind:key="item.id">
              <img :src="picUrl+item.filePath" v-preview="previewApi+item.filePath"
                    :key="item.id"
                    preview-title-enable="false" />
            </span>
          </p>
          </div>
      </div>
      </div>
      <q-page id="maintenance" v-if="tab==='maintenance'">
        <div  class="bg-white mt-10">
        <q-infinite-scroll :handler="getMaintenanceInfoad">
          <q-list separator v-if="joblist.length > 0">
            <q-item v-for="item in joblist"
                    :key="item.id"
                    @click.native="$router.push('/jobGroup/detail?jobGroupId='+ item.id)">
              <q-item-main>
                <q-item-tile class="content">
                  <div class="pv-4 row">
                    <div class="work-content-title">工作内容：</div>
                    <div class="work-content" v-line-clamp:20="1">
                    <span v-for="v in item.jobs" v-if="item.jobs" :key="v.id">
                      <span v-if="v.action" class="ml-5">{{ v.action.name }}</span>
                    </span>
                    </div>
                  </div>
                </q-item-tile>
                <q-item-tile class="content">
                  <div class="pv-4">
                    <div class="ib">记录人：</div>
                    <div class="ib">{{ item.user.fullname }}</div>
                  </div>
                </q-item-tile>
                <q-item-tile>
                  <div class="pv-4 row font-15">
                    <div class="col-8">
                      <div class="inline-flex">
                        <div>时间：</div>
                        <div>{{ item.createTime }}</div>
                      </div>
                    </div>
                    <div class="col-4 text-right btn-light">
                      <div>查看详情<q-icon name="keyboard arrow right" size="20px"/></div>
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
import { request } from '../../common'
import { server } from '../../const'
import eventBus from '../../eventBus'
export default {
  data () {
    return {
      projectId: '',
      qrCodeId: '',
      type: '',
      editable: false,
      qrImgUrl: '',
      info: {},
      picUrl: '',
      previewApi: '',
      pageNo: 1,
      hasLoadAll: false,
      tab: 'qr',
      joblist: []
    }
  },
  created () {
    this.qrCodeId = this.$route.query.id
    this.type = this.$route.query.type
    this.projectId = this.$route.query.projectId
    this.picUrl = server.THUMBNAIL_API
    this.previewApi = server.PREVIEW_API
    this.getQrInfo()
  },
  methods: {
    goToView () {
      localStorage.setItem('qrcode-preview', this.qrImgUrl)
      this.$router.push('/qcode/view')
    },
    toAreaDetail (info) {
      this.$store.commit('Qrcode/setCurrent', info)
      this.$router.push('/areaDetail')
    },
    edit () {
      if (!this.editable) {
        this.$q.dialog({
          title: '提示',
          message: '您没有编辑权限'
        })
        return
      }
      localStorage.setItem('qrCodeId', this.qrCodeId)
      localStorage.setItem('typeKey', this.type)
      this.$router.push('/qcode/edit?id=' + this.qrCodeId + '&typeKey=' + this.type)
    },
    choose (type) {
      this.tab = type
    },
    initData () {
      this.joblist = []
      this.pageNo = 1
      this.hasLoadAll = false
    },
    async getMaintenanceInfoad (index, done) {
      let that = this
      setTimeout(() => {
        if (!that.hasLoadAll) {
          request('jobGroup/list/byProject?projectId=' + that.projectId + '&pageNo=' + that.pageNo + '&pageSize=20', 'get', '', 'json', true).then(response => {
            if (response) {
              let list = response.data.resultMsg
              if (list.length === 0 || !list.length) {
                that.hasLoadAll = true
                return
              }
              if (list.length < 20) {
                that.hasLoadAll = true
              } else {
                that.pageNo++
              }
              if (that.joblist.length > 0) {
                that.joblist = that.joblist.concat(list)
              } else {
                that.joblist = list
              }
              if (this.joblist.length > 0) {
                eventBus.$emit('has-maintenance-records')
              }
              done()
            }
          })
        }
      }, 100)
    },
    getQrInfo () {
      this.$q.loading.show()
      request('qrcode/detail?qrCodeId=' + this.qrCodeId, 'get', null, 'json', true).then(response => {
        this.$q.loading.hide()
        if (response) {
          this.info = response.data.resultMsg
          if (this.type === 'SINGLE' || this.type === 'AREA') {
            if (!this.info.code) {
              this.info.code = this.info
            }
            this.qrImgUrl = server.THUMBNAIL_QR + this.info.code.batch.batchNo + '/' + this.qrCodeId + '.png'
          } else {
            this.qrImgUrl = server.THUMBNAIL_QR + this.info.batch.batchNo + '/' + this.qrCodeId + '.png'
          }
          this.editable = response.data.resultMsg.editable
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#qr-detail {
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
  #maintenance {
  .q-item-main {
    .content {
      .work-content-title {
        width: 75px;
      }
      .work-content {
        width: calc(100% - 90px);
      }
      div {
        display: flex;
        div {
          font-size: 15px;
        }
      }
    }
  }
  .title {
    font-size: 18px !important;
    color: $text-highlight;
  }
  .type-title {
    color: $type-title;
  }
  .btn-light {
    color: $light-text;
    font-size: 15px;
  }
}
}
</style>
