<template>
  <div>
    <q-toolbar class="header">
        <q-toolbar class="fix" >
            <a @click="$router.go(-1)"> <q-item-side left  icon="keyboard arrow left"/></a>
            <q-toolbar-title class="header-title">
            新建项目
            </q-toolbar-title>
       </q-toolbar>
    </q-toolbar>
    <div class="full-width card">
        <q-input text-dark required v-model="formData.projectName" placeholder="项目名称" class="login-input"/>
        <q-search icon="place" color="amber" v-model="formData.locationJson" @click="openMap"
                  class="login-input" disable hide-underline placeholder="输入地址/定位地址"/>
        <q-input type="textarea" v-model="formData.projectDesc" hide-underline class="login-input" placeholder="项目简介"/>
        <q-item link class="full-width underline users"  @click.native="chooseUser('TM')">
            <q-item-side icon="group" />
            <q-item-main :label="formData.TMlable" />
            <q-item-side right icon="keyboard_arrow_right" />
        </q-item>
        <q-item link class="full-width underline users"  @click.native="chooseUser('TL')">
            <q-item-side icon="group" />
            <q-item-main :label="formData.TLlable" />
            <q-item-side right  icon="keyboard_arrow_right" />
        </q-item>
    </div>
    <q-btn class="full-width btn" @click="add()">创建项目</q-btn>
  </div>
</template>

<script>
import { request } from '../../common'
import eventBus from '../../eventBus'
export default {
  data () {
    return {
      formData: {
        projectName: '',
        projectDesc: '',
        locationJson: '',
        TMlable: '设置负责人',
        TLlable: '设置参与者',
        TMobg: { 'jobType': 'TM', 'userId': '' },
        TLobg: { 'jobType': 'TL', 'userId': '' },
        geoInfo: null
      }
    }
  },
  created () {
    if (this.$route.query.type) {
      console.log('1111')
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
    localStorage.removeItem('oldInfo')
    eventBus.$once('user_location', geo => {
      this.formData.geoInfo = JSON.parse(geo)
      this.formData.address = this.formData.geoInfo.formattedAddress
      console.log(this.formData.address)
    })
  },
  methods: {
    add () {
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
      console.log(projectJobs)
      let data = {
        'projectDesc': this.formData.projectDesc,
        'projectName': this.formData.projectName,
        'locationJson': '',
        'projectJobs': projectJobs
      }
      request('project/create', 'post', data, 'json', true).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          if (localStorage.getItem('oldInfo')) {
            localStorage.removeItem('oldInfo')
          }
          this.$q.dialog({
            title: '提示',
            message: '项目添加成功！'
          })
          this.$router.push('/')
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
    },
    chooseUser (jobType) {
      localStorage.setItem('oldInfo', JSON.stringify(this.formData))
      this.$router.push('allUser?type=' + jobType)
    },
    openMap () {
      this.$router.push('map')
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
.users {
  font-size: 14px;
  .user {
    padding: 3px;
    text-align: center;
    display: inline-block;
    background-color: #dcdcdc;
    border-radius: 2px;
    margin-left: 3px;
  }
}

.underline {
  border-bottom: 1px solid #cccccc;
  margin-top: 20px;
}
.card {
  margin-bottom: 0px;
  padding: 30px 15px;
  min-height: 160px;
}
.btn {
  background-color: #1aad19;
  color: white;
  margin-top: 30px;
  margin-bottom: 20px;
}
input:not(.no-style):hover {
  border-bottom: none;
}
.q-if-inner {
  min-height: 30px !important;
  padding-bottom: 10px;
}
.q-if-control.q-icon {
  padding-bottom: 6px;
}
</style>
