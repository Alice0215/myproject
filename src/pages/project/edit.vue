<template>
  <div>
    <q-toolbar class="header">
        <q-toolbar class="fix" >
            <a class="back-a" @click="$router.push('/qcode/list?projectId='+formData.projectId)"> <q-item-side left  icon="keyboard arrow left" class="back-left"/>返回</a>
            <q-toolbar-title class="header-title">
            项目设置
            </q-toolbar-title>
           <q-item-side right/>
       </q-toolbar>
    </q-toolbar>
    <div class="full-width card" id="edit">
      <q-field
         @blur="$v.formData.projectName.$touch"
        @keyup.enter="edit"
        :error="$v.formData.projectName.$error"
         error-label="请添加项目名称">
        <q-input text-dark required v-model="formData.projectName" placeholder="项目名称" class="login-input"/>
      </q-field>
       <q-field
         @blur="$v.formData.address.$touch"
        @keyup.enter="edit"
        :error="$v.formData.address.$error"
         error-label="请获取当前位置">
        <q-input icon="place" color="amber" v-model="formData.address" @click="openMap"
                  class="login-input" disable  placeholder="输入地址/定位地址"/>
       </q-field>
        <q-input type="textarea" v-model="formData.projectDesc" class="login-input" placeholder="项目简介"/>
          <q-item link class="full-width underline users" @click.native="chooseUser('TM')">
              <q-item-side icon="group" />
              <q-item-main :label="`设置参与者`" /><span class="user" v-for="TMitem in formData.TMlable" v-bind:key="TMitem.id" >{{TMitem}}</span>
              <q-item-side right icon="keyboard_arrow_right" />
          </q-item>
           <q-field
         @blur="$v.formData.TLSelect.$touch"
        @keyup.enter="edit"
        :error="$v.formData.TLSelect.$error"
         error-label="请项目设置负责人">
          <q-item link class="full-width underline users"  @click.native="chooseUser('TL')" >
              <q-item-side icon="group" />
              <q-item-main :label="`设置负责人`" /><span class="user"  v-for="TLitem in formData.TLlable" v-bind:key="TLitem.id">{{TLitem}}</span>
              <q-item-side right  icon="keyboard_arrow_right" />
          </q-item>
           </q-field>
    </div>
    <q-btn class="full-width btn"  v-if="formData.isEdit" @click="edit()">保存更改</q-btn>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { request } from '../../common'
export default {
  data () {
    return {
      formData: {
        projectName: '',
        projectDesc: '',
        address: '',
        locationJson: '',
        TMlable: [],
        TLlable: [],
        TMSelect: [],
        TLSelect: [],
        TMobg: [],
        TLobg: [],
        geoInfo: null,
        projectId: '',
        isEdit: false
      },
      tempType: ''
    }
  },
  validations: {
    formData: {
      projectName: { required },
      address: { required },
      TLSelect: { required }
    }
  },
  created () {
    this.formData.projectId = this.$route.query.id
    let oldInfo = JSON.parse(localStorage.getItem('oldInfo'))
    if (!_.isNull(oldInfo)) {
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
      for (var val of JSON.parse(this.$route.query.user)) {
        let obg = {
          'jobType': '',
          'userId': ''
        }
        obg.userId = val.userId
        if (this.$route.query.type === 'TM') {
          let userInfo = { 'fullname': val.fullname, 'userId': val.userId }
          obg.jobType = 'TM'
          if (this.formData.TMobg.indexOf(obg) === -1) {
            if (this.formData.TMobg.length < 3) {
              this.formData.TMlable.push(val.fullname)
            }
            this.formData.TMSelect.push(userInfo)
            this.formData.TMobg.push(obg)
          }
        } else {
          let userInfo = { 'fullname': val.fullname, 'userId': val.userId }
          obg.jobType = 'TL'
          if (this.formData.TLobg.indexOf(obg) === -1) {
            if (this.formData.TLobg.length < 3) {
              this.formData.TLlable.push(val.fullname)
            }
            this.formData.TLSelect.push(userInfo)
            this.formData.TLobg.push(obg)
          }
        }
      }
    } else if (localStorage.getItem('user_location') !== null) {
      this.formData.geoInfo = JSON.parse(localStorage.getItem('user_location'))
      if (this.formData.geoInfo !== null && this.formData.geoInfo.formattedAddress) {
        this.formData.address = this.formData.geoInfo.formattedAddress
        this.formData.locationJson = JSON.stringify(this.formData.geoInfo)
      }
      localStorage.removeItem('user_location')
    } else if (_.isNull(oldInfo)) {
      this.getInfo()
    }
  },
  methods: {
    edit () {
      this.$v.formData.$touch()
      if (this.$v.formData.$error) {
        return false
      }
      let projectJobs = []
      projectJobs = this.formData.TMobg.concat(this.formData.TLobg)
      let data = {
        'projectId': this.formData.projectId,
        'projectDesc': this.formData.projectDesc,
        'projectName': this.formData.projectName,
        'projectJobs': projectJobs
      }
      if (this.formData.locationJson !== '') {
        data.locationJson = this.formData.locationJson
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
      let that = this
      request(
        'project/detail?projectId=' + this.formData.projectId, 'get', '', 'json', true).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          this.formData.projectName = response.data.resultMsg.projectName
          this.formData.projectDesc = response.data.resultMsg.projectDesc
          if (response.data.resultMsg.location) {
            this.formData.address = response.data.resultMsg.location.formattedAddress
          }
          if (response.data.resultMsg.projectJobList.length > 0) {
            let userId = JSON.parse(localStorage.getItem('user')).userId
            for (var val of response.data.resultMsg.projectJobList) {
              let obg = {
                'jobType': '',
                'userId': ''
              }

              obg.userId = val.user.id
              if (val.jobType.key === 'TL') {
                obg.jobType = 'TL'
                if (this.formData.TLobg.indexOf(obg) === -1) {
                  if (this.formData.TLlable.length < 3) {
                    this.formData.TLlable.push(val.user.fullname)
                  }
                  let userInfo = { 'fullname': val.user.fullname, 'userId': val.user.id }
                  this.formData.TLSelect.push(userInfo)
                  if (parseInt(val.user.id) === parseInt(userId)) {
                    that.formData.isEdit = true
                  }
                  this.formData.TLobg.push(obg)
                }
              }
              if (val.jobType.key === 'TM') {
                obg.jobType = 'TM'
                if (this.formData.TMobg.indexOf(obg) === -1) {
                  if (this.formData.TMlable.length < 3) {
                    this.formData.TMlable.push(val.user.fullname)
                  }
                  let userInfo = { 'fullname': val.user.fullname, 'userId': val.user.id }
                  this.formData.TMSelect.push(userInfo)
                  this.formData.TMobg.push(obg)
                }
              }
            }
          }
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
      if (jobType === 'TM') {
        localStorage.setItem('selectedUser', JSON.stringify(this.formData.TMSelect))
      } else {
        localStorage.setItem('selectedUser', JSON.stringify(this.formData.TLSelect))
      }
      this.$router.push('allUser?type=' + jobType + '&projectId=' + this.formData.projectId)
    },
    openMap () {
      localStorage.setItem('oldInfo', JSON.stringify(this.formData))
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
#edit {
  .underline {
    border-bottom: 1px solid #cccccc;
    margin-top: 20px;
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
}
</style>
