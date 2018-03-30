<template>

  <div class="main">
    <q-toolbar class="header">
    <q-toolbar class="fix">
       <router-link  :to="{ path: urlname, query:{user:userParams,type:type} }" class="top-nav-left">关闭</router-link>
        <q-toolbar-title class="header-title">
        {{title}}
        </q-toolbar-title>
        <q-item-side right/>
    </q-toolbar>
    </q-toolbar>
    <!--<div class="search-field">
        <q-search v-model="key_word"  placeholder="搜索" class="btn" />
    </div>-->
    <div class="full-width">
        <div  v-for="user in users"
          :key="user.userId"  @click="addUser(user.fullname,user.userId)">
         <q-item  v-ripple.mat class="full-width underline user-item">
            <q-item-side icon="account circle" class="user"/>
            <q-item-main :label="user.fullname" />
            <q-item-side right icon="done" v-show="true" v-if="selectIdArr.indexOf(user.userId) !== -1"/>
        </q-item>
        </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../common'
import eventBus from '../../eventBus'
export default {
  data () {
    return {
      users: [],
      key_word: '',
      isShow: false,
      type: '',
      selectIdArr: '',
      projectId: '',
      title: '',
      urlname: '/project/add',
      userParams: []
    }
  },
  created () {
    this.type = this.$route.query.type
    if (localStorage.getItem('selectedUser')) {
      this.selectIdArr = localStorage.getItem('selectedUser')
    }
    console.log(this.selectIdArr)
    if (this.$route.query.projectId) {
      this.projectId = this.$route.query.projectId
      this.urlname = '/project/edit?id=' + this.projectId
    }
    if (this.type === 'TM') {
      this.title = '项目参与者'
    } else {
      this.title = '项目负责人'
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      request('user/all', 'get').then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          this.users = response.data.resultMsg
        } else {
          console.log(response.data.resultMsg)
        }
      })
    },
    addUser (fullname, userId) {
      let userInfo = { 'fullname': fullname, 'userId': userId }
      if (this.selectIdArr.indexOf(userId) !== -1) {
        this.selectIdArr.splice(this.selectIdArr.findIndex(v => v === userId), 1)
        this.userParams.splice(this.userParams.findIndex(v => v === userInfo), 1)
      } else {
        this.userParams = [...this.userParams, userInfo]
        eventBus.$emit('users', userInfo)
        this.selectIdArr = [...this.selectIdArr, userId]
      }
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
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
