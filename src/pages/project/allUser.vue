<template>
  
  <div class="main">
    <q-toolbar class="header">
    <q-toolbar class="fix">
        <q-toolbar-title class="header-title"> 
        项目负责人
        </q-toolbar-title>
    </q-toolbar>
    </q-toolbar>
    <!--<div class="search-field">
        <q-search v-model="key_word"  placeholder="搜索" class="btn" />
    </div>-->
    <div class="full-width">
        <div  v-for="user in users"
          :key="user.userId"  @click="addUser(user.fullname,user.userId)">
         <q-item  v-ripple.mat class="full-width underline user-item">
            <q-item-side icon="account circle" class="user"/>
            <q-item-main :label="user.fullname" /> 
            <q-item-side right icon="done" v-show="isShow" /> 
        </q-item>
        </div>
    </div>
  </div>
</template>

<script>
    import {mapState} from 'vuex';
    import { request } from '../../common'
    import { Dialog } from 'quasar'
    import eventBus from '../../eventBus'
    export default {
        data() {
            return {
                users: [],
                key_word:'',
                isShow:false
            }
        },
        mounted() {
            this.getUsers()
        },
        computed:mapState({
                count:state=>state.count  //理解为传入state对象，修改state.count属性
        }),
        methods: {
            async getUsers(){
                console.log(eventBus.$on('event_name'))
                request('user/all', 'get')
                .then(response=>{
                    if(response.data.resultCode=="SUCCESS"){
                        this.users = response.data.resultMsg
                    }else{
                        console.log(response.data.resultMsg)
                    }
                })
            },
            addUser(fullname,userId){
                eventBus.$emit('users',  {"fullname":fullname,"userId":userId})
                //this.$store.commit('chooseUser', {"fullname":fullname,"userId":userId})
                this.$router.go(-1)
            }

        }
    }
</script>

<style>
    .header,.fix{
        background-color: #F7F7F7 !important;
        padding: 0px;
        margin-bottom: 15px;
    
    }
    .fix{
        text-align: center;
        font-size: 14px;
        color:#101010 !important;
        border-bottom: 1px solid #DCDCDC;
        top: 0;
        z-index: 100;
        position: fixed;
    }

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
