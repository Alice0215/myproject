<template>
  <q-layout view="Hhh lpr Fff">
    <q-layout-header>
      <q-toolbar>
          <a @click="$router.goBack()" class="back-a font-14">
          <q-item-side left  icon="keyboard arrow left" class="back-left "/>
          返回
        </a>
        <q-toolbar-title class="header-title">
          添加二维码信息
        </q-toolbar-title>
         <q-item-side class="white-right" right/>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
    <q-page>
    <div class='full-width card' v-if="!addSuccess">
        <q-field @blur="$v.contactPerson.$touch"
        @keyup.enter="add"
        :error="$v.contactPerson.$error"
         error-label="请填写姓名">
        <q-input text-dark  v-model='contactPerson' placeholder='姓名' class='full-width login-input'/>
        </q-field>
         <q-field @blur="$v.contactNumber.$touch"
        @keyup.enter="add"
        :error="$v.contactNumber.$error"
         error-label="请核对您的联系方式">
       <q-input
        v-model="contactNumber" type="number"
        placeholder='联系方式' class=' full-width login-input'
      />
      </q-field>
         <q-field @blur="$v.amount.$touch"
        @keyup.enter="add"
        :error="$v.amount.$error"
         error-label="请填写申请二维码枚数">
        <q-input type="number" class="full-width login-input" v-model="amount" placeholder='输入申请二维码枚数'></q-input>
         </q-field>
        <q-btn class='full-width btn' @click='add()'>提交申请</q-btn>
    </div>
    <div v-if="addSuccess">
    <successPage></successPage>
    </div>
    </q-page>
  </q-page-container>
  </q-layout>
</template>

<script>
import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
import { request } from '../../common'
import successPage from '../success'
export default {
  data () {
    return {
      addSuccess: false,
      projectId: '',
      amount: '',
      contactNumber: '',
      contactPerson: ''
    }
  },
  components: {
    successPage
  },
  validations: {
    contactPerson: { required },
    contactNumber: { required, numeric, minLength: minLength(11), maxLength: maxLength(11) },
    amount: { required, numeric }
  },
  created () {
    this.projectId = this.$route.query.projectId
  },
  methods: {
    add () {
      this.$v.$touch()
      if (this.$v.$error) {
        return false
      }
      let data = {
        projectId: this.projectId,
        amount: this.amount,
        contactNumber: this.contactNumber,
        contactPerson: this.contactPerson
      }
      request('qrcode/batch', 'post', data, 'json', true).then(response => {
        if (response) {
          this.addSuccess = true
          setTimeout(() => {
            this.$router.goBack()
          }, 3000)
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
.q-if-inner {
  min-height: 30px !important;
  padding-bottom: 10px;
}
.q-if-control.q-icon {
  padding-bottom: 6px;
}
</style>
