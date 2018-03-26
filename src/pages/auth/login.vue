<template>
  <div class="card">
    <p class="log">
      <img src="statics/logo.png"/>
    </p>
    <div class="full-width">
        <q-input class="login-input"  v-model="username" placeholder="账号" />
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
import { Dialog } from 'quasar'
import { request } from '../../common'
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
    mounted (){ 
        this.username = localStorage.getItem('username')
    },
    login () {
        let deviceType = 1
        if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
            deviceType = 2
        }
        localStorage.setItem('username', this.username)
        let data = {
            username : this.username,
            password : this.password,
            deviceType : deviceType,
        }
        let params = new URLSearchParams()
        for (var key in data) {
            params.append(key, data[key])
        }
        request('user/login', 'post', {
          'userToken': '',
          'password': this.password,
          'username': this.username
        })
        .then(response => {
           if(response.data.resultCode=="SUCCESS"){
                localStorage.setItem('token',response.data.resultMsg.userToken)
                localStorage.setItem('user', JSON.stringify(response.data.resultMsg))
                this.$q.dialog({
                    title: '提示',
                    message: '登录成功！'
                })
                this.$router.push('/')
            }else{
                this.$q.dialog({
                    title: '提示',
                    message: response.data.resultMsg
                })
                this.$router.push('/login')
            }
        })
    }
  }
}
</script>

<style lang="scss">
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
  .log{
      text-align: center;
  }
</style>
