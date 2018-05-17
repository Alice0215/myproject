<template>
  <q-layout id="stepper-plant" class="full-height" view="lHr lpr lfr">
    <q-layout-header>
      <q-toolbar class="nav-header">
        <q-item-side @click.native="back" left icon="keyboard arrow left" class="back-left">
          <label>返回</label>
        </q-item-side>
        <q-toolbar-title class="header-title">
          二维码
        </q-toolbar-title>
        <q-item-side class="no-info" right/>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <q-stepper ref="stepper" alternative-labels no-header-navigation class="full-width no-shadow"
                 v-model="currentStep"
                 color="primary">
        <q-step title="选择类型" icon="more_horiz" name="first">
        </q-step>
        <q-step default title="填写基本类型" icon="more_horiz" name="common">
          <common-step></common-step>
        </q-step>
        <q-step title="填写植物数据" icon="more_horiz" name="inpueData">
          <singleInfo></singleInfo>
        </q-step>
        <q-step title="完成" icon="more_horiz" name="done">
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

  export default {
    mixins: [
      addPlantMixin,
    ],
    components: {
      commonStep,
      singleInfo,
      successPage,
    },
    data () {
      return {
        currentStep: 'common',
        singleShow: false,
        areaShow: false,
      }
    },
    methods: {
      backConfirmClose (action, done) {
        done()
        if (action === 'confirm') {
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
    mounted () {
      this.singleShow = this.type === plantType.SINGLE
      this.areaShow = this.type === plantType.AREA
      this.$root.$on('next-step', () => {
        this.$refs.stepper.next()
      })
      this.$root.$on('pre-step', () => {
        this.$refs.stepper.previous()
      })
    },
    destroyed () {
      this.$root.$off('next-step')
      this.$root.$off('pre-step')
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
