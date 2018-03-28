<template>

  <div>
    <q-toolbar class="header">
        <q-toolbar class="fix">
            <q-item-side left  icon="keyboard arrow left" @click="$router.go(-1)"/>
            <q-toolbar-title class="header-title">
            项目设置
            </q-toolbar-title>
       </q-toolbar>
    </q-toolbar>
    <div class="full-width card" >
        <input text-dark required v-model="projectName" class="full-width login-input">
        <q-search icon="place" color="amber" v-model="address" class="login-input"  hide-underline placeholder="输入地址/定位地址"/>
        <q-input type="textarea" v-model="projectDesc" hide-underline class="login-input" placeholder="项目简介"/>
        <q-item link class="full-width underline"  @click.native="$router.push('/project/alluser?type=1')">
            <q-item-side icon="group" />
            <q-item-main :label="`设置项目负责人`" />
            <q-item-side right icon="keyboard_arrow_right" />
        </q-item>
        <q-item link class="full-width underline"  @click.native="$router.push('/project/alluser?type=2')">
            <q-item-side icon="group" />
            <q-item-main :label="`设置项目参与者`" />
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
      projectName: '',
      projectDesc: '',
      address: '',
      TMlable: '设置项目负责人',
      TLlable: '设置项目参与者'
    }
  },
  mounted () {
    this.getInfo()
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
          this.projectName = response.data.resultMsg.projectName
          this.projectDesc = response.data.resultMsg.projectDesc
          console.log(this.info)
        } else {
          console.log(response.data.resultMsg)
          this.$q.dialog({
            title: '提示',
            message: response.data.resultMsg
          })
        }
      })
    },
    edit () {
      let data = {
        projectName: this.projectName,
        projectDesc: this.projectDesc,
        projectJobs: [{ jobType: 'TL', userId: 79 }]
      }
      let params = new URLSearchParams()
      for (var key in data) {
        params.append(key, data[key])
      }
      request('project/edit', 'put', params, 'json', true)
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
            this.$router.push('/login')
          }
        })
        .catch(e => {
          console.log('Error', e.response.data.message)
        })
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
