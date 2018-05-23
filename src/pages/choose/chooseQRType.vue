<template>
  <q-layout id="choose-type">
    <q-layout-header>
      <q-toolbar class="nav-header">
        <q-item-side @click.native="back" left icon="keyboard arrow left" class="back-left">
          <label>返回</label>
        </q-item-side>
        <q-toolbar-title class="header-title">
          {{ title }}
        </q-toolbar-title>
        <q-item-side class="no-info" right/>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <div class="mt-40 text-center font-16">请选择需要录入的类型</div>
      <q-card class="mt-20 shadow-1" @click.native="singleCardClicked">
        <q-card-main>
          <i class="iconfont">&#xe64c;</i>
          <label>单株植物</label>
        </q-card-main>
      </q-card>
      <q-card class="mt-16 shadow-1" @click.native="areaCardClicked">
        <q-card-main>
          <i class="iconfont">&#xe909;</i>
          <label>片区植物</label>
        </q-card-main>
      </q-card>
      <q-card class="mt-16 shadow-1" @click.native="deviceCardClicked">
        <q-card-main>
          <i class="iconfont">&#xe62f;</i>
          <label>设备</label>
        </q-card-main>
      </q-card>
      <q-card class="mt-16 shadow-1" @click.native="otherCardClicked">
        <q-card-main>
          <i class="iconfont">&#xe64b;</i>
          <label>其他</label>
        </q-card-main>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script>
  import addPlantMixin from '../../mixin/addPlantMixin'
  import { plantType } from '../../const'

  export default {
    mixins: [
      addPlantMixin,
    ],
    data () {
      return {
        title: this.$store.state.qrCodeInfo.qrCodeMsg.identifier
      }
    },
    methods: {
      back () {
        this.$router.goBack()
      },
      singleCardClicked () {
        this.type = plantType.SINGLE
        this.$router.push('/qrcode/stepper')
      },
      areaCardClicked () {
        this.type = plantType.AREA
        this.$router.push('/qrcode/stepper')
      },
      deviceCardClicked () {
        this.type = plantType.DEVICE
        this.$router.push('/qrcode/stepper')
      },
      otherCardClicked () {
        this.type = plantType.OTHER
        this.$router.push('/qrcode/stepper')
      },
    },
    mounted () {
      this.isNew = true
    }
  }
</script>

<style lang="scss">
  #choose-type {
    background-color: #f5f5f5;

    .q-card {
      background-color: white;
      text-align: center;
      width: 80%;
      margin-left: 10%;

      label {
        font-size: 18px;
        font-weight: bold;
        color: #727272;
      }

      i {
        color: #a0da96;
        font-size: 20px;
      }
    }
  }
</style>
