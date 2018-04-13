<template>
  <div class="card" id="register">
    <div class="register-title">
        <span @click="partyregister()">个人注册</span>
        <span class="hover">机构注册</span>
    </div>
    <div class="full-width">
      <q-field  @blur="$v.form.partyName.$touch"
        @keyup.enter="submit"
        :error="$v.form.partyName.$error"
         error-label="机构名称为长度不超过45的必填项">
        <q-input v-model="form.partyName" placeholder="机构名称" class="login-input"
        />
      </q-field>
       <q-field  @blur="$v.form.username.$touch"
        @keyup.enter="submit"
        :error="$v.form.username.$error"
        error-label="请填写用户名">
      <q-input
        v-model="form.username"
        placeholder='用户名' class='login-input'
      />
       </q-field>
     <q-field  @blur="$v.form.fullname.$touch"
        @keyup.enter="submit"
        :error="$v.form.fullname.$error"
         error-label="请填写真实姓名">
      <q-input
        v-model="form.fullname"
        placeholder='真实姓名' class='login-input'
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
        v-model="form.phone" type="number"
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
    </div>
    <q-btn class="full-width main-color-bg input" @click="register()">注册</q-btn>
     <div class='login-field'>
          <span>已有账号？</span><a href="javascript:" @click="$router.push('/login')">立即登录</a>
      </div>
  </div>
</template>

<script>
import { request } from '../../common'
import { required, email, minLength, maxLength, sameAs, numeric } from 'vuelidate/lib/validators'
export default {
  mounted () {
    this.getPersonal()
  },
  data () {
    return {
      form: {
        username: '',
        fullname: '',
        email: '',
        phone: '',
        partyName: '',
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
      partyName: { required, maxLength: maxLength(45) },
      phone: { required, numeric, minLength: minLength(11), maxLength: maxLength(11) },
      password: { required, minLength: minLength(6), maxLength: maxLength(16) },
      password_confirmation: { required,
        sameAsPassword: sameAs('password') }
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    async getPersonal () {
      this.$axios.get('api/party/all').then(response => {
        this.organizations = response.data.resultMsg
      })
    },
    partyregister () {
      this.$router.push('/register')
    },
    register () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        return false
      }
      let deviceType = 1
      if (
        /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)
      ) {
        deviceType = 2
      }
      let data = {
        'partyName': this.form.partyName,
        'phone': this.form.phone,
        'username': this.form.username,
        'fullname': this.form.fullname,
        'email': this.form.email,
        'password': this.form.password,
        'deviceType': deviceType,
        'passwordVerify': this.form.password_confirmation
      }
      let params = new FormData()
      for (var key in data) {
        params.append(key, data[key])
      }
      request('party/register', 'post', params).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          this.$q.dialog({
            title: '提示',
            message: '注册成功'
          })
          return this.$router.push('/login')
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
        this.$router.push('/partyregister')
      })
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#register{
  .card {
  margin-bottom: 0px;
  padding: 30px 15px;
  min-height: 160px;
}
button {
  margin-bottom: 4%;
}
.login-field {
  text-align: center;
  margin-bottom: 40px;
}
h4 {
  font-weight: 300;
}
.input {
  background-color: #1aad19;
  color: white;
  margin-bottom: 20px;
  margin-top: 20px;
}
.main-color-bg {
  background-color: #1aad19;
  color: white;
}
input:not(.no-style):hover {
  border-bottom: none;
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
.log {
    text-align: center;
    margin-top: 30px;
  }
  a {
    font-size: 14px;
    display: inline-block !important;
    color: #1aad19 !important;
  }
}

</style>
