<template>
  <q-layout id="stepper-plant">
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
      <q-stepper ref="stepper" alternative-labels class="full-width" v-model="currentStep" color="secondary">
        <q-step default title="选择类型" icon="more_horiz" name="first">
          <q-btn
            flat
            @click="$refs.stepper.previous()"
            label="Back"
          />
          <q-btn
            @click="$refs.stepper.next()"
            label="Next"
          />
        </q-step>
        <q-step title="填写基本类型" icon="more_horiz" name="common">
          <common-step></common-step>
        </q-step>
        <q-step title="填写植物数据" icon="more_horiz" name="inpueData">
          <singleInfo></singleInfo>
        </q-step>
        <q-step title="完成" icon="more_horiz" name="done">
          <q-btn
            flat
            @click="$refs.stepper.previous()"
            label="Back"
          />
          <q-btn
            @click="$refs.stepper.next()"
            label="Next"
          />
        </q-step>
      </q-stepper>
    </q-page-container>
  </q-layout>
</template>

<script>
  import commonStep from './commonStep1.vue'
  import singleInfo from './singlePlant/singlePlantInfo'

  export default {
    components: {
      commonStep,
      singleInfo
    },
    data () {
      return {
        currentStep: 'commom',
      }
    },
    methods: {
      back () {
        this.$router.goBack()
      },
    },
    mounted () {
      this.$root.$on('next-step', () => {
        this.$refs.stepper.next()
      })
    },
    beforeDestroy () {
//      this.$root.$off('next-step')
    }
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
  }
</style>
