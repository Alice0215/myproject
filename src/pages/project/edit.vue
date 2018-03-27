<template>

  <div>
    <q-toolbar class="header">
        <q-toolbar class="fix">
            <q-item-side left  icon="keyboard arrow left" @click="$router.go(-1)"/>
            <q-toolbar-title class="header-title">
            项目设置
            </q-toolbar-title>
       </q-toolbar>
    </q-toolbar>
    <div class="full-width card" >
        <input text-dark required v-model="projectName" class="full-width login-input">
        <q-search icon="place" color="amber" v-model="address" class="login-input"  hide-underline placeholder="输入地址/定位地址"/>
        <q-input type="textarea" v-model="projectDesc" hide-underline class="login-input" placeholder="项目简介"/>
        <q-item link class="full-width underline"  @click.native="$router.push('/project/alluser?type=1')">
            <q-item-side icon="group" />
            <q-item-main :label="`设置项目负责人`" />
            <q-item-side right icon="keyboard_arrow_right" />
        </q-item>
        <q-item link class="full-width underline"  @click.native="$router.push('/project/alluser?type=2')">
            <q-item-side icon="group" />
            <q-item-main :label="`设置项目参与者`" />
            <q-item-side right  icon="keyboard_arrow_right" />
        </q-item>
    </div>
    <q-btn class="full-width btn" @click="edit()">保存修改</q-btn>
  </div>
</template>

<script>
    import { Dialog } from 'quasar'
    import { request } from '../../common'
    export default {
        data() {
            return {
                projectId:'',
                projectName: '',
                projectDesc:'',
                address:'',
                TMlable:'设置项目负责人',
                TLlable:'设置项目参与者'
            }
        },
        created() {
            console.log(this.$router.params)
            
            //this.id = this.$router.params
             //this.getCompleteData()
        },
        mounted() {
            this.getInfo()
        },
        methods: {
            getInfo(){
                request('project/detail?projectId='+this.projectId, 'get','','json',true)
                .then(response => {
                    if(response.data.resultCode=="SUCCESS"){
                        console.log(response.data.resultMsg)
                       this.projectName = response.data.resultMsg.projectName
                        this.projectDesc = response.data.resultMsg.projectDesc
                       console.log(this.info)
                    }else{
                        console.log(response.data.resultMsg)
                        this.$q.dialog({
                            title: '提示',
                            message: response.data.resultMsg
                        })
                        //this.$router.go(-1)
                    }
                })
            },
            edit() {
                let data = {
                    projectName: this.projectName, 
                    projectDesc: this.projectDesc,
                    projectJobs: [{ "jobType":"TL", "userId":79}]
                }
                let params = new URLSearchParams()
                for (var key in data) {
                    params.append(key, data[key])
                }
                request('project/edit', 'put',params,'json',true)
                    .then(response => {
                        if(response.data.resultCode=="SUCCESS"){
                            this.$q.dialog({
                                title: '提示',
                                message: '项目修改成功！'
                            })
                            this.$router.go(-1)
                        }else{
                            this.$q.dialog({
                                title: '提示',
                                message: response.data.resultMsg.hint
                            })
                            this.$router.push('/login')
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
    .header,.fix{
        background-color: #F7F7F7 !important;
        padding: 0px;
        margin-bottom: 15px;
        text-align: center;
        font-size: 14px;
        color:#101010 !important;
    }
    .header-title{
        font-size: 15px;
        margin-right: 40px;
    }
    .fix{
        top: 0;
        border-bottom: 1px solid #DCDCDC;
        z-index: 100;
        position: fixed;
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
        padding: 5px 15px;
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
