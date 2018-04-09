<template>
 <q-layout>
  <div class="main" id="my">
    <q-toolbar class="header">
    <q-toolbar class="fix">
       <a @click="$router.back(-1)"><q-item-side left icon="keyboard arrow left"/></a>
        <q-toolbar-title class="header-title">
        设备领用记录
        </q-toolbar-title>
        <q-item-side right/>
    </q-toolbar>
    </q-toolbar>
    <div class="full-width record-list">
       <q-infinite-scroll :handler="getlist" class="scroll-field">
        <div  v-for="item in list" :key="item.id">
            <q-item  v-ripple.mat class="full-width underline user-item">
              <q-item-side icon="account circle" />
              {{item.user.fullname}}
              <q-item-main />
            <span class="user"> {{item.project.createTime}}</span>
            <q-item-side right  icon="keyboard_arrow_right"  class="record-right" />
          </q-item>
        </div>
      </q-infinite-scroll>
    </div>
  </div>
 </q-layout>
</template>

<script>
import { request } from '../../common'
export default {
  data () {
    return {
      pageNo: 1,
      codeId: '',
      hasLoadAll: false,
      list: []
    }
  },
  created () {
    this.codeId = this.$route.query.codeId
    this.getlist()
  },
  methods: {
    async getlist (index, done) {
      if (!this.hasLoadAll) {
        request('equipment/list/byCode?codeId=' + this.codeId + '&pageNo=' + this.pageNo + '&pageSize=20', 'get', null, 'json', true).then(response => {
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
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#my {
  .record-list {
    border-top: 1px solid #cccccc;
  }
  .note .q-item-letter,
  .q-item-icon {
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
