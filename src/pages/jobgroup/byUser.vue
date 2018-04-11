<template>
 <q-layout>
  <div class="main" id="my">
    <q-toolbar class="header">
    <q-toolbar class="fix">
       <q-item-side left/>
        <q-toolbar-title class="header-title">
        我的
        </q-toolbar-title>
         <q-btn   flat round dense icon="settings" @click="leftDrawer = !leftDrawer"/>
        <!--<q-item-side right icon='settings' class='group'/>-->
    </q-toolbar>
    </q-toolbar>
    <div class="full-width record-list">
        <q-item  v-ripple.mat class="full-width user-item-header">
          <q-item-main label="操作记录" />
       </q-item>
       <q-infinite-scroll :handler="getlist" class="scroll-field">
        <div  v-for="item in list" :key="item.id">
            <q-item  v-ripple.mat class="full-width underline user-item">
            <div>
              <!--jobs[i].action.name-->
              {{item.description}}
              <div>{{item.createTime}}</div>
            </div>
             <q-item-main />
            <span class="user">{{item.project.projectName}}</span>
            <q-item-side right  icon="keyboard_arrow_right"  class="record-right" />
          </q-item>
        </div>
      </q-infinite-scroll>
    </div>
  </div>

   <q-layout-drawer
      side="right"
      v-model="leftDrawer"
    >
      <!-- QScrollArea is optional -->
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
        <!-- Content here -->
      </q-scroll-area>
    </q-layout-drawer>
    <q-tabs class="footer">
        <q-route-tab slot="title" icon="dashboard" to="/" replace label="我的项目" class="menu" />
        <q-route-tab slot="title" icon="view_array" to="/qcode/scan" append label="扫二维码" class="menu"/>
        <q-route-tab slot="title" icon="event note" to="/" replace label="巡查" class="menu"/>
        <q-route-tab slot="title" icon="person" to="/jobGroup/byUser" replace label="我的" class="menu"/>
      </q-tabs>
 </q-layout>
</template>

<script>
import { request } from '../../common'
export default {
  data () {
    return {
      pageNo: 1,
      hasLoadAll: true,
      leftDrawer: true,
      list: []
    }
  },
  methods: {
    async getlist (index, done) {
      if (!this.hasLoadAll) {
        request('jobGroup/list/byUser?pageNo=' + this.pageNo + '&pageSize=20', 'get', null, 'json', true).then(response => {
          if (response.data.resultCode === 'SUCCESS') {
            let that = this
            let list = response.data.resultMsg
            if (list.length === 0 || !list.length) {
              that.hasLoadAll = true
              return
            }
            if (list.length < 20) {
              that.hasLoadAll = true
            } else {
              that.pageNo++
            }
            if (that.list.length > 0) {
              that.list = that.list.concat(list)
            } else {
              that.list = list
            }
            done()
          }
        })
      }
    },
    logOut () {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('partyId')
      this.$router.push('/')
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
}
</style>
