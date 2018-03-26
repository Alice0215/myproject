<template>
  
  <div class="main">
   <div class="backTo" v-show="isShow">
        <q-item-side left  icon="keyboard arrow left" />
        <span v-on:click="back">返回</span>
    </div>
    <div class="search-field">
        <q-search v-model="key_word"  placeholder="搜索" class="btn" />
    </div>
    <div class="full-width">

         <q-item  v-for="user in users"
          :key="user.userId"
          v-ripple.mat class="full-width underline user-item">
            <q-item-side icon="account circle" class="user"/>
            <q-item-main :label="user.fullname" /> 
            <q-item-side right icon="done" v-show="isShow" /> 
        </q-item>

    </div>
  </div>
</template>

<script>
    import { request } from '../../common'
    import { Dialog } from 'quasar'
    export default {
        data() {
            return {
                users: [],
                key_word:'',
                isShow:true
            }
        },
        mounted() {
            this.getUsers()
        },
        methods: {
            async getUsers(){
                request('user/all', 'get')
                .then(response=>{
                if(response.data.resultCode=="SUCCESS"){
                    this.users = response.data.resultMsg
                }else{
                    console.log(response.data.resultMsg)
                }
                
                })
            },
            back(){
                this.$router.go(-1);//返回上一层
            },
            //头部返回 $router.push('/path/to')
            addUser(){

            }

        }
    }
</script>

<style>
    .user-item:hover{
        background: none;
    }
    .search-field{
        background: #cccccc;
        height: 50px;
    }
    .search-field .btn{
        background-color: white;
        text-align: center;
        width: 96%;
        margin-left: 2%;
    }
    .header{
        position: fixed;
    }
    .login-btn{
        width: 200px;
    }
    .user{
        min-width: auto;
    }
    .underline{
        border-bottom: 1px solid #cccccc;
    }

    .card {
        margin-bottom: 0px;
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

</style>
