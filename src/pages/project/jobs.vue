<template>

  <div class="main" id="allUser">
     <q-toolbar class='header'>
        <q-toolbar class='fix'>
             <a @click="$router.back(-1)"><q-item-side left  icon='keyboard arrow left' class='reback'/></a>
            <q-toolbar-title class='header-title'>
              类型
            </q-toolbar-title>
            <a class="top-nav-right">保存</a>
       </q-toolbar>
    </q-toolbar>
    <div class="full-width">
      <q-item class="full-width bg-primary jobs-title">
        <q-item-tile class="color-black mb-8 mt-10 bg-primary">已选工作内容</q-item-tile>
      </q-item>
       <q-item class="bg-primary jobs-tags">
        <q-chips-input v-model="tags" chips-bg-color="white" color="lightGray" chips-color="lightGray"/>
      </q-item>
      <div class="parent" v-for="item in lists" :key="item.id">
        <div v-if="!hasChildren[item.id]"  @click="getChildList(item.id)">
        <q-item  v-ripple.mat class="full-width underline user-item">
          <q-item-main :label="item.name" />
          <q-item-side right icon="done" class="active" v-if="ids.indexOf(item.id) !== -1"/>
          <q-item-side right icon="arrow drop down" v-if="!hasChildren[item.id]"/>
        </q-item>
        </div>
         <div class="child bg-primary" v-if="parentId===item.id" v-for="vo in children" :key="vo.id" >
          <q-item  v-ripple.mat class="full-width underline user-item" @click.native="choose()">
            <q-item-main :label="vo.name" />
            <q-item-side right icon="done" class="active" />
          </q-item>
        </div>
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
      parentId: '',
      tags: ['苗木假植', '苗木假植', '苗木假植', '苗木假植', '灌水', '苗木假植', '灌水'],
      children: [],
      ids: [],
      hasChildren: [],
      isOpen: false,
      names: []
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
    async getChildList (parentId) {
      this.parentId = parentId
      if (!this.isOpen) {
        let resp = await request('data/jobAction/parent?parentId=' + parentId, 'get')
        this.children = resp.data.resultMsg
        // this.isOpen = true
        if (this.children.length === 0 || !this.children.length) {
          this.hasChildren[parentId] = true
        }
      } else {
        // this.isOpen = false
        this.children = []
      }
    },
    choose (fullname, userId) {
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
  .header,
  .fix {
    margin-bottom: 0px;
  }
  .jobs-title {
    padding-top: 3px !important;
    padding-bottom: 1px !important;
  }
  .jobs-tags {
    padding-top: 0px;
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
  .user {
    min-width: auto;
  }
  .child {
    padding-left: 26px;
  }
}
</style>
