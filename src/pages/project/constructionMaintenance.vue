<template>
  <q-layout id="maintenace-page" class="fit">
    <q-list>
      <q-item link class="full-width bg-white">
        <q-item-side>
          <q-item-tile class="color-black mb-8 mt-10">国槐01234</q-item-tile>
          <q-item-tile icon="place" class="mb-8">
            <label class="color-black font-12">河南省郑州市</label>
          </q-item-tile>
        </q-item-side>
        <q-item-main>
        </q-item-main>
        <q-item-side right icon="fas fa-qrcode color-black"/>
        <q-item-side right class="color-gray" icon="keyboard_arrow_right"/>
      </q-item>
      <q-item class="mt-6">
        <q-item-side label class="font-14">工作内容选择</q-item-side>
        <q-item-main></q-item-main>
        <q-item-side right icon="keyboard_arrow_right" class="color-gray"></q-item-side>
      </q-item>
      <q-item-separator class="mt-0 mb-0"/>
      <q-item>
        <q-chips-input v-model="tags" hide-underline readonly chips-bg-color="lightGray" chips-color="black"/>
      </q-item>
    </q-list>
    <q-list class="mt-6 bg-white pb-8">
      <q-list-header>备注信息</q-list-header>
      <q-input class="remark-field" v-model="remark" type="textarea" placeholder="请输入备注信息" rows="6" hide-underline/>
    </q-list>
    <q-list class="mt-6 bg-white pb-8">
      <q-list-header>现场拍照</q-list-header>
      <q-btn icon="camera" @click="openCamera"/>
    </q-list>
  </q-layout>
</template>

<script>
  import { request, dataURLtoFile } from '../../common'

  export default {
    data () {
      return {
        tags: ['裁植修建', '苗木假植', '灌水'],
        remark: ''
      }
    },
    methods: {
      openCamera () {
        console.log('open camera')
        if (navigator.camera) {
          navigator.camera.getPicture(imgData => {
            this.upload(imgData)
          }, errorMsg => {
            console.log(errorMsg)
          }, {destinationType: Camera.DestinationType.DATA_URL})
        }
      },
      async upload (fileData) {
        let fileBlob = dataURLtoFile(fileData)
        let fD = new FormData()
        fD.append('file', fileBlob)
        let uploadReq = await request('file/upload', 'POST', fD, 'json', true)
        console.log(uploadReq)
      }
    }
  }
</script>

<style lang="scss">
  #maintenace-page {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;

    .q-list {
      border: 0;
      padding: 0;
    }

    .q-item {
      background-color: white;
    }

    .q-item-side {
      color: black;
    }

    .remark-field {
      padding: 2px;
      width: 96%;
      left: 2%;
      font-size: 14px;
      border-style: solid;
      border-width: 1px;
      border-color: lightgray;
      border-radius: 8px;
    }
  }
</style>
