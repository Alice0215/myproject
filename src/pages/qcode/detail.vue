<template>
  <div>
    <q-toolbar class='header'>
        <q-toolbar class='fix'>
             <a @click="$router.go(-1)"><q-item-side left  icon='keyboard arrow left' class='reback'/>返回</a>
            <q-toolbar-title class='header-title'>
              {{code.alias}}
            </q-toolbar-title>
            <a class="top-nav-right">历史记录</a>
       </q-toolbar>
    </q-toolbar>
    <div class='full-width card'>
      <div class="top-field">
        <p class='text-center'>
          <img src='statics/qr.png'/>
        </p>
        <p class='text-center'>
          <q-btn class="show-qr">查看二维码</q-btn>
        </p>
      </div>
      <div class="qr-info">
        <p>二维码编号：<span v-if="code.identifier">{{code.identifier}}</span></p>
        <p>二维码类型：<span v-if="code.type">{{code.type.value}}</span></p>
        <p>所属项目：<span v-if="code.project">{{code.project.projectName}}</span></p>
        <p>苗木名称：<span v-if="code.alias">{{code.alias}}</span></p>
        <p>苗木分类：<span v-if="code.alias">{{code.alias}}</span></p>
        <p class="param"><span>胸径：{{code.xiongJing}}cm</span><span>高度：{{code.gaoDu}}cm</span><span>冠幅：14cm</span></p>
        <p>苗木商名称：<span v-if="code.dealer">{{code.dealer}}</span></p>
        <p>苗木其它信息：</p>
        <p class="address"> <q-item-side left icon='place' class='inline newicon' v-if="code.location"></q-item-side>{{code.location}}</p>
        <p>{{code.description}}</p>
        <p class="pic-field" >
          <span v-for="item in code.pictures" v-bind:key="item.id">
            <img :src="item.filePath"/>
          </span>
        </p>
      </div>
      <q-btn class="full-width bg-color qr-btn show-qr" @click='add()'>编辑基础信息</q-btn>
    </div>
  </div>
</template>

<script>
import { request } from '../../common'
export default {
  data () {
    return {
      qrCodeId: 1,
      code: {},
      other: '',
      editable: false
    }
  },
  created () {
    this.qrCodeId = this.$route.query.id
    this.getInfo()
  },
  methods: {
    add () {
      if (!this.editable) {
        this.$q.dialog({
          title: '提示',
          message: '您没有编辑权限'
        })
        return
      }
      this.$router.push('/qcode/edit?id=' + this.qrCodeId + '&typeKey=' + this.code.type.key)
    },
    getInfo () {
      request(
        'qrcode/detail?qrCodeId=' + this.qrCodeId,
        'get',
        '',
        'json',
        true
      ).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          this.code = response.data.resultMsg.code
          this.other = response.data.resultMsg.other
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
.reback {
  min-width: auto !important;
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
.param{
  span{
    display: inline-block;
    padding: 0px 4px;
  }
}
.card {
  padding: 0px 15px;
}
.qr-info {
  margin-top: 15px;
  margin-bottom: 30px;
  p {
    margin-bottom: 5px;
    font-size: 14px;
    color: #333333;
  }
}
.address{
  margin-top: 12px;
  margin-bottom: 12px;
}
.qr-btn{
  margin-bottom: 30px;
  padding: 10px 5px;
}
.pic-field img{
  width: 32%;
  height: auto;
  margin-right: 1%;
}
</style>
