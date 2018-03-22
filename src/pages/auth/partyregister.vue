<template>
  <div class="card">
    <div class="register-title">
        <span @click="partyregister()">个人注册</span>
        <span class="hover">机构注册</span>
    </div>
    <div class="full-width">
        <input text-dark required v-model="partyName" placeholder="机构名称" class="full-width login-input">
        <input text-dark required v-model="username" placeholder="用户名" class="full-width login-input">
        <input text-dark required v-model="name" placeholder="真实姓名" class="full-width login-input">
        <input text-dark required v-model="email" placeholder="邮箱" class="full-width login-input">
        <input text-dark required v-model="phone" placeholder="手机号" class="full-width login-input">
        <input type="password" required v-model="password" placeholder="密码"  class="full-width login-input">
        <input type="password" required v-model="password_confirmation" placeholder="确认密码"  class="full-width login-input">
    </div>
    <q-btn class="full-width main-color-bg" @click="register()">注册</q-btn>
  </div>
</template>

<script>
    export default {
        mounted() {
            this.getPersonal()
        },
        data() {
            return {
                name: '',
                username:'',
                email: '',
                password: '',
                phone:'',
                partyName:'',
                password_confirmation: '',
                organizations: []
            }
        },
        methods: {
            login() {
                this.$router.push('/login')
            },
            async getPersonal(){
                this.$axios.get('api/party/all')
                 .then(response=>{
                    this.organizations = response.data.resultMsg
                 })
            },
            partyregister () {
                this.$router.push('/register')
            },
            register() {
                let deviceType = 1
                if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
                    deviceType = 2
                }
                var data = {
                    partyName: this.partyName,
                    phone: this.phone,
                    username: this.username,
                    fullname: this.name,
                    email: this.email,
                    password: this.password,
                    passwordVerify: this.password,
                    deviceType: deviceType,
                    passwordVerify: this.password_confirmation
                }
                let params = new URLSearchParams()
                for (var key in data) {
                    params.append(key, data[key])
                }
                this.$axios.post('api/party/register', params)
                    .then(response => {
                        console.log(response)
                        this.$router.push('/login')
                    })
                    .catch(e => {
                        console.log('Error', e.response.data.message);
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
   .hover{
        padding-bottom: 10px;
        border-bottom: solid 2px #1AAD19;
        font-weight: bold;
    }
    .register-title{
        height: 80px;
        line-height: 80px;
        text-align: center;
        width: 100%;
        color: black;
        font-size: 20px;
    }
    .register-title span{margin-right: 50px}
    .select{
        border: 1px solid #eee;
        border-radius: 10px;
        padding: 10px 15px;
        margin-bottom: 25px;
    }
</style>
