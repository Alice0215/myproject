<template>
  <q-layout id="success-page">
    <q-page-container>
      <q-page class="mt-12 text-center card">
        <q-icon name="check_circle" class="green-color mt-25" size="100px"/>
        <div class="success-text pv-15 font-20">完成</div>
        <div class="hint-text font-14 color-gray">3秒后自动跳转至详情页</div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
  export default {
    methods: {
      goToDetail () {
        console.log('Nobody tole me!')
      }
    },
    mounted () {
      setTimeout(() => {
        this.goToDetail()
      }, 3000)
    }
  }
</script>

<style lang="scss">
  #success-page {
    .green-color {
      color: #4DC600 !important;
    }
  }
</style>
