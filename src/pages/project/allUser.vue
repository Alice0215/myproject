<template>

  <div class="main" >
    <q-toolbar class="header">
    <q-toolbar class="fix">
       <a @click="$router.goBack()" class="back-a"> <q-item-side left  icon="keyboard arrow left" class="back-left"/>返回</a>
        <q-toolbar-title class="header-title">
        {{title}}
        </q-toolbar-title>
        <q-item-side right class="no-info"/>
    </q-toolbar>
    </q-toolbar>
    <!--<div class="search-field">
        <q-search v-model="key_word"  placeholder="搜索" class="btn" />
    </div>-->
    <div class="full-width" id="allUser">
        <div  v-for="user in users"
          :key="user.userId"  @click="addUser(user.fullname,user.userId)">
         <q-item  v-ripple.mat class="full-width underline user-item">
            <q-item-side icon="account circle" class="user"/>
            <q-item-main :label="user.fullname" />
            <q-item-side right icon="done" v-show="true" v-if="ids.indexOf(user.userId) !== -1"/>
        </q-item>
        </div>
         <router-link  :to="{ path: urlname, query:{user:JSON.stringify(userParams),type:type} }" class="full-btn"><q-btn class="full-width btn">完成设置</q-btn></router-link>
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
      projectId: '',
      title: '',
      urlname: '/project/add',
      userParams: [],
      ids: []
    }
  },
  mounted () {
    this.type = this.$route.query.type
    if (localStorage.getItem('selectedUser')) {
      this.userParams = JSON.parse(localStorage.getItem('selectedUser'))
      localStorage.removeItem('selectedUser')
      for (let item of this.userParams) {
        this.ids.push(parseInt(item['userId']))
      }
    }

    if (this.$route.query.projectId) {
      this.projectId = this.$route.query.projectId
      if (this.$route.query.option) {
        this.urlname = '/project/userList?id=' + this.projectId
      } else {
        this.urlname = '/project/edit?id=' + this.projectId
      }
    }

    if (this.type === 'TM') {
      this.title = '项目参与者'
    } else {
      this.title = '项目负责人'
    }
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
      if (this.ids.indexOf(userId) !== -1) {
        this.userParams.splice(this.userParams.findIndex(v => v === userInfo), 1)
        this.ids.splice(this.ids.findIndex(v => v === userId), 1)
      } else {
        this.ids.push(userId)
        this.userParams = [...this.userParams, userInfo]
        eventBus.$emit('users', userInfo)
      }
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#allUser {
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
  .full-btn{
    padding: 0px 15px;
  }
}
</style>
