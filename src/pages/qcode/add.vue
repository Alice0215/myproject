<template>
  <div>
    <q-toolbar class="header">
        <q-toolbar class="fix">
            <q-item-side left  icon="keyboard arrow left" @click="$router.go(-1)" class="reback"/>返回
            <q-toolbar-title class="header-title">
           填写信息
            </q-toolbar-title>
       </q-toolbar>
    </q-toolbar>  
    <div class="full-width card">
        <input text-dark required v-model="contactPerson" placeholder="姓名" class="full-width login-input">
        <input text-dark required v-model="contactNumber" placeholder="联系方式" class="full-width login-input">
        <input text-dark required v-model="amount" placeholder="输入申请二维码枚数" class="full-width login-input">
    </div>
    <q-btn class="full-width btn" @click="add()">提交申请</q-btn>
  </div>
</template>

<script>
    import { Dialog } from 'quasar'
    import { request } from '../../common'
    export default {
        data() {
            return {
                projectId:1,
                amount:'',
                contactNumber: '',
                contactPerson:''
            }
        },
        methods: {
            add() {
                let data = {
                    projectId: this.projectId, 
                    amount: this.amount,
                    contactNumber: this.contactNumber,
                    contactPerson: this.contactPerson,
                }
                request('qrcode/batch', 'post',data,'json',true) 
                    .then(response => {
                        console.log(response)
                        if(response.data.resultCode=="SUCCESS"){
                            this.$q.dialog({
                                title: '提示',
                                message: '项目添加成功！'
                            })
                        }else{
                            this.$q.dialog({
                                title: '提示',
                                message: response.data.resultMsg.hint
                            })
                        }
                    })
            },
            chooseUser(jobType){
                this.formData.jobType = jobType
                eventBus.$emit('event_name', 'some message')
                this.$router.push('allUser')
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
    .reback{
        min-width: auto !important;
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
        margin-bottom: 20px;
        height: 50px;
        line-height: 50px;
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
