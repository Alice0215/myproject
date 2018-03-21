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
      class="login-btn main-color-bg"
       @click="login()"
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
  },
  methods: {
    register () {
        this.$router.push('/register')
    },
    login () {
        let deviceType = 1
        if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
            deviceType = 2
        }
        let data = {
            username : this.username,
            password : this.password,
            deviceType : deviceType,
            deviceBrand: 'HW',
            pushDeviceId: 1
        }
        this.$axios.post('api/user/login', data)
          .then(response => {
              if(response.resultCode="SUCCESS"){
                 console.log(response)
                 this.$auth.setToken(response.data.resultMsg.userToken)
                 this.$router.push('/post')
              }else{
                alert(response.data.resultMsg)
              }
             
          })
          .catch(e => {
              console.log('Error', e.message);
          })
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
.card {
      margin-bottom: 0px;
  }
  .card-content {
      min-height: 160px;
  }
  .login-input{
      border: 1px solid #eee;
      border-radius: 10px;
      padding: 10px 20px;
      margin-bottom: 25px;
  }
  button {
      margin-bottom: 4%;
  }
  h4 {
      font-weight: 300;
  }
  a {
      font-size: 14px;
  }
  a:hover {
      text-decoration: underline;
      color: #1AAD19;
  }
  a:focus {
      text-decoration: none;
  }
  .main-color-bg{
      background-color: #1AAD19;
      color:white;
  }
  input:not(.no-style):hover{
      border-bottom: none;
  }
</style>
