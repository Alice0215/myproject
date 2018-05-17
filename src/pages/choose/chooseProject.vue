<template>
  <div>
    <q-toolbar class="header mb-0">
      <q-toolbar class="fix">
        <a @click="back" class="top-nav-left">关闭</a>
        <q-toolbar-title class="header-title">
          选择项目
        </q-toolbar-title>
        <q-item-side right/>
      </q-toolbar>
    </q-toolbar>
    <q-list id="choose-project">
      <q-infinite-scroll :handler="load" class="scroll-field" ref="scroll">
        <q-item multiline  v-for="item in list"
                :key="item.id" class="list-list"  @click.native="toDetail(item)">
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
    </q-list>
  </div>
</template>

<script>
  import { request } from '../../common'
  import InfiniteScroll from '../../mixin/InfiniteScroll'

  export default {
   
    mixins: [
      InfiniteScroll
    ],
    mounted () {
      this.apiUrl = 'project/list?'
      this.scroll = this.$refs.scroll
    },
  
    methods: {
      back () {
        this.$router.goBack()
      },
      toDetail (item) {
        console.log(item)
        localStorage.setItem('choose-project', JSON.stringify(item))
        this.$router.goBack()
        // return 'qcode/List?projectId' + projectId
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/common";
  #choose-project {
    border: 0;

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
  }
</style>
