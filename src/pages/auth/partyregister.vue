<template>
  <div class="card">
    <div class="register-title">
        <span @click="partyregister()">个人注册</span>
        <span class="hover">机构注册</span>
    </div>
    <div class="full-width">
        <q-input v-model="partyId" placeholder="机构名称" class="login-input"
        @blur="$v.form.partyId.$touch"
        @keyup.enter="submit"
        :error="$v.form.partyId.$error"
        />
        <q-input
        v-model="form.username"
        @blur="$v.form.username.$touch"
        @keyup.enter="submit"
        :error="$v.form.username.$error"
        placeholder='用户名' class='login-input'
      />
      <q-input
        v-model="form.fullname"
        @blur="$v.form.fullname.$touch"
        @keyup.enter="submit"
        :error="$v.form.fullname.$error"
        placeholder='真实姓名' class='login-input'
      />
         <q-input
        v-model="form.email"
        @blur="$v.form.email.$touch"
        @keyup.enter="submit"
        :error="$v.form.email.$error"
        placeholder='邮箱' class=' login-input'
      />
       <q-input
        v-model="form.phone"
        @blur="$v.form.phone.$touch"
        @keyup.enter="submit"
        :error="$v.form.phone.$error"
        placeholder='手机号' class=' login-input'
      />
      <q-input
        v-model="form.password"
         @blur="$v.form.password.$touch"
        @keyup.enter="submit"
        :error="$v.form.password.$error"
        placeholder='密码' class=' login-input' type='password'
      />
      <q-input
        v-model="form.password_confirmation"
         @blur="$v.form.password_confirmation.$touch"
        @keyup.enter="submit"
        :error="$v.form.password_confirmation.$error"
        placeholder='确认密码' class=' login-input' type='password'
      />
    </div>
    <q-btn class="full-width main-color-bg" @click="register()">注册</q-btn>
  </div>
</template>

<script>
import { request } from '../../common'
import { required, email } from 'vuelidate/lib/validators'
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
        partyId: '',
        password: '',
        password_confirmation: ''
      },
      organizations: []
    }
  },
  validations: {
    form: {
      username: { required },
      fullname: { required },
      email: { required, email },
      partyId: { required },
      phone: { required },
      password: { required },
      password_confirmation: { required }
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
        this.$q.notify('请完善注册信息')
        return ''
      }
      let deviceType = 1
      if (
        /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)
      ) {
        deviceType = 2
      }
      var data = {
        partyName: this.partyName,
        phone: this.phone,
        username: this.username,
        fullname: this.name,
        email: this.email,
        password: this.password,
        deviceType: deviceType,
        passwordVerify: this.password_confirmation
      }
      let params = new URLSearchParams()
      for (var key in data) {
        params.append(key, data[key])
      }
      request('party/register', 'post', params).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          this.$q.dialog({
            title: '提示',
            message: '注册成功'
          })
          this.$router.push('/')
        } else {
          this.$q.dialog({
            title: '提示',
            message: response.data.resultMsg
          })
          this.$router.push('/partyregister')
        }
      })
    }
  }
}
</script>

<style>
.q-if:before,
.q-if:after {
  background: none;
}
.q-if-error{
  border: 1px solid red !important;
}
.login-btn {
  width: 200px;
}
.card {
  margin-bottom: 0px;
  padding: 30px 15px;
  min-height: 160px;
}
.login-input {
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px 20px;
  margin-bottom: 25px;
}
button {
  margin-bottom: 4%;
}
h4 {
  font-weight: 300;
}
a {
  font-size: 14px;
}
a:hover {
  text-decoration: underline;
  color: #1aad19;
}
a:focus {
  text-decoration: none;
}
.main-color-bg {
  background-color: #1aad19;
  color: white;
}
input:not(.no-style):hover {
  border-bottom: none;
}
.hover {
  padding-bottom: 10px;
  border-bottom: solid 2px #1aad19;
  font-weight: bold;
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
.select {
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 25px;
}
</style>
