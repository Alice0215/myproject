<template>
  <div>
    <q-toolbar class='header'>
        <q-toolbar class='fix'>
             <a @click="$router.goBack()"><q-item-side left  icon='keyboard arrow left' @click='$router.goBack()' class='reback'/></a>
            <q-toolbar-title class='header-title'>
              填写信息
            </q-toolbar-title>
             <q-item-side right/>
       </q-toolbar>
    </q-toolbar>
    <div class='full-width card'>
        <input text-dark required v-model='contactPerson' placeholder='姓名' class='full-width login-input'>
        <q-input text-dark required v-model="contactNumber" placeholder="联系方式" class="full-width login-input"/>
        <q-input type="number" class="full-width login-input" v-model="amount" placeholder='输入申请二维码枚数'></q-input>
    </div>
    <q-btn class='full-width btn' @click='add()'>提交申请</q-btn>
  </div>
</template>

<script>
import { request } from '../../common'
export default {
  data () {
    return {
      projectId: '',
      amount: '',
      contactNumber: '',
      contactPerson: ''
    }
  },
  created () {
    this.projectId = this.$route.query.projectId
  },
  methods: {
    add () {
      if (!(/^\d{11}$/.test(this.contactNumber))) {
        this.$q.dialog({
          title: '提示',
          message: '请输入正确的联系方式'
        })
        return false
      }
      let data = {
        projectId: this.projectId,
        amount: this.amount,
        contactNumber: this.contactNumber,
        contactPerson: this.contactPerson
      }
      request('qrcode/batch', 'post', data, 'json', true).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          this.$q.dialog({
            title: '提示',
            message: '添加成功！'
          })
          this.$router.push('/qcode/list?projectId=' + this.projectId)
        } else {
          if (response.data.resultCode === 'ERROR') {
            this.$q.dialog({
              title: '提示',
              message: response.data.resultMsg.hint
            })
          } else {
            this.$q.dialog({
              title: '提示',
              message: response.data.resultMsg
            })
          }
        }
      })
    },
    chooseUser (jobType) {
      this.formData.jobType = jobType
      this.$router.push('allUser')
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
.reback {
  min-width: auto !important;
}
.header-title {
  margin-right: 30px;
}
input:not(.no-style):hover {
  border-bottom: none;
}
.q-if-inner {
  min-height: 30px !important;
  padding-bottom: 10px;
}
.q-if-control.q-icon {
  padding-bottom: 6px;
}
</style>
