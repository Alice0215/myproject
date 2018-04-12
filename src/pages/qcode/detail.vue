<template>
  <div id="detail">
    <q-toolbar class='header'>
        <q-toolbar class='fix'>
             <a @click="back" class='back-a'><q-item-side left  icon='keyboard arrow left' class='back-left'/>返回</a>
            <q-toolbar-title class='header-title'>
              {{code.alias}}
            </q-toolbar-title>
            <a class="top-nav-right" @click="$router.push(routeUrl)">{{qrRecord}}</a>
       </q-toolbar>
    </q-toolbar>
    <div class='full-width card'>
      <div class="top-field">
        <p class='text-center'>
          <img v-bind:src="qrImgUrl" class="qr-img">
        </p>
        <p class='text-center'>
          <q-btn class="show-qr">查看二维码</q-btn>
        </p>
      </div>
      <div class="qr-info">
        <p>二维码编号：<span v-if="code.identifier">{{code.identifier}}</span></p>
        <p>二维码类型：<span v-if="code.type">{{code.type.value}}</span></p>
        <p>所属项目：<span v-if="code.project">{{code.project.projectName}}</span></p>
        <p>苗木名称：<span v-if="info.alias">{{info.alias}}</span></p>
        <p>苗木分类：<span v-if="info.category">{{info.category.name}}</span></p>
        <p class="param"><span>胸径：{{info.xiongJing}}cm</span><span>高度：{{info.gaoDu}}cm</span><span>冠幅：{{info.guanFu}}cm</span></p>
        <p>苗木商名称：<span v-if="info.dealer">{{info.dealer}}</span></p>
        <p>苗木其它信息：</p>
        <p class="address"> <q-item-side left icon='place' class='inline newicon' v-if="info.location"></q-item-side>{{info.location}}</p>
        <p>{{code.description}}</p>
        <p class="pic-field" >
          <span v-for="item in code.pictures" v-bind:key="item.id">
            <img :src="picUrl+item.filePath"/>
          </span>
        </p>
      </div>
      <q-btn class="full-width bg-color qr-btn show-qr" v-if="editable" @click='add()'>编辑基础信息</q-btn>
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
      code: {},
      routeUrl: '',
      type: '',
      danzhu: true,
      pianqu: false,
      gongju: false,
      qita: false,
      editable: false,
      topTitle: '',
      qrImgUrl: '',
      info: '',
      qrRecord: '',
      picUrl: ''

    }
  },
  created () {
    this.qrCodeId = this.$route.query.id
    this.type = this.$route.query.type
    this.projectId = this.$route.query.projectId
    this.picUrl = server.THUMBNAIL_API
    this.getInfo()
  },
  methods: {
    back () {
      localStorage.removeItem('qrCodeId')
      localStorage.removeItem('typeKey')
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
      let key = null
      if (this.code.type) {
        key = this.code.type.key
      }
      localStorage.setItem('qrCodeId', this.qrCodeId)
      localStorage.setItem('typeKey', key)
      this.$router.push('/qcode/edit?id=' + this.qrCodeId + '&typeKey=' + key)
    },
    getInfo () {
      this.$q.loading.show()
      request('qrcode/detail?qrCodeId=' + this.qrCodeId, 'get', null, 'json', true).then(response => {
        this.$q.loading.hide()
        if (response.data.resultCode === 'SUCCESS') {
          this.info = response.data.resultMsg
          if (response.data.resultMsg.code) {
            this.code = response.data.resultMsg.code
          } else {
            this.code = response.data.resultMsg
          }
          if (this.code.type.key === 'SINGLE' || this.code.type.key === 'AREA') {
            this.qrRecord = '养护记录'
            this.routeUrl = '/jobGroup/groupRecord?codeId=' + this.qrCodeId
          } else if (this.code.type.key === 'EQUIPMENT') {
            this.qrRecord = '领用记录'
            this.routeUrl = '/jobGroup/record?codeId=' + this.qrCodeId
          } else {
            this.qrRecord = ''
          }
          this.qrImgUrl = server.THUMBNAIL_QR + this.code.batch.batchNo + '/' + this.qrCodeId + '.png'
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
  .top-field{
    margin-top: 20px;
  }
  .reback {
    min-width: auto !important;
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
