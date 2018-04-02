<template>
  <div class='card'>
    <div class='register-title'>
        <span class='hover'>个人注册</span>
        <span @click='partyregister()'>机构注册</span>
    </div>
    <div class='full-width'>
      <q-field  @blur="$v.form.username.$touch"
        @keyup.enter="submit"
        :error="$v.form.username.$error"
        error-label="请属于用户名">
      <q-input
        v-model="form.username"
        placeholder='用户名' class='login-input'
      />
      </q-field>
      <q-field  @blur="$v.form.fullname.$touch"
        @keyup.enter="submit"
        :error="$v.form.fullname.$error"
         error-label="请属于真实姓名">
      <q-input
        v-model="form.fullname"
        placeholder='真实姓名' class='login-input'
      />
      </q-field>
       <q-field  @blur="$v.form.partyId.$touch"
        @keyup.enter="submit"
        :error="$v.form.partyId.$error"
         error-label="请选择所属机构">
      <q-select v-model='form.partyId' :options='organizations'
        placeholder='所属机构'  class='login-input'
      />
       </q-field>
        <q-field @blur="$v.form.email.$touch"
        @keyup.enter="submit"
        :error="$v.form.email.$error"
         error-label="请核对您的邮箱信息">
      <q-input
        v-model="form.email"
        placeholder='邮箱' class=' login-input'
      />
        </q-field>
         <q-field   @blur="$v.form.phone.$touch"
        @keyup.enter="submit"
        :error="$v.form.phone.$error"
         error-label="请核对您的手机号">
       <q-input
        v-model="form.phone"
        placeholder='手机号' class=' login-input'
      />
      </q-field>
      <q-field
         @blur="$v.form.password.$touch"
        @keyup.enter="submit"
        :error="$v.form.password.$error"
         error-label="密码为6位到16位的必填项">
      <q-input
       v-model="form.password"
        placeholder='密码' class=' login-input' type='password'
      />
       </q-field>
       <q-field  @blur="$v.form.password_confirmation.$touch"
        @keyup.enter="submit"
        :error="$v.form.password_confirmation.$error"
         error-label="两次输入密码不一致">
      <q-input
        v-model="form.password_confirmation"
        placeholder='确认密码' class=' login-input' type='password'
      />
       </q-field>
      <q-btn class='full-width input' @click='submit()'>注册</q-btn>
      <div class='login-field'>
          <span>已有账号？</span><a href="javascript:" @click="$router.push('/login')">立即登录</a>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import { request } from '../../common'
export default {
  data () {
    return {
      organizations: [],
      form: {
        username: '',
        fullname: '',
        email: '',
        phone: '',
        partyId: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  validations: {
    form: {
      username: { required },
      fullname: { required },
      email: { required, email },
      partyId: { required },
      phone: { required },
      password: { required, minLength: minLength(6), maxLength: maxLength(16) },
      password_confirmation: { required,
        sameAsPassword: sameAs('password') }
    }
  },
  mounted () {
    this.getparty()
  },
  methods: {
    submit () {
      this.$v.form.$touch()

      if (this.$v.form.$error) {
        return false
      }
      if (!/^(\w){6,20}$/.test(this.$v.form.phone)) {
        this.$q.notify('请输入正确的手机号')
        return false
      }
      let deviceType = 1
      if (
        /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)
      ) {
        deviceType = 2
      }
      let data = {
        username: this.form.username,
        fullname: this.form.fullname,
        email: this.form.email,
        password: this.form.password,
        partyId: this.form.partyId,
        phone: this.form.phone,
        deviceType: deviceType,
        passwordVerify: this.form.password_confirmation
      }
      let params = new FormData()
      for (var key in data) {
        params.append(key, data[key])
      }
      request('user/register', 'post', params)
        .then(response => {
          if (response.data.resultCode === 'SUCCESS') {
            this.$q.dialog({
              title: '提示',
              message: '注册成功'
            })
            this.$router.push('/')
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
            this.$router.push('/register')
          }
        })
        .catch(e => {
          console.log('Error', e.response.data.message)
        })
    },
    login () {
      this.$router.push('/login')
    },
    async getparty () {
      this.$axios.get('api/party/all').then(response => {
        for (var key in response.data.resultMsg) {
          this.organizations.push({
            label: response.data.resultMsg[key]['partyName'],
            value: response.data.resultMsg[key]['id']
          })
        }
      })
    },
    partyregister () {
      this.$router.push('/partyregister')
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
.card {
  margin-bottom: 0px;
  padding: 30px 15px;
  min-height: 160px;
}

.register-title {
  height: 80px;
  line-height: 80px;
  text-align: center;
  width: 100%;
  color: black;
  font-size: 20px;
}
.register-title span {
  margin-right: 50px;
}
.input {
  background-color: #1aad19;
  color: white;
  margin-bottom: 20px;
  margin-top: 20px;
}
.login-field {
  text-align: center;
  margin-bottom: 40px;
}
a {
  font-size: 14px;
  display: inline-block !important;
  color: #1aad19 !important;
}
</style>
