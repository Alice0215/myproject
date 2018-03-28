<template>
    <q-list class="list">
        <q-toolbar class="header">
        <q-toolbar class="fix">
            <q-toolbar-title class="header-title">
            项目
            </q-toolbar-title>
       </q-toolbar>
        </q-toolbar>
        <q-item class="list-list">
             <span class="add-btn" @click="$router.push('project/add')">+</span>
            <q-item-main class="add-field">
            创建项目
            </q-item-main>
        </q-item>
        <q-infinite-scroll :handler="load" class="scroll-field">
        <q-item multiline  v-for="item in list"
          :key="item.id" class="list-list"  to="qcode/list">
           <q-item-side class="add-btn" />
            <q-item-main>
            <q-item-tile label class="title">{{item.projectName}}</q-item-tile>
            <q-item-tile sublabel lines="2" class="content">
            {{item.projectDesc}}
            </q-item-tile>
            </q-item-main>
        </q-item>
        <div class="row justify-center" style="margin-bottom: 50px;" v-if="!hasLoadAll">
          <q-spinner name="dots" slot="message" :size="40"></q-spinner>
        </div>
      </q-infinite-scroll>
      <q-tabs class="footer">
        <q-route-tab slot="title" icon="apps" to="/" replace label="我的项目" class="menu" />
        <q-route-tab slot="title" icon="view_array" to="/" replace label="扫二维码" class="menu"/>
        <q-route-tab slot="title" icon="event note" to="/" replace label="巡查" class="menu"/>
        <q-route-tab slot="title" icon="person" to="/" replace label="我的" class="menu"/>
      </q-tabs>
    </q-list>
</template>

<script>
import { request } from '../../common'
export default {
  data () {
    return {
      list: '',
      loading: false,
      pageNo: 1,
      hasLoadAll: false
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    async getlist () {
      request(
        'project/list?pageNo=' + this.pageNo + '&pageSize=20',
        'get',
        '',
        'json',
        true
      ).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          this.list = response.data.resultMsg
          this.pageNo++
          console.log(this.list)
        } else {
          console.log(response.data.resultMsg)
        }
      })
    },

    async load () {
      if (!this.hasLoadAll) {
        this.loading = true
        request(
          'project/list?pageNo=' + this.pageNo + '&pageSize=20',
          'get',
          '',
          'json',
          true
        ).then(response => {
          if (response.data.resultCode === 'SUCCESS') {
            this.loading = false
            let list = response.data.resultMsg
            if (list.length === 0 || !list.length) {
              this.hasLoadAll = true
              return
            }
            if (list.length < 20) {
              this.list = list
              this.hasLoadAll = true
              return
            }
            this.list = this.list.concat(list)
            console.log(this.list)
            this.pageNo++
          }
        })
      }
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
.list {
  padding: 0px;
  border: none;
}
.scroll-field{
  margin-bottom: 63px;
}
.add-btn {
  width: 75px;
  height: 75px;
  background-color: #dcdcdc;
  border-radius: 5px;
  color: white;
  font-size: 60px;
  line-height: 75px;
  text-align: center;
}
.add-field {
  padding-left: 10px;
}
.title {
  font-size: 16px;
  color: black;
  padding-top: 10px;
}
.content {
  font-size: 14px;
  color: #666666 !important;
  margin-top: 5px;
}
</style>
