<template>
  <div>
    <q-toolbar class="header">
        <q-toolbar class="fix" >
            <a @click="$router.goBack()" class="back-a"> <q-item-side left  icon="keyboard arrow left" class="back-left"/>
              返回
            </a>
            <q-toolbar-title class="header-title">
            新建项目
            </q-toolbar-title>
           <q-item-side right/>
       </q-toolbar>
    </q-toolbar>
    <div class="full-width card" id="project-add">
      <q-field
         @blur="$v.formData.projectName.$touch"
        @keyup.enter="add"
        :error="$v.formData.projectName.$error"
         error-label="请添加项目名称">
      <q-input text-dark required v-model="formData.projectName" placeholder="项目名称" class="login-input"/>
      </q-field>
      <q-field
         @blur="$v.formData.locationJson.$touch"
        @keyup.enter="add"
        :error="$v.formData.locationJson.$error"
         error-label="请获取当前位置">
      <q-search icon="place" color="amber" v-model="formData.address" @click="openMap"
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
        @keyup.enter="add"
        :error="$v.formData.TLSelect.$error"
         error-label="请项目设置负责人">
          <q-item link class="full-width underline users"  @click.native="chooseUser('TL')" >
              <q-item-side icon="group" />
              <q-item-main :label="`设置负责人`" /><span class="user"  v-for="TLitem in formData.TLlable" v-bind:key="TLitem.id">{{TLitem}}</span>
              <q-item-side right  icon="keyboard_arrow_right" />
          </q-item>
         </q-field>
          <q-btn class="full-width btn" @click="add()">创建项目</q-btn>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { request } from '../../common'
import eventBus from '../../eventBus'
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
        geoInfo: null
      },
      tempType: ''
    }
  },
  validations: {
    formData: {
      projectName: { required },
      locationJson: { required },
      TLSelect: { required }
    }
  },
  created () {
    if (localStorage.getItem('oldInfo') && localStorage.getItem('oldInfo') !== 'undefined') {
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
      for (var val of JSON.parse(this.$route.query.user)) {
        let obg = {
          'jobType': '',
          'userId': ''
        }
        let userInfo = { 'fullname': val.fullname, 'userId': val.userId }
        obg.userId = val.userId
        if (this.$route.query.type === 'TM') {
          obg.jobType = 'TM'
          if (this.formData.TMobg.indexOf(obg) === -1) {
            if (this.formData.TMobg.length < 3) {
              this.formData.TMlable.push(val.fullname)
            }
            this.formData.TMSelect.push(userInfo)
            this.formData.TMobg.push(obg)
          }
        } else {
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
    }
    if (localStorage.getItem('user_location') !== '') {
      this.formData.geoInfo = JSON.parse(localStorage.getItem('user_location'))
      if (this.formData.geoInfo !== null) {
        this.formData.address = this.formData.geoInfo.formattedAddress
        this.formData.locationJson = this.formData.geoInfo
      }
      localStorage.removeItem('user_location')
    }
  },
  methods: {
    add () {
      this.$v.formData.$touch()
      if (this.$v.formData.$error) {
        return false
      }
      let projectJobs = []
      let locationJson = ''
      if (this.formData.locationJson !== '') {
        locationJson = JSON.stringify(this.formData.locationJson)
      }
      projectJobs = this.formData.TMobg.concat(this.formData.TLobg)
      let data = {
        'projectDesc': this.formData.projectDesc,
        'projectName': this.formData.projectName,
        'locationJson': locationJson,
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
      eventBus.$emit('oldInfo', JSON.stringify(this.formData))
      localStorage.setItem('oldInfo', JSON.stringify(this.formData))
      eventBus.$emit('type', jobType)
      if (jobType === 'TM') {
        localStorage.setItem('selectedUser', JSON.stringify(this.formData.TMSelect))
      } else {
        localStorage.setItem('selectedUser', JSON.stringify(this.formData.TLSelect))
      }
      this.$router.push('allUser?type=' + jobType)
    },
    openMap () {
      localStorage.setItem('oldInfo', JSON.stringify(this.formData))
      eventBus.$emit('oldInfo', JSON.stringify(this.formData))
      this.$router.push('map')
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#project-add {
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
