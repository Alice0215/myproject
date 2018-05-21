<template>
  <div>
  <q-layout view="Hhh lpr Fff"  class="main" id="my">
      <q-layout-header>
        <q-toolbar>
          <q-toolbar-title class="header-title">
            我的
          </q-toolbar-title>
         <q-btn flat round dense icon="settings" @click="leftDrawer = !leftDrawer" class="top-color"/>
        </q-toolbar>
      </q-layout-header>
      <q-page-container>
      <q-page>
    <div class="full-width record-list">
        <q-item  v-ripple.mat class="full-width user-item-header">
          <q-item-main label="养护记录" />
       </q-item>
        <q-infinite-scroll :handler="load" ref="scroll">
        <q-list separator v-if="list.length > 0" class="scroll-field">
            <q-item  v-ripple.mat class="full-width underline user-item" v-for="item in list"
                    :key="item.id">
            <div>
              <!--jobs[i].action.name-->
              {{item.job.action.name}}
              <div>{{item.createTime}}</div>
            </div>
             <q-item-main />
            <span class="user">{{item.project.projectName}}</span>
            <q-item-side right  icon="keyboard_arrow_right"  class="record-right" />
          </q-item>
        </q-list>
         <div class="row justify-center" style="margin-bottom: 50px;" v-if="!hasLoadAll">
            <q-spinner name="dots" slot="message" :size="40"></q-spinner>
          </div>
      </q-infinite-scroll>
    </div>

   <q-layout-drawer
      side="right"
      v-model="leftDrawer"
    >
      <q-scroll-area class="fit q-pa-sm">
         <q-item  v-ripple.mat class="full-width user-item  underline">
        </q-item>
        <q-item  v-ripple.mat class="full-width user-item " >
          <q-item-side left icon="account circle" class="record-right active"/>
            <q-item-main  :label="`编辑资料`" />
        </q-item>
        <q-item  v-ripple.mat class="full-width user-item ">
          <q-item-side left icon="account balance wallet" class="record-right active"/>
            <q-item-main  :label="`账号管理`" />
        </q-item>
        <q-item  v-ripple.mat class="full-width user-item"  @click.native="logOut">
          <q-item-side left icon="exit to app" class="record-right active"/>
            <q-item-main  :label="`退出登录`" />
        </q-item>
      </q-scroll-area>
    </q-layout-drawer>
    <q-tabs class="footer" v-model="model">
        <q-route-tab slot="title" icon="home" to="/" replace label="首页" class="menu" name="home"/>
        <q-route-tab slot="title" icon="notifications none" to="/"  disable replace label="消息" class="menu" />
        <q-route-tab slot="title" icon="person" to="/jobGroup/byUser" replace label="我的" class="menu" name="my"/>
      </q-tabs>
   </q-page>
    </q-page-container>
  </q-layout>
  </div>
</template>

<script>
import eventBus from '../../eventBus'
import InfiniteScroll from '../../mixin/InfiniteScroll'
export default {
  data () {
    return {
      model: 'my',
      leftDrawer: true
    }
  },
  mixins: [
    InfiniteScroll
  ],
  methods: {
    // async getlist (index, done) {
    //   if (!this.hasLoadAll) {
    //     request('jobGroup/list/byUser?pageNo=' + this.pageNo + '&pageSize=20', 'get', null, 'json', true).then(response => {
    //       if (response.data.resultCode === 'SUCCESS') {
    //         let that = this
    //         let list = response.data.resultMsg
    //         if (list.length === 0 || !list.length) {
    //           that.hasLoadAll = true
    //           return
    //         }
    //         if (list.length < 20) {
    //           that.hasLoadAll = true
    //         } else {
    //           that.pageNo++
    //         }
    //         if (that.list.length > 0) {
    //           that.list = that.list.concat(list)
    //         } else {
    //           that.list = list
    //         }
    //         done()
    //       }
    //     })
    //   }
    // },
    logOut () {
      this.$q.dialog({
        title: '提示',
        message: '您确定要退出吗？',
        cancel: '取消',
        ok: '确定'
      }).then(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('partyId')
        this.$router.push('/')
      }).catch(() => {
        this.leftDrawer = false
      })
    },
    mounted () {
      let currentUser = this.$store.state.User.current
      // this.apiUrl = 'jobGroup/list/byProject?projectId=' + this.projectId
      this.apiUrl = 'jobGroup/list/byUser?userId=' + currentUser.userId
      console.log(this.apiUrl)
      this.scroll = this.$refs.scroll
      this.infiniteScrollCallback = function () {
        if (this.list.length > 0) {
          eventBus.$emit('has-maintenance-records')
        }
      }
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#my {
  .record-list {
    border-top: 1px solid #cccccc;
  }
  .user-item-header {
    background-color: #f5f5f5;
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
  .record-right {
    margin-left: 0px;
    min-width: 20px;
  }
  .top-color {
    color: #888;
  }
}
</style>
