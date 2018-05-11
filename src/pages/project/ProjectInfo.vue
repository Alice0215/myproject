<template>
  <q-layout id="project-info" view="Hhh lpr Fff">
    <q-layout-header class="no-box-shadow">
      <q-toolbar>
        <a @click="$router.goBack()" class="back-a text-white">
          <q-item-side left  icon="keyboard arrow left" class="back-left text-white"/>
          返回
        </a>
        <q-toolbar-title class="header-title text-white">
          项目名称
        </q-toolbar-title>
        <q-item-side class="white-right" right/>
      </q-toolbar>
      <div class="background-view">
        <div class="mh-15">
          <div class="q-title pt-10">11111</div>
          <div class="row q-body-1 mt-15">
            <div class="col">工期 1111111</div>
            <div class="v-border-right-line mv-3"></div>
            <div class="col ml-20" v-line-clamp:20="1">项目 11111111</div>
          </div>
        </div>
      </div>
    </q-layout-header>
    <q-page-container>
      <q-list class="work-content mt-10">
        <q-item>
          <q-item-main>
            <div class="row no-margin">
              <div class="col-3">备注信息</div>
              <div class="col-9">111111</div>
            </div>
          </q-item-main>
        </q-item>
      </q-list>
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
    }
  }
}
</script>

<style lang='scss'>
  @import "../../assets/css/common";
  #project-info {
    .background-view {
        height: 90px;
        color: white;
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(#239F41), to(#239F5B));
    }
    .q-toolbar {
       background: -webkit-gradient(linear, 0 0, 0 bottom, from(#239F41), to(#239F5B)) !important;
    }
  }

</style>
