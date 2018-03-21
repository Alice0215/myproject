<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/quasar-logo-full.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
  <div class="full-width">
    <input text-dark required v-model="username" placeholder="账号" class="full-width login-input">
    <input text-dark required v-model="password" placeholder="密码"  class="full-width login-input">
  </div>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >注册</q-btn>
  </div>
</template>
