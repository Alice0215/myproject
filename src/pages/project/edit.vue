<template>

  <div>
    <q-toolbar class="header">
        <q-toolbar class="fix">
             <a @click="$router.go(-1)"><q-item-side left  icon="keyboard arrow left"/></a>
            <q-toolbar-title class="header-title">
            项目设置
            </q-toolbar-title>
       </q-toolbar>
    </q-toolbar>
    <div class="full-width card" >
        <input text-dark required v-model="formData.projectName" class="full-width login-input">
        <q-search icon="place" color="amber" v-model="formData.locationJson" class="login-input" placeholder="输入地址/定位地址"/>
        <q-input type="textarea" v-model="formData.projectDesc" class="login-input" placeholder="项目简介"/>
        <q-item link class="full-width underline users"  @click.native="chooseUser('TM')">
            <q-item-side icon="group" />
            <q-item-main :label="formData.TMlable" />
            <q-item-side right icon="keyboard_arrow_right" />
        </q-item>
        <q-item link class="full-width underline users" @click.native="chooseUser('TL')">
            <q-item-side icon="group" />
            <q-item-main :label="formData.TLlable" /><span class="user">1122</span><span class="user">1122</span>
            <q-item-side right  icon="keyboard_arrow_right" />
        </q-item>
    </div>
    <q-btn class="full-width btn" @click="edit()">保存修改</q-btn>
  </div>
</template>

<script>
import { request } from '../../common'
export default {
  data () {
    return {
      projectId: '',
      formData: {
        projectName: '',
        projectDesc: '',
        locationJson: '',
        TMlable: '项目负责人',
        TLlable: '项目参与者',
        TMobg: { 'jobType': 'TM', 'userId': '' },
        TLobg: { 'jobType': 'TL', 'userId': '' }
      }
    }
  },
  created () {
    this.projectId = this.$route.query.id
    this.getInfo()
    if (this.$route.query.type) {
      if (localStorage.getItem('oldInfo') && localStorage.getItem('oldInfo') !== '') {
        let oldInfo = JSON.parse(localStorage.getItem('oldInfo'))
        this.formData = oldInfo
      }
      if (this.$route.query.type === 'TM') {
        this.formData.TMlable = this.$route.query.fullname
        this.formData.TMobg.userId = this.$route.query.userId
      } else {
        this.formData.TLlable = this.$route.query.fullname
        this.formData.TLobg.userId = this.$route.query.userId
      }
    }
    if (localStorage.getItem('oldInfo')) {
      localStorage.removeItem('oldInfo')
    }
  },
  methods: {
    getInfo () {
      request(
        'project/detail?projectId=' + this.projectId,
        'get',
        '',
        'json',
        true
      ).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          console.log(response.data.resultMsg)
          this.formData.projectName = response.data.resultMsg.projectName
          this.formData.projectDesc = response.data.resultMsg.projectDesc
          this.formData.locationJson = response.data.resultMsg.locationJson
        } else {
          this.$q.dialog({
            title: '提示',
            message: response.data.resultMsg
          })
        }
      })
    },
    edit () {
      let projectJobs = []
      if (this.formData.TMobg.userId !== '' && this.formData.TLobg.userId !== '') {
        projectJobs = [this.formData.TMobg, this.formData.TLobg]
      } else {
        if (this.formData.TMobg.userId !== '') {
          projectJobs = [this.formData.TMobg]
        }
        if (this.formData.TLobg.userId !== '') {
          projectJobs = [this.formData.TLobg]
        }
      }
      let data = {
        'projectId': this.projectId,
        'projectName': this.projectName,
        'projectDesc': this.projectDesc,
        'locationJson': '',
        'projectJobs': projectJobs
      }
      let params = new URLSearchParams()
      for (var key in data) {
        params.append(key, data[key])
      }
      request('project/edit', 'put', data, 'json', true)
        .then(response => {
          if (response.data.resultCode === 'SUCCESS') {
            this.$q.dialog({
              title: '提示',
              message: '项目修改成功！'
            })
            this.$router.go(-1)
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
        .catch(e => {
          console.log('Error', e.response.data.message)
        })
    },
    chooseUser (jobType, userId) {
      localStorage.setItem('oldInfo', JSON.stringify(this.formData))
      this.$router.push('allUser?type=' + jobType + '&userId=' + userId + '&projectId=' + this.projectId)
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
.underline {
  border-bottom: 1px solid #cccccc;
  margin-top: 20px;
}
.card {
  margin-bottom: 0px;
  padding: 5px 15px;
  min-height: 160px;
}
input:not(.no-style):hover {
  border-bottom: none;
}
.users{
  font-size: 14px;
  .user{
    padding: 3px;
    text-align: center;
    display: inline-block;
    background-color: #DCDCDC;
    border-radius: 2px;
    margin-left: 3px;
  }
}
.q-if-inner {
  min-height: 30px !important;
  padding-bottom: 10px;
}
.q-if-control.q-icon {
  padding-bottom: 6px;
}
</style>
