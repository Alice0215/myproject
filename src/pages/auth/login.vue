<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/quasar-logo-full.svg"
        class="log"
      >
    </p>
  <div class="full-width">
    <input text-dark required v-model="username" placeholder="账号" class="full-width login-input">
    <input text-dark required v-model="password" placeholder="密码"  class="full-width login-input">
  </div>
    <q-btn
      color="secondary"
      class="login-btn"
      @click="$router.push('/')"
    >登录</q-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style>
.log{
  width: 30px;
  max-width: 150px;
}
.login-btn{
  width: 200px;
}
</style>
