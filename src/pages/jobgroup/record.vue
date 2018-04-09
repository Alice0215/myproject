<template>
 <q-layout>
  <div class="main" id="my">
    <q-toolbar class="header">
    <q-toolbar class="fix">
       <q-item-side left icon="keyboard arrow left"/>
        <q-toolbar-title class="header-title">
        设备领用记录
        </q-toolbar-title>
        <q-item-side right/>
    </q-toolbar>
    </q-toolbar>
    <div class="full-width record-list">
        <q-item  v-ripple.mat class="full-width user-item-header">
          <q-item-main label="2018年03月" />
           <q-item-side right icon="event note" class="note"/>
       </q-item>

        <div>
          <q-item  v-ripple.mat class="full-width underline user-item">
            <div>
              测试
            </div>
             <q-item-main />
            <span class="user">项目A</span>
            <q-item-side right  icon="keyboard_arrow_right"  class="record-right" />
          </q-item>
        </div>
        <div>
          <q-item  v-ripple.mat class="full-width underline user-item">
            <div>
              测试
            </div>
             <q-item-main />
            <span class="user">项目A</span>
            <q-item-side right  icon="keyboard_arrow_right"  class="record-right" />
          </q-item>
        </div>
       <q-infinite-scroll :handler="getlist" class="scroll-field">
        <div  v-for="item in list" :key="item.id">
            <q-item  v-ripple.mat class="full-width underline user-item">
            <div>
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
    <q-tabs class="footer">
        <q-route-tab slot="title" icon="dashboard" to="/" replace label="我的项目" class="menu" />
        <q-route-tab slot="title" icon="view_array" to="/" replace label="扫二维码" class="menu"/>
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
      let userId = JSON.parse(localStorage.getItem('user')).userId
      if (!this.hasLoadAll) {
        request('jobGroup/list/byUser?userId=' + userId + '&pageNo=' + this.pageNo + '&pageSize=20', 'get', null, 'json', true).then(response => {
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
  .note .q-item-letter, .q-item-icon{
    font-size: 20px;
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
