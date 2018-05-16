<template>
  <q-layout view="hHh lpr fFf" id="maintenance_record_detail">
    <q-layout-header>
      <q-toolbar class='header bg-white'>
        <a @click="$router.goBack()" class="back-a">
          <q-item-side left  icon="keyboard arrow left" class="back-left"/>
          返回
        </a>
        <q-toolbar-title class='header-title text-center'>
          养护记录详情
        </q-toolbar-title>
        <q-item-side class="white-right font-16 text-main-color text-center"
                     @click.native="$router.push('/project/maintenance?codeId=&jobGroupId=' + jobGroupId)">
          修改
        </q-item-side>
      </q-toolbar>
      <div class="bg-white text-center plant-name" v-if="info">
        <div class="inline-flex">
          <i class="iconfont" v-if="info.type === 1">&#xe64c;</i>
          <i class="iconfont" v-if="info.type === 2">&#xe909;</i>
          <i class="iconfont" v-if="info.type === 3">&#xe62f;</i>
          <i class="iconfont" v-if="info.type === 4">&#xe64b;</i>
          <div class="plant-name-text">{{ info.code.alias }}</div>
        </div>
      </div>
    </q-layout-header>
    <q-page-container>
      <q-page v-if="info">
        <q-list separator>
          <q-item>
            <div class="title">记录人</div>
            <div class="ml-20 content">{{ info.user.username }}</div>
          </q-item>
          <q-item>
            <div class="title">时间</div>
            <div class="ml-20 content">{{ info.createTime }}</div>
          </q-item>
          <q-item>
            <div class="title">地点</div>
            <div class="ml-20 content">{{ info.code.location }}</div>
          </q-item>
          <hr>
        </q-list>
        <q-list>
          <q-item class="ib">
            <div class="mb-10">工作内容</div>
            <q-chip v-for="(v, i) in info.jobs" :key="v.userId">
              {{ v.action.name }}
            </q-chip>
          </q-item>
        </q-list>
        <q-list>
          <q-item class="ib">
            <div class="mb-10">备注内容</div>
            <div class="content">{{ info.description }}</div>
          </q-item>
          <hr>
        </q-list>
        <q-list>
          <q-item class="ib">
            <div class="mb-10">现场图片</div>
            <span v-for="(item, i) in info.pictures" v-bind:key="item.id" :class="{'ml-10': i !== 0}">
              <img :src="item.previewUrl"  preview-title-enable="false" :key="i" @click="imagePreview(i)">
            </span>
          </q-item>
          <hr>
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { request } from '../../common'
import { server, plantType} from '../../const'
import _ from 'lodash'
import { ImagePreview } from 'vant'

export default {
  data () {
    return {
      jobGroupId: '',
      previewApi: '',
      info: '',
      picUrl: '',
      tags: []

    }
  },
  created () {
    this.previewApi = server.PREVIEW_API
    this.jobGroupId = this.$route.query.jobGroupId
    this.getInfo()
  },
  methods: {
    imagePreview (index) {
      let previewArray = _.map(this.info.pictures, (img) => {
        return this.previewApi + img.contentUrl
      })
      ImagePreview(previewArray, index)
    },
    getInfo () {
      this.$q.loading.show()
      request('jobGroup/detail?jobGroupId=' + this.jobGroupId, 'get', null, 'json', true).then(response => {
        this.$q.loading.hide()
        if (response.data.resultCode === 'SUCCESS') {
          this.info = response.data.resultMsg
          switch (this.info.code.type.key) {
            case plantType.SINGLE:
              this.info.type = 1
              break;
            case plantType.AREA:
              this.info.type = 2
              break;
            case plantType.DEVICE:
              this.info.type = 3
              break;
            case plantType.OTHER:
              this.info.type = 4
              break
          }
          if (this.info.pictures.length > 0) {
            let imageArray = []
            _.forEach(this.info.pictures, v => {
              let previewUrl = server.THUMBNAIL_API + v.filePath
              imageArray.push({
                'previewUrl': previewUrl,
                'contentUrl': v.filePath
              })
            })
            this.info.pictures = imageArray
          }
          for (let key in this.info.jobs) {
            this.tags.push(this.info.jobs[key]['action']['name'])
          }
          this.tags.push()
        } else {
          if (response.data.resultCode === 'ERROR') {
            this.$q.dialog({
              title: '提示',
              message: response.data.resultMsg.hint
            })
          } else {
            this.$q.dialog({
              title: '提示',
              message: response.data.resultMsg
            })
          }
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/_variable.scss";
#maintenance_record_detail {
  background-color: $bgcolor;
  .q-chip {
    margin-top: 5px;
    margin-bottom: 10px;
    margin-right: 10px;
    border: 1px solid $chip-border-color;
    .q-chip-main {
      font-size: 16px !important;
    }
  }
  .q-list {
    background: white;
    margin-top: 10px;
    padding: 0;
    .q-item{
      padding: 12px !important;
      .title {
        width: 55px;
      }
      .content {
        color: $text-highlight;
      }
      div {
        font-size: 17px;
      }
    }
  }
  img {
    width: 80px;
    height: 80px;
  }
  .plant-name {
    i {
      color: #9EDB93;
      font-size: 28px;
    }
    .plant-name-text {
      font-size: 17px;
      margin-left: 5px;
      color: $text-highlight;
      margin-top: 4px;
    }
  }
}
</style>
