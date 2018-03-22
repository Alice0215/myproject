<template>
  <div class="card">
    <div class="full-width">
        <input text-dark required v-model="username" placeholder="项目名称" class="full-width login-input">
        <input text-dark required v-model="name" placeholder="输入地址" class="full-width login-input">
        <input text-dark required v-model="email" placeholder="项目简介" class="full-width login-input">
        <q-search icon="place" color="amber" v-model="address" class="login-input"  hide-underline placeholder="输入地址/定位地址"/>
        <q-field :count="60">
            <q-input type="textarea" v-model="remark" hide-underline class="login-input" />
        </q-field>
       <!-- <p class="full-width" @click="$router.push('/adduser')">设置项目管理员</p>
        <p class="full-width" @click="$router.push('/adduser')">设置项目负责人</p>-->
    </div>
    <q-btn class="full-width main-color-bg" @click="add()">创建项目</q-btn>
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
                address:'',
                remark:''
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
                this.$router.push('/partyregister')
            },
            add() {
                let deviceType = 1
                if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
                    deviceType = 2
                }
                let data = {
                    username: this.username, 
                    fullname: this.name,
                    email: this.email,
                    password: this.password,
                    partyId: this.partyName,
                    phone: this.phone,
                    deviceType: deviceType,
                    passwordVerify: this.password_confirmation,
                    search: '',
                    number: ''
                }
                let params = new URLSearchParams()
                for (var key in data) {
                    params.append(key, data[key])
                }
                this.$axios.post('api/user/register', params)
                    .then(response => {
                        console.log(response)
                        this.$router.push('/post')
                    })
                    .catch(e => {
                        console.log('Error', e.response.data.message);
                    })
            },
            onChange (val) {
                console.log('@change', JSON.stringify(val))
            },
            onInput (val) {
                console.log('@input', JSON.stringify(val))
            },
            onClear (val) {
                console.log('@clear', JSON.stringify(val))
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
