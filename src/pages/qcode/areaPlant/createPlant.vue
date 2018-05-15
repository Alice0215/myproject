<template>
  <q-layout id="create-plant">
    <q-layout-header>
      <q-toolbar class="nav-header">
        <q-item-side @click.native="back" left icon="keyboard arrow left" class="back-left">
          <label>返回</label>
        </q-item-side>
        <q-toolbar-title class="header-title">
          新增植物
        </q-toolbar-title>
        <q-item-side class="no-info" right>
          <q-btn label="完成" color="primary" size="xs"></q-btn>
        </q-item-side>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <van-cell-group :border="false">
        <van-field class="font-16" v-model="temp" label="植物名称" placeholder="请输入植物名称" required/>
        <div class="van-hairline--bottom font-16 ml-15 area-input-class row">
          <label class="w-64">苗木面积</label>
          <q-input placeholder="输入片值苗木面积" hide-underline  class="no-margin" v-model="temp" type="number"></q-input>
          <q-select hide-underline  v-model="temp" @input="" :options='[]'
                    class="no-margin border-left" placeholder='选择单位'/>
        </div>
        <van-cell title="苗木分类" is-link :value="category" required class="font-16" @click="chooseNursery"/>
        <van-field class="font-16" v-model="temp" label="相对位置" placeholder="请输入植物在片区内的位置" />
        <div class="specification-class font-16 pl-15 pr-15 pt-16 pb-20">
          <label class="h-44">苗木规则</label>
          <div class="row mt-6 spec-row-div">
            <div class="row spec-left-div ">
              <label class="spec-input-left">胸径</label>
              <q-input class="spec-input" hide-underline align="center" v-model="plantForm.xiongJing" type="number"/>
              <span class="spec-input-unit">厘米</span>
            </div>
            <div class="row spec-right-div">
              <label class="spec-input-left">高度</label>
              <q-input class="spec-input" hide-underline align="center" v-model="plantForm.gaoDu" type="number"/>
              <span class="spec-input-unit">米</span>
            </div>
            <div class="row spec-left-div ">
              <label class="spec-input-left">地径</label>
              <q-input class="spec-input" hide-underline align="center" v-model="plantForm.diJing" type="number"/>
              <span class="spec-input-unit">厘米</span>
            </div>
            <div class="row spec-right-div">
              <label class="spec-input-left">冠幅</label>
              <q-input class="spec-input" hide-underline align="center" v-model="plantForm.guanFu" type="number"/>
              <span class="spec-input-unit">米</span>
            </div>
            <div class="row spec-left-div col-12">
              <label class="spec-input-left">蓬径</label>
              <q-input class="spec-input" hide-underline align="center" v-model="plantForm.pengJing" type="number"/>
              <span class="spec-input-unit">米</span>
            </div>
            <div class="row spec-left-div ">
              <label class="spec-input-left w-64">分支数量</label>
              <q-input class="spec-input w-40" hide-underline align="center" v-model="plantForm.branch" type="number"/>
              <span class="spec-input-unit">个</span>
            </div>
            <div class="row spec-right-div">
              <label class="spec-input-left w-50">几年生</label>
              <q-input class="spec-input" hide-underline align="center" v-model="plantForm.year"/>
              <span class="spec-input-unit">年</span>
            </div>
            <div class="row spec-left-div col-12">
              <label class="spec-input-left w-64">其他规格</label>
              <q-input class="spec-input other-spec" hide-underline align="center" v-model="plantForm.otherFeature"/>
            </div>
          </div>
        </div>
      </van-cell-group>
      <van-field class="font-16" v-model="plantForm.source" label="苗源地" placeholder="请输入苗源地信息"/>
      <van-field class="font-16" v-model="plantForm.dealer" label="苗木商" placeholder="请输入苗木商信息"/>
      <van-field class="font-16 van-hairline--bottom" v-model="plantForm.other"
                 label="苗木其他" placeholder="请输入苗木其他信息"/>
      <q-list class="mt-1 bg-white no-border">
        <q-list-header class="p-0 pl-15 mt-15 font-16 color-black">现场拍照</q-list-header>
        <div class="row pl-20">
          <div class="w-100 h-100" v-for="v, i in plantForm.pictures" :key="i">
            <img :src="v.previewUrl" preview-title-enable="false" :key="i" @click="imagePreview(i)"
                 class="full-height full-width">
            <q-icon class="img-close" @click.native="cancelUploadImage(i)" color="grey" name="ion-close-circled"/>
          </div>
          <div class="w-100 h-100 camera-div">
            <q-btn icon="camera alt" size="20px" @click="openCamera" class="camera-button full-height full-width"/>
          </div>
        </div>
      </q-list>
    </q-page-container>
  </q-layout>
</template>

<script>
  import { uploadFiles, deleteFiles, request } from '../../../common'
  import { ImagePreview } from 'vant'
  import _ from 'lodash'
  import eventBus from '../../../eventBus'
  import { server } from '../../../const'
  export default {
    data () {
      return {
        temp: null,
        plantForm: {},
        category: '选择苗木分类'
      }
    },
    methods: {
      imagePreview (index) {
        console.log(index)
        let previewArray = _.map(this.commonForm.pictures, (img) => {
          return server.PREVIEW_API + img.contentUrl
        })
        console.log(previewArray)
        ImagePreview(previewArray, index)
      },
      cancelUploadImage (index) {
        this.$q.loading.show()
        let img = this.commonForm.pictures[index]
        deleteFiles(img.contentUrl, index)
      },
      openCamera () {
        console.log('open camera')
        if (navigator.camera) {
          navigator.camera.getPicture(imgData => {
            this.$q.loading.show()
            uploadFiles(imgData)
          }, errorMsg => {
            console.log(errorMsg)
          }, {destinationType: Camera.DestinationType.DATA_URL})
        }
      },
      save () {

      }
    },
    mounted () {
      eventBus.$on('upload-success', resp => {
        this.$q.loading.hide()
        this.plantForm.pictures.push(resp)
      })
      eventBus.$on('delete-success', (params) => {
        this.$q.loading.hide()
        let index = parseInt(params.idx)
        this.plantForm.pictures.splice(index, 1)
        this.$q.dialog({
          title: '提示',
          message: params.msg,
        })
      })
    },
    beforeDestroy () {
      eventBus.$off('upload-success')
      eventBus.$off('delete-success')
    },
  }
</script>

<style lang="scss">
  @import "../../../assets/css/variable";

  #create-plant {
    .other-spec {
      width: calc(100% - 64px - 8px) !important;
    }
    .spec-row-div {
      justify-content: space-between;
      div {
        margin-top: 12px;
      }
    }

    .spec-input-left {
      width: 32px;
      height: 44px;
      line-height: 44px;
    }
    .spec-input {
      margin: 0 !important;
      background-color: white;
      width: 70px;
      margin-left: 8px !important;
      height: 44px;
      line-height: 44px;
    }

    .spec-input-unit {
      background-color: white;
      color: gray;
      width: 44px;
      text-align: center;
      height: 44px;
      line-height: 44px;
    }

    .specification-class {
      background-color: $bgcolor;

      .q-if-inner {
        height: 100%;
        margin-top: 0 !important;
      }
    }

    .border-left {
      border-left: 1px solid #e8e8e8;
    }

    .area-input-class {
      height: 44px;

      .q-input {
        margin-left: 20px !important;
        width: 150px;
        padding: 0 !important;
        height: 44px;

        .q-if-inner {
          height: 100%;
        }
      }

      .q-select {
        width: calc(100% - 20px - 150px - 64px);
        margin-right: 8px;
        text-align: center;
        padding-bottom: 0 !important;

        .q-input-target {
          height: 44px;
          line-height: 44px;
        }

        .q-icon {
          height: 44px;
        }
      }

      label {
        line-height: 44px;
      }
    }

    .bottom-button-div {
      button {
        width: 45%;
      }
    }

    .img-close {
      margin-left: 70px;
      margin-top: -195px;
      font-size: 28px;
    }

    .camera-div {
      background-color: #EEEEEE;

      .q-icon {
        color: gray;
      }
    }
  }
</style>
