
<template>
     <q-list class="q-mt-md dark-example" dark>
        <q-list-header>Documentaries</q-list-header>
        <q-item>
          <q-item-side image="statics/mountains.jpg" />
          <q-item-main label="Mountains Documentary" />
          <q-item-side right icon="movie" />
        </q-item>
        <q-item>
          <q-item-side image="statics/quasar-logo.png" />
          <q-item-main>
            <q-item-tile label>Quasar</q-item-tile>
            <q-item-tile sublabel>Empower your development skills</q-item-tile>
          </q-item-main>
          <q-item-side right icon="movie" />
        </q-item>

        <q-item-separator />

        <q-list-header>Movies</q-list-header>
        <q-item multiline>
          <q-item-side image="statics/parallax1.jpg" />
          <q-item-main>
            <q-item-tile label>Must-see places</q-item-tile>
            <q-item-tile sublabel lines="3">
              The world in which we live is full of wonderful places that most of us do not know
              they really exist. Here you can see some of those breathtaking places  around the world.
              Enjoy!
            </q-item-tile>
          </q-item-main>
          <q-item-side right icon="movie" />
        </q-item>
        <q-item multiline>
          <q-item-side image="statics/parallax2.jpg" />
          <q-item-main>
            <q-item-tile label>Building a Bridge</q-item-tile>
            <q-item-tile sublabel lines="5">
              A bridge is one of those things that are often taken for granted until you don’t have one,
              especially if you live on a rural property and there’s a creek between your house and the
              county road. John Doe had plans to build a new bridge along with building a new house on
              his property, but plans for the bridge were made top priority when a wayward truck carried
              too much weight over the old bridge and it collapsed.
            </q-item-tile>
          </q-item-main>
          <q-item-side right icon="movie" />
        </q-item>
      </q-list>
</template>

<script>
    import { Dialog } from 'quasar'
    export default {
        data() {
            return {
                name: '',
                username:'',
                email: '',
                password: '',
                address:'',
                remark:'',
            }
        },
        methods: {
            alert() {
                this.$router.push('/login')
            },
            async getPersonal(){
                this.$axios.get('api/party/all')
                 .then(response=>{
                    this.organizations = response.data.resultMsg
                 })
            },
            partyregister () {
                this.$router.push('/partyregister')
            },
            add() {
                let deviceType = 1
                if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
                    deviceType = 2
                }
                let data = {
                    username: this.username, 
                    fullname: this.name,
                    email: this.email,
                    password: this.password,
                    partyId: this.partyName,
                    phone: this.phone,
                    deviceType: deviceType,
                    passwordVerify: this.password_confirmation,
                    search: '',
                    number: ''
                }
                let params = new URLSearchParams()
                for (var key in data) {
                    params.append(key, data[key])
                }
                this.$axios.post('api/user/register', params)
                    .then(response => {
                        console.log(response)
                        this.$router.push('/post')
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
