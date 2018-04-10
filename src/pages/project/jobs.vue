<template>

  <div class="main" id="allUser">
    <q-toolbar class="header">
    <q-toolbar class="fix">
       <router-link  :to="{ path: urlname }" class="top-nav-left"><q-item-side left  icon="keyboard arrow left"/>返回</router-link>
        <q-toolbar-title class="header-title">类型 </q-toolbar-title>
        <router-link  :to="{ path: urlname}" class="top-nav-left"><q-item-side right/>保存</router-link>
    </q-toolbar>
    </q-toolbar>
    <div class="full-width">
        <div  v-for="item in lists"
          :key="item.id"  @click="addUser()">
         <q-item  v-ripple.mat class="full-width underline user-item">
            <q-item-main :label="item.name" />
            <q-item-side right icon="done" v-show="true" v-if="ids.indexOf(item.id) !== -1"/>
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
      urlname: '',
      lists: [],
      isShow: false,
      ids: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      let resp = await request('data/jobAction/category?category=MAINTAIN', 'get')
      this.lists = resp.data.resultMsg
    },
    getChildList (parentId) {
      let resp = request('data/jobAction/parent?parentId=' + parentId, 'get')
      this.lists = resp.data.resultMsg
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
}
</style>
