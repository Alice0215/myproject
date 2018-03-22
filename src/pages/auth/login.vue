<template>
  <div class="card">
    <p>
      <img src="" class="log"/>
    </p>
    <div class="full-width">
        <q-input class="login-input"  v-model="username" placeholder="账号"/>
        <q-input type="password" class="login-input" autocomplete="current-password" v-model="password" placeholder="密码"/>
    </div>
    <q-btn class="full-width login-btn" @click="login()">登录</q-btn>
    <div class="left">
        <a href="javascript:">忘记密码？</a>
    </div>
    <div class="right">
        <span>没有账号?</span>
        <a href="javascript:" @click="register">现在注册</a>
    </div>
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
        }
        let params = new URLSearchParams()
        for (var key in data) {
            params.append(key, data[key])
        }
        this.$axios.post('api/user/login', data,{headers: {"Content-Type": "application/json"}})
          .then(response => {
              console.log(response)
              if(response.data.resultCode=="SUCCESS"){
                localStorage.setItem('token',response.data.resultMsg.userToken)
                /*this.$q.notify({
                    color:'secondary',
                    textColor:'',
                    icon:'tag_faces',
                    message: '登录成功，正在跳转中',
                    position:'center',
                    avatar:'',
                    actions: Math.random() * 100 > 50
                            ? [ { label: 'success', handler: () => this.$router.push('/') } ]
                            : null,
                    timeout: Math.random() * 5000 + 3000
                })*/
                this.$router.push('/')
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
.right{
    float: right;
}
.left{
    float: left;
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
      color: black;
  }
   a,a:hover {
      text-decoration: none;
      color: #1AAD19;
  }
  a:focus {
      text-decoration: none;
  }
  .login-btn{
      background-color: #1AAD19;
      color:white;
      margin-bottom: 20px;
  }
  input:not(.no-style):hover{
      border-bottom: none;
  }
  .q-if:before, .q-if:after{
      background: none;
  }
</style>
