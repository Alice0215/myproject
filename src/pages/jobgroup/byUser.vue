<template>

  <div class="main" id="my">
    <q-toolbar class="header">
    <q-toolbar class="fix">
       <q-item-side left/>
        <q-toolbar-title class="header-title">
        我的
        </q-toolbar-title>
        <q-item-side right icon='settings' class='group'/>
    </q-toolbar>
    </q-toolbar>
    <div class="full-width record-list">
        <q-item  v-ripple.mat class="full-width user-item-header">
          <q-item-main label=" 操作记录" />
       </q-item>

        <div>
          <q-item  v-ripple.mat class="full-width underline user-item">
            <div>
              测试
              <div>2018-02-20</div>
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
              <div>2018-02-20</div>
            </div>
             <q-item-main />
            <span class="user">项目A</span>
            <q-item-side right  icon="keyboard_arrow_right"  class="record-right" />
          </q-item>
        </div>
       <q-infinite-scroll :handler="getlist" class="scroll-field">
        <div  v-for="item in list" :key="item.id">
          <q-item  v-ripple.mat class="full-width underline user-item">
            <q-item-side icon="account circle" class="user"/>
            <q-item-main :label="item.description" />
          </q-item>
        </div>
      </q-infinite-scroll>
    </div>
  </div>
</template>

<script>
import { request } from '../../common'
export default {
  data () {
    return {
      pageNo: 1,
      hasLoadAll: true,
      list: []
    }
  },
  methods: {
    async getlist (index, done) {
      let userId = JSON.parse(localStorage.getItem('user')).userId
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
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#my {
  .record-list{
    border-top: 1px solid #cccccc;
  }
  .user-item-header {
    background-color: #F5F5F5;
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
}
</style>
