<template>
  <q-layout view="Hhh lpr Fff">
    <q-layout-header>
      <q-toolbar>
          <a @click="this.$router.goBack()" class="back-a font-14">
          <q-item-side left  icon="keyboard arrow left" class="back-left "/>
          返回
        </a>
        <q-toolbar-title class="header-title">
          项目2
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <q-list class="full-width card">
          <q-card inline class="q-ma-sm full-width white_bg"  v-for="(item, index) in list" :key="index">
            <q-card-title class="no-padding-bottom">
              <span class="title font-18 bold">{{item.projectName}}</span>
              <span class="title float-right font-14">养护项目</span>
            </q-card-title>
            <q-card-main>
              <div class="project-item inline">
                <div class="active font-18 bold">12</div>
                <div>项目成员/人</div>
              </div>

              <!-- <div class="project-item">
                <span class="active">120</span>
                <span>二维码数量/天</span>
              </div>
               <div class="project-item">
                <span class="active">120</span>
                <span>今日记录/个</span>
              </div>
              <div class="project-item">
                <span class="active">120</span>
                <span>现场巡查/个</span>
              </div> -->
            </q-card-main>
            <q-card-separator />
            <q-card-actions class="col-12">
              <span class="col-8 float-left">负责人：111111</span>
              <div class="col-4">
                <q-btn flat  class="card-btn float-right">查看详情</q-btn>
              </div>
            </q-card-actions>
          </q-card>
      </q-list>
    </q-page-container>
    <q-layout-footer class="footer" id="projectList">
       <q-btn class="full-width btn m-0 font-16">新建项目</q-btn>
    </q-layout-footer>
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
    this.load()
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
          request('project/list/v2?pageNo=' + that.pageNo + '&pageSize=20', 'get', '', 'json', true).then(response => {
            if (response) {
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
