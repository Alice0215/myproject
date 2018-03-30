<template>
  <div>
    <q-toolbar class="header">
        <q-toolbar class="fix" >
            <a @click="$router.push('/qcode/list?projectId='+formData.projectId)"> <q-item-side left  icon="keyboard arrow left"/></a>
            <q-toolbar-title class="header-title">
            项目设置
            </q-toolbar-title>
           <q-item-side right/>
       </q-toolbar>
    </q-toolbar>
    <div class="full-width card">
        <q-input text-dark required v-model="formData.projectName" placeholder="项目名称" class="login-input"/>
        <q-search icon="place" color="amber" v-model="formData.address" @click="openMap"
                  class="login-input" disable  placeholder="输入地址/定位地址"/>
        <q-input type="textarea" v-model="formData.projectDesc" class="login-input" placeholder="项目简介"/>
          <q-item link class="full-width underline users" @click.native="chooseUser('TM')">
              <q-item-side icon="group" />
              <q-item-main :label="`设置负责人`" /><span class="user" v-for="TMitem in formData.TMlable" v-bind:key="TMitem.id" >{{TMitem}}</span>
              <q-item-side right icon="keyboard_arrow_right" />
          </q-item>
            <q-item link class="full-width underline users"  @click.native="chooseUser('TL')" >
                <q-item-side icon="group" />
                <q-item-main :label="`设置参与者`" /><span class="user"  v-for="TLitem in formData.TLlable" v-bind:key="TLitem.id">{{TLitem}}</span>
                <q-item-side right  icon="keyboard_arrow_right" />
            </q-item>
    </div>
    <q-btn class="full-width btn" @click="edit()">保存更改</q-btn>
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
        address: '',
        locationJson: { 'addressComponent': '' },
        TMlable: [],
        TLlable: [],
        TMSelect: [],
        TLSelect: [],
        TMobg: [],
        TLobg: [],
        geoInfo: null,
        projectId: ''
      },
      tempType: ''
    }
  },
  created () {
    this.formData.projectId = this.$route.query.id
    this.getInfo()
    if (localStorage.getItem('oldInfo') && localStorage.getItem('oldInfo') !== '') {
      let oldInfo = JSON.parse(localStorage.getItem('oldInfo'))
      this.formData = oldInfo
      localStorage.removeItem('oldInfo')
    }
    if (this.$route.query.user) {
      if (this.$route.query.type === 'TM') {
        this.formData.TMobg = []
        this.formData.TMlable = []
        this.formData.TMSelect = []
      } else {
        this.formData.TLobg = []
        this.formData.TLlable = []
        this.formData.TLSelect = []
      }
      for (var val of this.$route.query.user) {
        let obg = {
          'jobType': '',
          'userId': ''
        }
        obg.userId = val.userId
        if (this.$route.query.type === 'TM') {
          obg.jobType = 'TM'
          if (this.formData.TMobg.indexOf(obg) === -1) {
            if (this.formData.TMobg.length < 3) {
              this.formData.TMlable.push(val.fullname)
            }
            this.formData.TMSelect.push(val.userId)
            this.formData.TMobg.push(obg)
          }
        } else {
          obg.jobType = 'TL'
          if (this.formData.TLobg.indexOf(obg) === -1) {
            if (this.formData.TLobg.length < 3) {
              this.formData.TLlable.push(val.fullname)
            }
            this.formData.TLSelect.push(val.userId)
            this.formData.TLobg.push(obg)
          }
        }
      }
    }
    eventBus.$once('user_location', geo => {
      this.formData.geoInfo = JSON.parse(geo)
      this.formData.address = this.formData.geoInfo.formattedAddress
      this.formData.locationJson.addressComponent = this.formData.geoInfo.addressComponent

      console.log(this.formData.address)
    })
    if (localStorage.getItem('user_location') && localStorage.getItem('user_location') !== '') {
      this.formData.geoInfo = JSON.parse(localStorage.getItem('user_location'))
      console.log(this.formData.geoInfo)
      if (this.formData.geoInfo !== null) {
        this.formData.address = this.formData.geoInfo.formattedAddress
        this.formData.locationJson = { 'addressComponent': this.formData.geoInfo.addressComponent }
      }
      localStorage.removeItem('user_location')
    }
  },
  methods: {
    edit () {
      let projectJobs = []
      projectJobs = this.formData.TMobg.concat(this.formData.TLobg)
      let data = {
        'projectId': this.formData.projectId,
        'projectDesc': this.formData.projectDesc,
        'projectName': this.formData.projectName,
        'locationJson': this.formData.locationJson,
        'projectJobs': projectJobs
      }
      let params = new URLSearchParams()
      for (var key in data) {
        params.append(key, data[key])
      }
      request('project/edit', 'put', data, 'json', true)
        .then(response => {
          if (response.data.resultCode === 'SUCCESS') {
            if (localStorage.getItem('oldInfo')) {
              localStorage.removeItem('oldInfo')
            }
            this.$q.dialog({
              title: '提示',
              message: '项目修改成功！'
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
    getInfo () {
      request(
        'project/detail?projectId=' + this.formData.projectId,
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
          if (response.data.resultMsg.projectJobList.length > 0) {
            for (var val of response.data.resultMsg.projectJobList) {
              let obg = {
                'jobType': '',
                'userId': ''
              }
              if (val.jobType === 'TL') {
                this.formData.TLlable.push(val.user.fullname)
                this.formData.TLSelect.push(val.user.id)
                obg.jobType = 'TL'
                this.formData.TLobg.push(obg)
              }
              if (val.jobType === 'TM') {
                this.formData.TMlable.push(val.user.fullname)
                this.formData.TMSelect.push(val.user.id)
                obg.jobType = 'TM'
                this.formData.TMobg.push(obg)
              }
            }
          }
        } else {
          this.$q.dialog({
            title: '提示',
            message: response.data.resultMsg
          })
        }
      })
    },
    chooseUser (jobType) {
      eventBus.$emit('oldInfo', JSON.stringify(this.formData))
      localStorage.setItem('oldInfo', JSON.stringify(this.formData))
      eventBus.$emit('type', jobType)
      if (jobType === 'TM') {
        localStorage.setItem('selectedUser', JSON.stringify(this.formData.TMSelect))
      } else {
        localStorage.setItem('selectedUser', JSON.stringify(this.formData.TLSelect))
      }
      this.$router.push('allUser?type=' + jobType + '&projectId=' + this.formData.projectId)
    },
    openMap () {
      localStorage.setItem('oldInfo', JSON.stringify(this.formData))
      eventBus.$emit('oldInfo', JSON.stringify(this.formData))
      this.$router.push('map?projectId=' + this.formData.projectId)
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
