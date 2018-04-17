<template>
  <div id="detail">
    <q-toolbar class='header'>
        <q-toolbar class='fix'>
             <a @click="back" class='back-a'><q-item-side left  icon='keyboard arrow left' class='back-left'/>返回</a>
            <q-toolbar-title class='header-title'>
              {{topTitle}}
            </q-toolbar-title>
            <a class="top-nav-right" @click="$router.push(routeUrl)">{{qrRecord}}</a>
       </q-toolbar>
    </q-toolbar>
    <div class='full-width card'>
      <div class="top-field">
        <p class='text-center'>
          <img v-bind:src="qrImgUrl" v-preview="qrImgUrl" preview-nav-enable="false" class="qr-img">
        </p>
        <p class='text-center'>
          <q-btn class="show-qr" @click="goToView">查看二维码</q-btn>
        </p>
      </div>
      <div class="qr-info">
        <div v-if="type==='EQUIPMENT' || type==='OTHER'">
          <p>名称：<span v-if="info.alias">{{info.alias}}</span></p>
          <p>所属项目：<span v-if="info.project">{{info.project.projectName}}</span></p>
          <p class="address"> <q-item-side left icon='place' class='inline newicon'></q-item-side><span  v-if="info.location">{{info.location.formattedAddress}}</span></p>
          <p class="address" v-if="info.description"> {{info.description}}</p>
          <p class="address pic-field" v-if=" info.pictures">
            <span v-for="item in info.pictures" v-bind:key="item.id">
              <img :src="picUrl+item.filePath" v-preview="previewApi+item.filePath"/>
            </span>
          </p>
        </div>
        <div v-if="type==='SINGLE'|| type==='AREA'">
        <p>二维码编号：<span v-if="info.code && info.code.identifier">{{info.code.identifier}}</span></p>
        <p>二维码类型：<span v-if="info.code && info.code.type">{{info.code.type.value}}</span></p>
        <p>所属项目：<span v-if="info.code && info.code.project">{{info.code.project.projectName}}</span></p>
        </div>
        <div v-if="type==='SINGLE'">
        <p>植物名称：<span v-if="info.code && info.code.alias">{{info.code.alias}}</span></p>
        <p>苗木分类：<span v-if="info.category">{{info.category.name}}</span></p>
        <p class="param"><span>胸径：{{info.xiongJing}}cm</span><span>高度：{{info.gaoDu}}cm</span><span>冠幅：{{info.guanFu}}cm</span></p>
        <p>苗木商名称：<span v-if="info.dealer">{{info.dealer}}</span></p>
        <p>苗木其它信息：<span>{{info.other}}</span></p>
        </div>
        <div v-if="type==='AREA'">
          <p>片区名称：<span v-if="info.code && info.code.alias">{{info.code.alias}}</span></p>
          <p>片区面积：<span>{{info.acreage}}</span></p>
          <p>植物:</p>
          <p v-if="singles && singles.alias">
          <q-chips-input v-model="singles.alias" hide-underline readonly chips-bg-color="lightGray" chips-color="black"/>
        </p>
        </div>
        <div v-if="type==='SINGLE'|| type==='AREA'">
          <p class="address"> <q-item-side left icon='place' class='inline newicon'></q-item-side><span  v-if="info.code && info.code.location">{{info.code.location.formattedAddress}}</span></p>
          <p class="address" v-if="info.code && info.code.description"> {{info.code.description}}</p>
          <p class="address pic-field" v-if="info.code && info.code.pictures">
            <span v-for="item in info.code.pictures" v-bind:key="item.id">
              <img :src="picUrl+item.filePath" v-preview="previewApi+item.filePath"/>
            </span>
          </p>
         </div>
          <q-btn class="full-width bg-color qr-btn show-qr" v-if="editable" @click='add()'>编辑基础信息</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../common'
import { server } from '../../const'
export default {
  data () {
    return {
      projectId: '',
      qrCodeId: '',
      routeUrl: '',
      type: '',
      editable: false,
      topTitle: '',
      qrImgUrl: '',
      info: {},
      qrRecord: '',
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
    back () {
      this.$router.goBack()
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
        if (response.data.resultCode === 'SUCCESS') {
          this.info = response.data.resultMsg
          if (this.type === 'SINGLE' || this.type === 'AREA') {
            this.topTitle = this.info.code.alias
            this.qrRecord = '养护记录'
            this.routeUrl = '/jobGroup/groupRecord?codeId=' + this.qrCodeId
            this.qrImgUrl = server.THUMBNAIL_QR + this.info.code.batch.batchNo + '/' + this.qrCodeId + '.png'
            let singles = response.data.resultMsg.singles
            this.singles.alias = []
            for (let key in singles) {
              this.singles.alias.push(singles[key]['alias'])
            }
          } else if (this.type === 'EQUIPMENT') {
            this.topTitle = this.info.alias
            this.qrRecord = '领用记录'
            this.routeUrl = '/jobGroup/record?codeId=' + this.qrCodeId
            this.qrImgUrl = server.THUMBNAIL_QR + this.info.batch.batchNo + '/' + this.qrCodeId + '.png'
          } else {
            this.qrRecord = ''
            this.topTitle = this.info.alias
            this.qrImgUrl = server.THUMBNAIL_QR + this.info.batch.batchNo + '/' + this.qrCodeId + '.png'
          }

          //  server.THUMBNAIL_API
          this.editable = response.data.resultMsg.editable
        } else {
          if (response.data.resultCode === 'ERROR') {
            this.$q.dialog({
              title: '提示',
              message: response.data.resultMsg.hint
            })
          } else {
            this.$q.dialog({
              title: '提示',
              message: response.data.resultMsg
            })
          }
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#detail {
  .top-field {
    margin-top: 20px;
  }
  .qr-img {
    width: 124px;
    height: 124px;
    padding: 2px;
    border: 1px solid #bbbbbb;
    margin-bottom: 10px;
  }
  .underline {
    border-bottom: 1px solid #cccccc;
    margin-top: 20px;
  }
  .top-field {
    p {
      margin-bottom: 3px;
    }
  }
  .param {
    span {
      display: inline-block;
      padding: 0px 4px;
    }
  }
  .qr-info {
    margin-top: 15px;
    margin-bottom: 30px;
    p {
      margin-bottom: 5px;
      font-size: 14px;
      color: #333333;
      line-height: 23px;
    }
  }
  .address {
    margin-top: 12px;
    margin-bottom: 12px;
  }
  .qr-btn {
    margin-bottom: 30px;
    padding: 10px 5px;
  }
  .pic-field img {
    width: 32%;
    height: auto;
    margin-right: 1%;
  }
}
</style>
