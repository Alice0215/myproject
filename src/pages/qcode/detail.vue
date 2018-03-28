<template>
  <div>
    <q-toolbar class='header'>
        <q-toolbar class='fix'>
             <a @click="$router.go(-1)"><q-item-side left  icon='keyboard arrow left' class='reback'/>返回</a>
            <q-toolbar-title class='header-title'>
              二维码名称
            </q-toolbar-title>
            <a class="top-nav-right">历史记录</a>
       </q-toolbar>
    </q-toolbar>
    <div class='full-width card'>
    </div>
  </div>
</template>

<script>
import { request } from '../../common'
export default {
  data () {
    return {
      projectId: 1,
      amount: '',
      contactNumber: '',
      contactPerson: ''
    }
  },
  methods: {
    add () {
      let data = {
        projectId: this.projectId,
        amount: this.amount,
        contactNumber: this.contactNumber,
        contactPerson: this.contactPerson
      }
      request('qrcode/batch', 'post', data, 'json', true).then(response => {
        console.log(response)
        if (response.data.resultCode === 'SUCCESS') {
          this.$q.dialog({
            title: '提示',
            message: '项目添加成功！'
          })
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
.underline {
  border-bottom: 1px solid #cccccc;
  margin-top: 20px;
}

.card {
  margin-bottom: 0px;
  padding: 30px 15px;
  min-height: 160px;
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
