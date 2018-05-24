/*
url参数：
  *id: 二维码id
  type: 二维码类型，选择二维码类型页面传递的
*/


<template>
  <q-layout id="stepper-plant" class="full-height" view="lHr lpr lfr">
    <q-layout-header>
      <q-toolbar class="nav-header">
        <q-item-side @click.native="back" left icon="keyboard arrow left" class="back-left">
          <label>返回</label>
        </q-item-side>
        <q-toolbar-title class="header-title">
          {{ headerTitle }}
        </q-toolbar-title>
        <q-item-side class="no-info" right/>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <q-stepper ref="stepper" alternative-labels no-header-navigation class="full-width no-shadow"
                 v-model="currentStep"
                 color="primary">
        <q-step title="选择类型" icon="more_horiz" name="first" :order="1">
        </q-step>
        <q-step default title="填写基本类型" icon="more_horiz" name="common" :order="2">
          <common-step v-if="headerTitle.length>0"></common-step>
        </q-step>
        <q-step v-if="singleShow||areaShow" :title="title" icon="more_horiz" name="inpueData" :order="3">
          <singleInfo v-if="singleShow"></singleInfo>
          <areaInfo v-if="areaShow"></areaInfo>
        </q-step>
        <q-step title="完成" icon="more_horiz" name="done" :order="4">
          <successPage></successPage>
        </q-step>
      </q-stepper>
    </q-page-container>
  </q-layout>
</template>

<script>
  import commonStep from './commonStep1.vue'
  import singleInfo from './singlePlant/singlePlantInfo'
  import successPage from '../success'
  import areaInfo from './areaPlant/areaPlantInfo'
  import { plantType } from '../../const'
  import addPlantMixin from '../../mixin/addPlantMixin'
  import { request } from "../../common";

  export default {
    mixins: [
      addPlantMixin
    ],
    components: {
      commonStep,
      singleInfo,
      successPage,
      areaInfo,
    },
    data () {
      return {  
        title: null,
        currentStep: 'common',
        singleShow: false,
        areaShow: false,
        headerTitle: ''
      }
    },
    methods: {
      async init(){   
        console.log("stepperPlant.init")    

        if(!this.qrCodeForm){
          this.$q.loading.show()
          const resp = await request('qrcode/detail?qrCodeId=' + this.qrCodeId, 'get', null, 'json', true)
          this.$q.loading.hide()
          if (resp) {          
            console.log("stepperPlant.init="+resp)    
            let type = resp.data.resultMsg.type
            this.qrCodeForm = resp.data.resultMsg
            if(type) {
              if(type.key === plantType.SINGLE) {
                this.singleForm = resp.data.resultMsg
                this.qrCodeForm = resp.data.resultMsg.code
              } else if(type.key === plantType.AREA) {
                this.areaForm = resp.data.resultMsg   
                this.qrCodeForm = resp.data.resultMsg.code    
              }
            }
          }
        }        

        if(this.qrCodeForm.type){          
          this.type = this.qrCodeForm.type.key
          console.log(this.type)
        } else {
          this.type = this.$route.query.type
        }      

        if(this.type === plantType.AREA){
          this.areaShow = true
          this.title = '填写片区信息'
          this.headerTitle = '片区类型'
        } else if(this.type === plantType.SINGLE){
          this.singleShow = true
          this.title = '填写单株信息'   
          this.headerTitle = '单株类型'   
        } else if(this.type === plantType.DEVICE){
          this.headerTitle = '设备类型'   
        } else if(this.type === plantType.OTHER){
          this.headerTitle = '其他类型'   
        }

      },
      backConfirmClose (action, done) {
        done()
        if (action === 'confirm') {
          this.clearInfo()
          this.$router.goBack()
        }
      },
      back () {
        this.$dialog.confirm({
          title: '取消输入',
          message: '点击确定将不会保存所填写信息，您确定取消填写吗？',
          showCancelButton: true,
          cancelButtonText: '返回',
          beforeClose: this.backConfirmClose,
        })
      },
    },
    async mounted () {  
      this.qrCodeId = this.$route.query.id
      console.log("stepperPlant.qrCodeId=" + this.qrCodeId )
      await this.init()

      this.$root.$on('next-step', () => {
        this.$refs.stepper.next()
      })
      this.$root.$on('pre-step', () => {
        this.$refs.stepper.previous()
      })
      this.$root.$on('last-pre', () => {
        this.back()
      })
    },
    destroyed () {
      this.$root.$off('next-step')
      this.$root.$off('pre-step')
      this.$root.$off('last-pre')
    },
  }
</script>

<style lang="scss">
  #stepper-plant {

    .q-stepper-step-inner {
      padding: 0 !important;

    }

    .q-stepper-tab {
      width: 20% !important;
      padding-left: 4px !important;
      padding-right: 4px !important;
    }

    .q-stepper-title {
      color: #666666;
    }

  }
</style>
