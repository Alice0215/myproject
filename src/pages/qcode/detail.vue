<template>
 <q-layout view="Hhh lpr Fff" class="bg-primary" id="qr-detail">
    <q-layout-header>
      <q-toolbar>
          <a @click="this.$router.goBack()" class="back-a font-14">
          <q-item-side left  icon="keyboard arrow left" class="back-left "/>
          返回
        </a>
        <q-toolbar-title class="header-title" v-if="info.alias">
          {{info.alias}}
        </q-toolbar-title>
         <q-toolbar-title class="header-title" v-if="info.code && info.code.alias">
          {{info.code.alias}}
        </q-toolbar-title>
         <q-item-side class="white-right" right/>
      </q-toolbar>
      <q-tabs inverted align="justify" no-pane-border>
        <q-tab default name="maintenance-records" slot="title" label="植物信息"  class="mt-5 pb-0" />
        <q-tab slot="title" label="养护记录" class="mt-5 pb-0"/>
        <q-tab slot="title" label="巡查记录" class="mt-5 pb-0"/>
      </q-tabs>
    </q-layout-header>
    <q-page-container class="bg-white box">
      <div class="qr-info pv-15">
        <div v-if="type==='EQUIPMENT' || type==='OTHER'">
          <p><span class="wp-30 ib title-font-color">名称：</span><span v-if="info.alias"  v-line-clamp:20="1" class="ib wp-70 float-right">{{info.alias}}</span></p>
          <p><span class="wp-30 ib title-font-color">所属项目：</span><span v-if="info.project" v-line-clamp:20="1" class="wp-70 ib float-right">{{info.project.projectName}}</span></p>
           <p><span class="wp-30 ib title-font-color">地址：</span><span v-if="info.location" v-line-clamp:20="1" class="wp-70 ib float-right">{{info.location.formattedAddress}}</span></p>
          <p v-if="info.description"><span class="block title-font-color">备注：</span>{{info.description}}</p>
          <p class="pic-field" v-if=" info.pictures">
            <span v-for="item in info.pictures" v-bind:key="item.id">
              <img :src="picUrl+item.filePath" v-preview="previewApi+item.filePath"/>
            </span>
          </p>
        </div>
        <div v-if="type==='SINGLE'|| type==='AREA'">
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
          <div v-if="type==='AREA'">
            <p>片区名称：<span v-if="info.code && info.code.alias" class="ib wp-70 float-right"  v-line-clamp:20="1">{{info.code.alias}}</span></p>
            <p>片区面积：<span>{{info.acreage}}</span></p>
            <p>植物:</p>
            <p v-if="singles && singles.alias">
              <q-chips-input v-model="singles.alias" hide-underline readonly chips-bg-color="lightGray" chips-color="black"/>
            </p>
          </div>
          <p v-if="info.code && info.code.description"><span class="block title-font-color">备注：</span>{{info.code.description}}</p>
          <p class="pic-field"  v-if="info.code && info.code.pictures">
            <span class="block">现场图片：</span>
            <span v-for="item in info.code.pictures" v-bind:key="item.id">
              <img :src="picUrl+item.filePath" v-preview="previewApi+item.filePath"
                    :key="item.id"
                    preview-title-enable="false" />
            </span>
          </p>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { request } from '../../common'
import { server } from '../../const'
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
      singles: {}
    }
  },
  created () {
    this.qrCodeId = this.$route.query.id
    this.type = this.$route.query.type
    this.projectId = this.$route.query.projectId
    this.picUrl = server.THUMBNAIL_API
    this.previewApi = server.PREVIEW_API
    this.getInfo()
  },
  methods: {
    goToView () {
      localStorage.setItem('qrcode-preview', this.qrImgUrl)
      this.$router.push('/qcode/view')
    },
    add () {
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
    getInfo () {
      this.$q.loading.show()
      request('qrcode/detail?qrCodeId=' + this.qrCodeId, 'get', null, 'json', true).then(response => {
        this.$q.loading.hide()
        if (response) {
          this.info = response.data.resultMsg
          if (this.type === 'SINGLE' || this.type === 'AREA') {
            if (!this.info.code) {
              this.info.code = this.info
            }
            let singles = response.data.resultMsg.singles
            this.singles.alias = []
            for (let key in singles) {
              this.singles.alias.push(singles[key]['alias'])
            }
          } else if (this.type === 'EQUIPMENT') {
          } else {
            this.qrRecord = ''
          }
          this.qrImgUrl = server.THUMBNAIL_QR + this.info.code.batch.batchNo + '/' + this.qrCodeId + '.png'
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
    height: auto;
    margin-right: 1%;
  }
}
</style>
