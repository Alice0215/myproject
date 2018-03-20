<template>
    <div class="flex justify-center full-height" :class="heightSize">

        <div class="card text-white text-center width-3of4 bg-width-2of5 gt-bg-width-1of4 sm-auto bg-white "
             id="register">
            <div class="card-title main-color-bg">
                <h5>个人注册</h5>
            </div>
            <div class="card-content bg-white ">
                <e-input
                        type="text"
                        label="真实姓名"
                        v-model="name"
                        :validation="$v.name"
                        :validation-messages="validationMessages.name"
                        :value="name"
                ></e-input>
                <e-input
                        type="text"
                        label="邮箱"
                        v-model="email"
                        :validation="$v.email"
                        :validation-messages="validationMessages.email"
                        :value="email"
                ></e-input>
                <e-input
                        type="password"
                        label="密码"
                        v-model="password"
                        :validation="$v.password"
                        :validation-messages="validationMessages.password"
                        :value="password"
                ></e-input>
                <e-input
                        type="password"
                        label="确认密码"
                        v-model="password_confirmation"
                        :validation="$v.password_confirmation"
                        :validation-messages="validationMessages.password_confirmation"
                        :value="password_confirmation"
                ></e-input>
            </div>
            <div class="card-actions vertical-middle">
                <button class="main-color-bg fit" @click="register()">注册</button>
            </div>
            <div class="card-actions inline-block vertical-middle" style="margin-bottom:20px;">
                <a @click="login()">已有账号？现在登录</a>
            </div>
        </div>

    </div>
</template>

<script>
    /* eslint-disable */
    import {mapMutations} from 'vuex'
    import Vivus from 'vivus'
    import logoData from './logoData'
    import {Platform, Toast} from 'quasar'
    import eInput from '../../custom/eInput.vue'
    import {required, minLength, email, sameAs} from 'vuelidate/lib/validators'

    export default {
        mounted() {
            this.setLayoutNeeded(false)
            this.setIsLoginPage(true)
            this.getPersonal()
        },
        computed: {
            heightSize() {
                /*
                if (Platform.is.desktop) {
                  return 'items-center'
                }
                return ''
                */
                return 'items-center'
            },
            logoMethod() {
                return logoData[this.logo]
            }
        },
        data() {
            return {
                logos: Object.keys(logoData),
                logo: 'Molectron',
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                validationMessages: {
                    name: {
                        required: 'Name is required.',
                        minLength: 'Minimum 3 characters.'
                    },
                    email: {
                        required: 'Email is required.',
                        minLength: 'Minimum 6 characters.',
                        email: 'Email is not valid.'
                    },
                    password: {
                        required: 'Password is required.',
                        minLength: 'Minimum 3 characters.',
                    },
                    password_confirmation: {
                        required: 'Password confirmation is required.',
                        minLength: 'Minimum 3 characters.',
                        sameAsPassword: 'Password must identical.'
                    }
                },
            }
        },
        validations: {
            name: {
                required,
                minLength: minLength(3)
            },
            email: {
                required,
                email,
                minLength: minLength(6)
            },
            password: {
                required,
                minLength: minLength(3)
            },
            password_confirmation: {
                required,
                minLength: minLength(3),
                sameAsPassword: sameAs('password')
            }
        },
        components: {
            eInput
        },
        methods: {
            ...mapMutations(['setLayoutNeeded', 'setIsLoginPage']),
            login() {
                this.$router.push('/login')
            },
            async load () {
               /* this.loading = true
                await this.$http.post('party/all')
                  .then(response=>{
                    console.log(response)
                })
                this.loading = false
                console.log(this.organizations)*/
            },
            async getPersonal(){
                 this.$http.get('party/all')
                 .then(response=>{
                    console.log(response)
                 })
            },
            register() {
                this.$v.$touch()

                if (this.$v.$error) {
                    return
                }

                var qs = require('qs');
                var data = {
                    partyName: "测试",
                    partyType: "1",
                    phone: "",
                    username: "",
                    fullname: this.name,
                    email: this.email,
                    password: this.password,
                    passwordVerify: this.password,
                    deviceType: 2,
                    passwordVerify: this.password_confirmation
                }

                this.$http.post('party/register', data)
                    .then(response => {
                        console.log(response)
                        this.$auth.setToken(response.data.data.token, response.data.data.expired_at)
                        this.$auth.setUserAuth(JSON.stringify(response.data.data.user))
                        this.$store.state.authUser = response.data.data.user
                        this.setLayoutNeeded(true)
                        this.setIsLoginPage(false)
                        this.$router.push('/post')
                    })
                    .catch(e => {
                        console.log('Error', e.response.data.message);
                        Toast.create('Error : ' + e.message)
                    })
            },
            startAnimation() {
                this.vivus = new Vivus('logo', {
                        duration: 400,
                        forceRender: false
                    }, function (element) {
                        for (let item of element.el.children[0].children) {
                            item.setAttribute('style', 'fill:white')
                            item.setAttribute('style', 'fill:white')
                        }
                    }
                )
            }
        }
    }
</script>
<style scoped>
    .card {
        margin-bottom: 0px;
    }

    .card-content {
        min-height: 160px;
    }

    button {
        margin-bottom: 4%;
    }

    h4 {
        font-weight: 300;
    }

    a {
        font-size: 14px;
        -webkit-transition: all 0.4s ease-in-out;
        -moz-transition: all 0.4s ease-in-out;
        -ms-transition: all 0.4s ease-in-out;
        -o-transition: all 0.4s ease-in-out;
    }

    a:hover {
        text-decoration: underline;
        color: #1AAD19;
    }

    a:focus {
        text-decoration: none;
    }
    .main-color-bg{
        background-color: #1AAD19;
        color:white;
    }
      input:not(.no-style):hover{
        border-bottom: none;
    }
</style>
