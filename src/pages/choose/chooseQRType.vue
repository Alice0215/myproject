<template>
 <q-layout id="choose-type">
  <q-layout-header>
    <q-toolbar class="nav-header">
        <q-item-side @click="back" left icon="keyboard arrow left" class="back-left">
          <label>返回</label>
          </q-item-side>
        <q-toolbar-title class="header-title">
          二维码
        </q-toolbar-title>
          <q-item-side class="no-info" right/>
    </q-toolbar>
  </q-layout-header>
  <q-page-container>
    <div class="mt-40 text-center font-16">请选择需要录入的类型</div>
    <q-card class="mt-20 shadow-1" @click.native="singleCardClicked">
      <q-card-main>
        <label>单株植物</label>
      </q-card-main>
    </q-card>
    <q-card class="mt-16 shadow-1" @click.native="areaCardClicked">
      <q-card-main>
        <label>片区植物</label>
      </q-card-main>
    </q-card>
    <q-card class="mt-16 shadow-1" @click.native="deviceCardClicked">
      <q-card-main>
        <label>设备</label>
      </q-card-main>
    </q-card>
    <q-card class="mt-16 shadow-1" @click.native="otherCardClicked">
      <q-card-main>
        <label>其他</label>
      </q-card-main>
    </q-card>
  </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    back () {
      this.$router.goBack()
    },
    singleCardClicked () {
    },
    areaCardClicked () {
    },
    deviceCardClicked () {
    },
    otherCardClicked () {
    }
  },
  mounted () {
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
    }
  }
</style>
