<template>
  <div class="card">
      <q-search v-model="key_word"  placeholder="搜索" class="search" />
    <div class="full-width">
        <q-item link class="full-width underline">   
            设置项目负责人
        </q-item>
         <q-item  v-for="user in users"
          :key="user.userId"
          v-ripple.mat class="full-width underline">
            设置项目管理员
        </q-item>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                users: [],
                key_word:''
            }
        },
        mounted() {
            this.getUsers()
        },
        methods: {
            async getUsers(){
                this.$axios.get('api/user/account')
                 .then(response=>{
                    if(response.data.resultCode=="SUCCESS"){
                        this.users = response.data.resultMsg
                    }else{
                        console.log(response.data.resultMsg)
                       // this.$q.dialog({ title: '提示', message: response.data.resultMsg})
                    }
                  
                 })
            }
        }
    }
</script>

<style>
    .search{
        border: 1px solid #eee;
    }
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
  .q-if:before, .q-if:after{
      background: none;
  }
  .q-if-control.q-icon{
      padding-left: 36%;
  }

</style>
