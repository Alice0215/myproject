<template>
  <div class="card">
    <div class="full-width">
        <input text-dark required v-model="projectName" placeholder="项目名称" class="full-width login-input">
       
        <q-search icon="place" color="amber" v-model="address" class="login-input"  hide-underline placeholder="输入地址/定位地址"/>
        <q-input type="textarea" v-model="projectJobs" hide-underline class="login-input" placeholder="项目简介"/>
        <q-item link class="full-width underline"  @click.native="$router.push('/project/alluser?type=1')">
            <q-item-side icon="group" />
            <q-item-main :label="`选择项目管理员`" />
            <q-item-side right icon="keyboard_arrow_right" />
        </q-item>
        <q-item link class="full-width underline"  @click.native="$router.push('/project/alluser?type=2')">
            <q-item-side icon="group" />
            <q-item-main :label="`选择项目管理员`" />
            <q-item-side right  icon="keyboard_arrow_right" />
        </q-item>
    </div>
    <q-btn class="full-width btn" @click="add()">创建项目</q-btn>
  </div>
</template>

<script>
    import { Dialog } from 'quasar'
    import { request } from '../../common'
    export default {
        data() {
            return {
                projectName: '',
                projectDesc:'',
                projectJobs: '',
                address:''
            }
        },
        methods: {

            partyregister () {
                this.$router.push('/partyregister')
            },

            add() {

                let data = {
                    projectName: this.projectName, 
                    projectDesc: this.projectDesc,
                    projectJobs: [{ "jobType":"TL", "userId":79}]
                }
                let params = new URLSearchParams()
                for (var key in data) {
                    params.append(key, data[key])
                }
                request('project/create', 'post',params,'json',true)
                    .then(response => {
                        if(response.data.resultCode=="SUCCESS"){
                            localStorage.setItem('token',response.data.resultMsg.userToken)
                            localStorage.setItem('user', JSON.stringify(response.data.resultMsg))
                            this.$q.dialog({
                                title: '提示',
                                message: '项目添加成功！'
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
