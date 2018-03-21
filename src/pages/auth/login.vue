<template>
  <div class="card">
    <p>
      <img src="" class="log"/>
    </p>
    <div class="full-width">
        <input text-dark required v-model="username" placeholder="账号" class="full-width login-input">
        <input text-dark required v-model="password" placeholder="密码"  class="full-width login-input">
        <!--<i aria-hidden="true" class="q-icon q-if-control material-icons">visibility_off</i>-->
    </div>
    <q-btn class="full-width main-color-bg" @click="login()">登录</q-btn>
  </div>
</template>

<script>
const alerts = { color: 'tertiary', message: 'Woah! Danger! You are getting good at this!', icon: 'report_problem' }
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
              console.log(response)
              if(response.resultCode=="SUCCESS"){
                localStorage.setItem('token',response.data.resultMsg.userToken)
                this.$q.notify({
                    color:'secondary',
                    textColor:'',
                    icon:'tag_faces',
                    message: '登录成功，正在跳转中',
                    position:'center',
                    avatar:'',
                    actions: Math.random() * 100 > 50
                            ? [ { label: 'success', handler: () => this.$router.push('/post') } ]
                            : null,
                    timeout: Math.random() * 5000 + 3000
                })
              }else{
                this.$q.notify({
                    color:'tertiary',
                    textColor:'',
                    icon:'report_problem',
                    message: response.data.resultMsg,
                    position:'center',
                    avatar:'',
                    actions: Math.random() * 100 > 50
                            ? [ {handler: () => this.$router.push('/login') } ]
                            : null,
                    timeout: Math.random() * 5000 + 3000
                })
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
.login-btn{
  width: 200px;
}
.card {
      margin-bottom: 0px;
      padding: 30px 15px;
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
