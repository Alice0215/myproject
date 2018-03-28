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
      <q-input class="remark-field" v-model="remark" type="textarea" placeholder="请输入备注信息" rows="6" hide-underline	 />
    </q-list>
    <q-list class="mt-6 bg-white pb-8">
      <q-list-header>现场拍照</q-list-header>
      <q-btn icon="camera"  @click="upload('')"/>
    </q-list>
  </q-layout>
</template>

<script>
  import { request } from '../../common'

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
            console.log(imgData)
          }, errorMsg => {
            console.log(errorMsg)
          }, {destinationType: Camera.DestinationType.DATA_URL})
        }
      },
      async upload (fileData) {
        fileData = 'data:image/jpeg;base64,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'
        let fD = new FormData()
        fD.append('img', fileData)
        let uploadReq = await request('file/upload', 'POST', fD)
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
