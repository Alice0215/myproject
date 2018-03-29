<template>

  <div class="main">
    <q-toolbar class="header">
    <q-toolbar class="fix">
       <a @click="$router.go(-1)" class="top-nav-left">关闭</a>
        <q-toolbar-title class="header-title">
        项目负责人
        </q-toolbar-title>
    </q-toolbar>
    </q-toolbar>
    <!--<div class="search-field">
        <q-search v-model="key_word"  placeholder="搜索" class="btn" />
    </div>-->
    <div class="full-width">
        <div  v-for="user in users"
          :key="user.userId"  @click="addUser(user.fullname,user.userId)">
         <q-item  v-ripple.mat class="full-width underline user-item">
            <q-item-side icon="account circle" class="user"/>
            <q-item-main :label="user.fullname" />
            <q-item-side right icon="done" v-show="isShow" />
        </q-item>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { request } from '../../common'
import eventBus from '../../eventBus'
export default {
  data () {
    return {
      users: [],
      key_word: '',
      isShow: false
    }
  },
  mounted () {
    this.getUsers()
  },
  computed: mapState({
    count: state => state.count // 理解为传入state对象，修改state.count属性
  }),
  methods: {
    async getUsers () {
      console.log(eventBus.$on('event_name'))
      request('user/all', 'get').then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          this.users = response.data.resultMsg
        } else {
          console.log(response.data.resultMsg)
        }
      })
    },
    addUser (fullname, userId) {
      eventBus.$emit('users', { fullname: fullname, userId: userId })
      this.$router.push('add')
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
.user-item:hover {
  background: none;
}
.search-field {
  background: #cccccc;
  height: 50px;
}
.search-field .btn {
  background-color: white;
  text-align: center;
  width: 96%;
  margin-left: 2%;
}
.user {
  min-width: auto;
}
.underline {
  border-bottom: 1px solid #cccccc;
}

.card {
  margin-bottom: 0px;
  min-height: 160px;
}
</style>
