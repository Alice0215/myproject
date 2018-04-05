<template>
  <div class='card' id="login">
    <p class='log'>
      <img src='statics/logo.png'/>
    </p>
    <div class='full-width'>
        <q-input class='login-input'  v-model='username' placeholder='账号' />
        <q-input type='password' class='login-input' autocomplete='current-password' v-model='password' placeholder='密码'/>
    </div>
    <q-btn class='full-width login-btn' @click='login()'>登录</q-btn>
    <div class='float-left'>
        <a href='javascript:'>忘记密码？</a>
    </div>
    <div class='float-right'>
        <span>没有账号?</span>
        <a href='javascript:' @click='register'>现在注册</a>
    </div>
  </div>
</template>

<script>
import { request } from '../../common'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  watch: {
    username (v) {
      localStorage.setItem('username', v)
    }
  },
  methods: {
    register () {
      this.$router.push('/register')
    },

    login () {
      let deviceType = 1
      if (
        /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)
      ) {
        deviceType = 2
      }
      localStorage.setItem('username', this.username)
      let data = {
        username: this.username,
        password: this.password,
        deviceType: deviceType
      }
      if (this.password === '' || this.username === '') {
        this.$q.dialog({
          title: '提示',
          message: '请输入您的账号和密码！'
        })
        return false
      }
      let params = new URLSearchParams()
      for (var key in data) {
        params.append(key, data[key])
      }
      request(
        'user/login',
        'post',
        {
          userToken: '',
          password: this.password,
          username: this.username
        },
        'json',
        true
      ).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          localStorage.setItem('user', JSON.stringify(response.data.resultMsg))
          localStorage.setItem('token', response.data.resultMsg.userToken)
          localStorage.setItem('partyId', response.data.resultMsg.partyId)
          this.$router.push('/')
          this.$q.dialog({
            title: '提示',
            message: '登录成功！'
          })
        } else {
          if (response.data.resultCode === 'ERROR') {
            this.$q.dialog({
              title: '提示',
              message: response.data.resultMsg.hint
            })
          } else {
            this.$q.dialog({
              title: '提示',
              message: response.data.resultMsg
            })
          }
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#login{
  .log {
    text-align: center;
    margin-top: 30px;
  }
  a {
    font-size: 14px;
    display: inline-block !important;
    color: #1aad19 !important;
  }

}

</style>
