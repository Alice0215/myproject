<template>
    <div class="flex justify-center full-height " :class="heightSize">

        <div class="card text-white text-center width-3of4 bg-width-2of5 gt-bg-width-1of4 sm-auto bg-white " id="login">
            <div class="card-title main-color-bg" >
                <h>用户登陆</h>
            </div>
            <div class="card-content bg-white ">
                <input text-dark required v-model="username" placeholder="账号" class="full-width login-input">
                <input text-dark required v-model="password" placeholder="密码"  class="full-width login-input">
            </div>

            <div class="card-actions vertical-middle">
                <button class="blue main-color-bg fit"  @click="login() ">登录</button>
            </div>
            <div class="card-actions inline-block vertical-middle" style="margin-bottom:20px;">
                <a @click="register()" > 没有账号？现在注册</a>
            </div>
        </div>

    </div>
</template>

<script>
    /* eslint-disable */
    import {mapMutations} from 'vuex'
    import Vivus from 'vivus'
    import logoData from './logoData'
    import { Platform, Toast } from 'quasar'
    export default {
        mounted () {
            this.setLayoutNeeded(false)
            this.setIsLoginPage(true)
            this.startAnimation()
        },
        computed: {
            heightSize (){
                /*
                if (Platform.is.desktop) {
                  return 'items-center'
                }
                return ''
                */
                return 'items-center'
            },
            logoMethod () {
                return logoData[this.logo]
            }
        },
        data () {
            return {
                logos: Object.keys(logoData),
                logo: 'Molectron',
                username: '',
                password: '',
            }
        },
        methods: {
            ...mapMutations(['setLayoutNeeded', 'setIsLoginPage']),
            register () {
                this.$router.push('/register')
            },
            login () {
                var qs = require('qs');
                var data = {
                    username : this.username,
                    password : this.password,
                    deviceType:1,
                    deviceBrand:'HW',
                    pushDeviceId:1
                }
                console.log(data)
                //get token
                this.$http.post('user/login', data)
                    .then(response => {
                        console.log(response)
                        this.$router.push('/post')
                        this.$auth.setToken(response.resultMsg.userToken)
                        // login
                        /*this.$http.post('login', qs.stringify(data))
                            .then(response => {
                                console.log(response)
                                this.$auth.setUserAuth(JSON.stringify(response.data.data.user))
                                this.$store.state.authUser = response.data.data.user
                                this.setLayoutNeeded(true)
                                this.setIsLoginPage(false)
                                this.$router.push('/post')
                            })*/
                    })
                    .catch(e => {
                        console.log('Error', e.message);
                        Toast.create('Error : ' + e.message)
                    })
            },
            startAnimation () {
                this.vivus = new Vivus('logo', {
                        duration: 400,
                        forceRender: false
                    }, function(element) {
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
    .login-input{
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