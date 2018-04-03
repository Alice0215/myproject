<template>

  <div class="main">
    <q-toolbar class="header">
    <q-toolbar class="fix">
        <a @click="$router.go(-1)" class="top-nav-left">关闭</a>
        <q-toolbar-title class="header-title">
        成员列表
        </q-toolbar-title>
        <q-item-side right/>
    </q-toolbar>
    </q-toolbar>
    <div class="full-width">
        <q-item  v-ripple.mat class="full-width user-item-header">
          <q-item-main :label="` 项目负责人`" />
          <!--<q-btn class='show-qr' right @click="chooseUser('TL')">{{Tltitle}}</q-btn>-->
      </q-item>
      <div  v-for="user in TLusers"
        :key="user.userId">
        <q-item  v-ripple.mat class="full-width underline user-item">
          <q-item-side icon="account circle" class="user"/>
          <q-item-main :label="user.fullname" />
      </q-item>
      </div>
      <q-item  v-ripple.mat class="full-width user-item-header">
          <q-item-main :label="` 项目参与者`" />
          <!--<q-btn class='show-qr' right @click="chooseUser('TM')">{{TMtitle}}</q-btn>-->
      </q-item>
      <div  v-for="user in TMusers">
        <q-item  v-ripple.mat class="full-width underline user-item">
          <q-item-side icon="account circle" class="user"/>
          <q-item-main :label="user.fullname" />
      </q-item>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../common'
export default {
  data () {
    return {
      TLusers: [],
      TMusers: [],
      isShow: false,
      type: '',
      selectIdArr: '',
      projectId: '',
      Tltitle: '添加',
      TMtitle: '添加'
    }
  },
  mounted () {
    this.projectId = this.$route.query.id
    this.getUsers()
    if (this.$route.query.user) {
      if (this.$route.query.type === 'TM') {
        this.TMtitle = '保存'
      } else {
        this.TLtitle = '保存'
      }
    }
  },
  methods: {
    async getUsers () {
      request('project/' + this.projectId + '/members', 'get',
        '',
        'json',
        true).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          this.TLusers = response.data.resultMsg.TL
          this.TMusers = response.data.resultMsg.TM
        } else {
          console.log(response.data.resultMsg)
        }
      })
    },
    chooseUser (jobType) {
      localStorage.setItem('oldInfo', JSON.stringify(this.formData))
      if (jobType === 'TM') {
        localStorage.setItem('selectedUser', JSON.stringify(this.TMusers))
      } else {
        localStorage.setItem('selectedUser', JSON.stringify(this.TLusers))
      }
      this.$router.push("allUser?option='add'&projectId=" + this.projectId + '&type=' + jobType)
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
.user-item-header {
  background-color: #f7f7f7;
  color: #666666;
  font-size: 13px;
}
.user-item:hover {
  background: none;
}
.search-field {
  background: #cccccc;
  height: 50px;
}
.search-field .btn {
  background-color: white;
  text-align: center;
  width: 96%;
  margin-left: 2%;
}
.header {
  margin-bottom: 0px;
}
.fix {
  border-bottom: none;
}
.user {
  min-width: auto;
}
.underline {
  border-bottom: 1px solid #cccccc;
}

.card {
  margin-bottom: 0px;
  min-height: 160px;
}
</style>
