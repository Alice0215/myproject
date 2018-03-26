<template>
  <div class="card">
    <div class="register-title">
        <span class="hover">个人注册</span>
        <span @click="partyregister()">机构注册</span>
    </div>
    <div class="full-width">
        <input text-dark required v-model="username" placeholder="用户名" class="full-width login-input">
        <input text-dark required v-model="name" placeholder="真实姓名" class="full-width login-input">
        <q-select v-model="partyName" :options="organizations" placeholder="所属机构"  class="login-input"/>
        <input text-dark required v-model="email" placeholder="邮箱" class="full-width login-input">
        <input text-dark required v-model="phone" placeholder="手机号" class="full-width login-input">
        <q-input type="password" class="login-input" autocomplete="current-password" v-model="password" placeholder="密码"/>
        <q-input type="password" class="login-input" autocomplete="password_confirmation" v-model="password_confirmation" placeholder="确认密码"/>
    </div>
    <q-btn class="full-width input" @click="register()">注册</q-btn>
    <div class="login-field">
        <span>已有账号？</span><a @click="$router.push('/login')">立即登录</a>
    </div>
  </div>
</template>

<script>
    import { request } from '../../common'
    import { required, email, minLength, between  } from 'vuelidate/lib/validators'
    import { Dialog } from 'quasar'
    export default {
        mounted() {
            this.getparty()
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
                organizations: [],
                rules: {
                    username: [{required: true, message: '请填写用户名'}],
                    fullname: [{required: true, message: '请填写真实姓名'}],
                    partyId: [{required: true, message: '请选择机构'}],
                    email: [{required: true, message: '请填写邮箱'},
                        {pattern: /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+\.){1,63}[a-zA-Z0-9]+$/,
                        message: '输入正确的邮箱'}],
                    phone: [{required: true, message: '请填写手机号'},
                        {pattern: /^\d{11}$/, message: '输入正确的手机号'}],
                    password: [{required: true, message: '请设置密码'}],
                    passwordVerify: [{required: true, message: '请确认密码'}]
                },
            }
        },
        methods: {
            login() {
                this.$router.push('/login')
            },
            async getparty(){
                this.$axios.get('api/party/all')
                 .then(response=>{
                    for (var key in response.data.resultMsg) {
                        this.organizations.push({label: response.data.resultMsg[key]['partyName'], value: response.data.resultMsg[key]['id']})
                    } 
                 })
            },
            partyregister () {
                this.$router.push('/partyregister')
            },
            register() {
                /*this.$v.form.$touch()
                if (this.$v.form.$error) {
                    this.$q.notify('Please review fields again.')
                    return
                }*/
                let deviceType = 1
                if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
                    deviceType = 2
                }
                let data = {
                    username: this.username, 
                    fullname: this.name,
                    email: this.email,
                    password: this.password,
                    partyId: 79,
                    phone: this.phone,
                    deviceType: deviceType,
                    passwordVerify: this.password_confirmation
                }
                const params = new FormData()
                for (var key in data) {
                    params.append(key, data[key])
                }
                request('user/register', 'post', params)
                    .then(response => {
                        if(response.data.resultCode=="SUCCESS"){
                            this.$q.dialog({
                                title: '提示',
                                message: '注册成功'
                            })
                             this.$router.push('/')

                        }else{
                            this.$q.dialog({
                                title: '提示',
                                message: response.data.resultMsg
                            })
                             this.$router.push('/register')
                        }
                      
                    })
                    .catch(e => {
                        console.log('Error', e.response.data.message);
                    })
            }
        }
    }
</script>

<style>
 .q-if:before, .q-if:after{
      background: none;
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
    a,a:hover {
        text-decoration: none;
        color: #1AAD19;
    }
    .register-title span{margin-right: 50px}
    .input{
      background-color: #1AAD19;
      color:white;
      margin-bottom: 20px;
    }
    .login-field{
        text-align: center;
        margin-bottom: 40px;
    }
</style>
