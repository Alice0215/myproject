<template>
  <q-modal v-model="selectYear" :content-css="{minWidth: '100vw', minHeight: '253px'}" position="bottom">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-item-side v-close-overlay class="font-14 text-main-color">取消</q-item-side>
        <q-toolbar-title class="header-title">
          添加成员
        </q-toolbar-title>
        <q-item-side v-close-overlay class="font-14 text-main-color"></q-item-side>
      </q-toolbar>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import eventBus from '../../eventBus'
  import { requestAdmin } from '../../common'

  export default {
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

<style>
</style>
