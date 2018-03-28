<template>
  <div>
    <q-toolbar class="header">
        <q-toolbar class="fix">
            <q-item-side left  icon="keyboard arrow left" @click="$router.go(-1)"/>
            <q-toolbar-title class="header-title">
            新建项目
            </q-toolbar-title>
       </q-toolbar>
    </q-toolbar>
    <div class="full-width card">
        <q-input text-dark required v-model="formData.projectName" placeholder="项目名称" class="login-input"/>
        <q-search icon="place" color="amber" v-model="formData.address" class="login-input"  hide-underline placeholder="输入地址/定位地址"/>
        <q-input type="textarea" v-model="formData.projectJobs" hide-underline class="login-input" placeholder="项目简介"/>
        <q-item link class="full-width underline"  @click.native="chooseUser('TM')">
            <q-item-side icon="group" />
            <q-item-main :label="formData.TMlable" />
            <q-item-side right icon="keyboard_arrow_right" />
        </q-item>
        <q-item link class="full-width underline"  @click.native="chooseUser('TL')">
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
        projectJobs: '',
        address: '',
        TMlable: '设置项目负责人',
        TLlable: '设置项目参与者',
        TLUserId: '',
        TMUserId: '',
        jobType: 'TM'
      },
      TLUserId: '',
      TMUserId: '',
      jobType: 'TM'
    }
  },
  methods: {
    add () {
      // eventBus.$on('event_name')
      let data = {
        projectName: this.projectName,
        projectDesc: this.projectDesc,
        projectJobs: [{ jobType: 'TL', userId: 79 }]
      }
      let params = new URLSearchParams()
      for (var key in data) {
        params.append(key, data[key])
      }
      request('project/create', 'post', params, 'json', true).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
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
      this.formData.jobType = jobType
      eventBus.$emit('event_name', 'some message')
      this.$router.push('allUser')
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
