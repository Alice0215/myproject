<template>
    <q-layout view="Hhh lpr Fff">
      <q-layout-header>
        <q-toolbar>
           <a @click="back" class="back-a font-14">
            <q-item-side left  icon="keyboard arrow left" class="back-left "/>
            返回
          </a>
          <q-toolbar-title class="header-title">
            施工养护
          </q-toolbar-title>
          <q-item-side class="white-right" right/>
        </q-toolbar>
      </q-layout-header>
      <q-page-container>
      <q-page id="maintenace-page">
    <q-list>
       <q-field
         @blur="$v.jobs.$touch"
        @keyup.enter="operate"
        :error="$v.jobs.$error"
         error-label="请先选择工作内容">
          <q-item class="mt-6" @click.native="chooseJob">
            <q-item-side label class="font-14">工作内容选择</q-item-side>
            <q-item-main></q-item-main>
            <q-item-side right icon="keyboard_arrow_right" class="color-gray"></q-item-side>
          </q-item>
       </q-field>
      <q-item-separator class="mt-0 mb-0"/>
        <div class="bg-primary jobs-tags">
          <div class="m-5">
            <q-chip icon-right="close" color="white" text-color="lightGray" class="job-item" v-for="(item, index) in jobs" :key="index"  @click="remove(index)">
            {{item.name}}
            </q-chip>
          </div>
        </div>
    </q-list>
    <q-list class="mt-6 bg-white pb-8 row col-12 box pt-10 font-14 underline" >
      <q-list-header class="font-14 col-2 h-35 pt-10">备注</q-list-header>
      <q-input class="remark-field col-9 ml-8 p-8 text-left" v-model="form.description"  placeholder="输入内容" type="textarea" rows="6" hide-underline/>
    </q-list>
    <q-list class="mt-6 bg-white pb-8">
      <q-list-header class="font-14">现场拍照</q-list-header>
      <div class="row">
        <div class="w-100 h-100 ml-10" v-for="v, i in form.pictures" :key="i">
          <img :src="v.previewUrl"  preview-title-enable="false" :key="i" @click="imagePreview(i)" class="full-height full-width">
          <q-icon class="img-close" @click.native="cancelUploadImage(i)" color="grey" name="ion-close-circled"/>
        </div>
        <div class="w-100 h-100 ml-10">
          <q-btn icon="camera alt" size="35px" @click="openCamera" class="camera-button full-height full-width bg-primary"/>
        </div>
        <q-btn class="full-width btn no-radius font-14 " @click="operate()">{{title}}</q-btn>
      </div>
    </q-list>
      </q-page>
      </q-page-container>
  </q-layout>
</template>

<script>
import MaintenanceMixin from '../../mixin/MaintenanceMixin'
export default {
  mixins: [
    MaintenanceMixin
  ],
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss">
@import "../../assets/css/common";
#maintenace-page {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;

  .q-list {
    border: 0;
    padding: 0;
  }
  .no-radius {
    border-radius: 0px;
  }
  .q-item {
    background-color: white;
  }

  .q-item-side {
    color: black;
  }

  .remark-field {
    padding: 8px 10px;
    width: 96%;
    left: 2%;
    font-size: 14px;
    border-style: solid;
    border-width: 1px;
    border-color: lightgray;
    border: none;
  }
  .auto {
    min-width: auto;
  }
  .img-close {
    margin-left: 70px;
    margin-top: -195px;
    font-size: 28px;
  }
}
</style>
