<template>
  <q-layout id="view-qrcode">
    <q-toolbar class='header'>
      <q-toolbar class='fix'>
        <a @click="back">
          <q-item-side left icon='keyboard arrow left' class='reback'/>
          返回</a>
        <q-toolbar-title class='header-title'>
          二维码
        </q-toolbar-title>
        <a class="top-nav-right"></a>
      </q-toolbar>
    </q-toolbar>
    <div class="text-center mt-40">
      <img :src="qrcodeUrl">
    </div>
    <q-btn class="full-width btn bottom-big-button" @click='save()'>保存到手机相册</q-btn>
  </q-layout>
</template>

<script>
  import {removeLocalStory} from '../../common'
  export default {
    data () {
      return {
        qrcodeUrl: ''
      }
    },
    methods: {
      save () {
        if (cordova.plugins.saveToPhotoAlbum) {
          cordova.plugins.saveToPhotoAlbum.save(this.qrcodeUrl, (nativeUrl) => {
            console.log(nativeUrl)
            this.$q.notify('保存成功')
          }, (err) => {
            console.log(err)
          })
        }
      },
      back () {
        this.$router.goBack()
      }
    },
    mounted () {
      this.qrcodeUrl = localStorage.getItem('qrcode-preview')
    },
    beforeDestroy () {
      removeLocalStory('qrcode-preview')
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/common";
  #view-qrcode {
    background-color: #000000;

    .bottom-big-button {
      width:  calc(100% - 40px) !important;
      position: absolute;
      margin-left: 20px !important;
      bottom: 4px;
    }
  }
</style>
