<template>
  <div class="card">
    <div class="full-width">
        <input text-dark required v-model="username" placeholder="项目名称" class="full-width login-input">
       
        <q-search icon="place" color="amber" v-model="address" class="login-input"  hide-underline placeholder="输入地址/定位地址"/>
        <q-input type="textarea" v-model="remark" hide-underline class="login-input" placeholder="项目简介"/>
        <q-item link class="full-width underline"  @click.native="$router.push('/project/alluser')">
            设置项目管理员
          <q-item-side right icon="keyboard_arrow_right" />
        </q-item>
        <q-item link class="full-width underline"  @click.native="$router.push('/project/alluser')">
            设置项目负责人
          <q-item-side right  icon="keyboard_arrow_right" />
        </q-item>
    </div>
    <q-btn class="full-width btn" @click="add()">创建项目</q-btn>
  </div>
</template>

<script>
    import { Dialog } from 'quasar'
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

            }
            
        }
    }
</script>

<style>
    .login-btn{
    width: 200px;
    }

    .underline{
        border-bottom: 1px solid #cccccc;
        margin-top: 20px;
    }

    .card {
        margin-bottom: 0px;
        padding: 30px 15px;
        min-height: 160px;
    }

    .login-input{
        border: 1px solid #eee;
        border-radius: 10px;
        padding: 10px 10px;
        margin-bottom: 25px;
    }
    a,a:hover,a:focus {
        text-decoration: underline;
        color: #1AAD19;
    }

    .btn{
    background-color: #1AAD19;
        color:white;
        margin-top: 30px;
        margin-bottom: 20px;
    }
  input:not(.no-style):hover{
      border-bottom: none;
  }
  .q-if-inner{
      min-height: 30px !important;
      padding-bottom: 10px;

  }
  .q-if-control.q-icon{
      padding-bottom: 6px;
  }

</style>
