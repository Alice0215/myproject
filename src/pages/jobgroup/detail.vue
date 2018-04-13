<template>
  <div id="detail">
    <q-toolbar class='header'>
        <q-toolbar class='fix'>
            <a @click="$router.goBack()" class='back-a'><q-item-side left  icon='keyboard arrow left' class="back-left"/>返回</a>
            <q-toolbar-title class='header-title'>
             操作详情
            </q-toolbar-title>
            <a class="no-info"></a>
       </q-toolbar>
    </q-toolbar>
    <div class='full-width card'>
      <div class="qr-info">
        <p>植物名称:<span v-if="info.code">{{info.code.alias}}</span></p>
        <p>二维码编号：<span v-if="info.code">{{info.code.identifier}}</span></p>
        <p>所属项目：<span v-if="info.project">{{info.project.projectName}}</span></p>
        <p>操作员：<span v-if="info.user">{{info.user.username}}</span> <q-item-side icon="account circle" right class="float-right"/></p>
        <p>时间：<span v-if="info.createTime">{{info.createTime}}</span></p>
        <p class="address underline"> <q-item-side left icon='place' class='inline newicon' v-if="info.location"></q-item-side>{{info.location}}</p>
        <p>苗木栽培：</p>
        <p v-if="info.jobs">
          <q-chips-input v-model="tags" hide-underline readonly chips-bg-color="lightGray" chips-color="black"/>
        </p>
        <p>备注信息：</p>
        <p>{{info.description}}</p>
        <p>现场照片：</p>
        <p class="pic-field" >
          <span v-for="item in info.pictures" v-bind:key="item.id">
            <img :src="picUrl+item.filePath" />
          </span>
        </p>
      </div>
      <q-btn v-if="info.editable" class="full-width btn" @click="$router.push('/project/maintenance?codeId=&jobGroupId=' + jobGroupId)">编辑</q-btn>
    </div>
  </div>
</template>

<script>
import { request } from '../../common'
import { server } from '../../const'
export default {
  data () {
    return {
      jobGroupId: '',
      info: '',
      picUrl: '',
      tags: []

    }
  },
  created () {
    this.jobGroupId = this.$route.query.jobGroupId
    this.picUrl = server.THUMBNAIL_API
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.$q.loading.show()
      request('jobGroup/detail?jobGroupId=' + this.jobGroupId, 'get', null, 'json', true).then(response => {
        this.$q.loading.hide()
        if (response.data.resultCode === 'SUCCESS') {
          this.info = response.data.resultMsg
          for (let key in this.info.jobs) {
            this.tags.push(this.info.jobs[key]['action']['name'])
          }
          this.tags.push()
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
    span {
      display: inline-block;
      padding: 0px 4px;
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
