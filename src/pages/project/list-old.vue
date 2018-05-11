<template>
  <q-layout view="Hhh lpr Fff">
    <q-layout-header>
      <q-toolbar>
          <a @click="this.$router.goBack()" class="back-a font-14">
          <q-item-side left  icon="keyboard arrow left" class="back-left "/>
          返回
        </a>
        <q-toolbar-title class="header-title">
          新建项目
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
    <q-page>
      <q-list class="list" id="project-list">
        <q-item class="list-list" @click.native="$router.push('/project/add')">
          <span class="add-btn">+</span>
          <q-item-main class="add-field">
            创建项目
          </q-item-main>
        </q-item>
        <q-infinite-scroll :handler="load" class="scroll-field">
          <q-item multiline v-for="item in list"
                  :key="item.id" class="list-list" @click.native="$router.push('qcode/list?projectId='+item.id)">
            <q-item-side class="add-btn"/>
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
          <q-route-tab slot="title" icon="dashboard" to="/" replace label="我的项目" class="menu"/>
          <q-route-tab slot="title" icon="view_array" to="/qcode/scan" append label="扫二维码" class="menu"/>
          <q-route-tab slot="title" icon="event note" to="/" replace label="巡查" class="menu"/>
          <q-route-tab slot="title" icon="person" to="/jobGroup/byUser" replace label="我的" class="menu"/>
        </q-tabs>
      </q-list>
    </q-page>
    </q-page-container>
  </q-layout>
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
  },
  methods: {
    toDetail (projectId) {
      return 'qcode/List?projectId' + projectId
    },
    async load (index, done) {
      let that = this
      setTimeout(() => {
        if (!this.hasLoadAll) {
          this.loading = true
          request(
            'project/list?pageNo=' + that.pageNo + '&pageSize=20',
            'get',
            '',
            'json',
            true
          ).then(response => {
            if (response.data.resultCode === 'SUCCESS') {
              this.loading = false
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
      }, 100)
    }
  }
}
</script>

<style lang='scss'>
  @import "../../assets/css/common";
  #project-list {
    .add-btn {
      width: 75px;
      height: 75px;
      background-color: #dcdcdc;
      border-radius: 5px;
      color: white;
      font-size: 60px;
      line-height: 68px;
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
  }
</style>
