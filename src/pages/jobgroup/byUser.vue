<template>
  <div>
  <q-layout view="Hhh lpr Fff"  class="main" id="my">
      <q-layout-header>
        <q-toolbar>
          <q-toolbar-title class="header-title">
            我的
          </q-toolbar-title>
         <q-btn flat round dense icon="settings" @click="leftDrawer = !leftDrawer" class="top-color"/>
        </q-toolbar>
      </q-layout-header>
      <q-page-container>
      <q-page>
    <div class="full-width record-list">
        <q-item  v-ripple.mat class="full-width user-item-header">
          <q-item-main label="养护记录" />
       </q-item>
       <q-infinite-scroll :handler="load" ref="scroll">
          <q-list separator v-if="list.length > 0">
            <q-item v-for="item in list"
                    :key="item.id"
                    @click.native="$router.push('/jobGroup/detail?jobGroupId='+ item.id)">
              <q-item-main>
                <q-item-tile>
                  <div class="row">
                    <div class="title col-8">{{ item.code.alias }}</div>
                    <div class="type-title col-4 text-right">{{ item.code.type ? item.code.type.value  : '' }}</div>
                  </div>
                </q-item-tile>
                <q-item-tile class="content">
                  <div class="pv-4 row">
                    <div class="work-content-title">工作内容：</div>
                    <div class="work-content" v-line-clamp:20="1">
                    <span v-for="v in item.jobs" v-if="item.jobs" :key="v.id">
                      <span v-if="v.other" class="ml-5">{{ v.other }}</span>
                      <span v-if="v.action" class="ml-5">{{ v.action.name }}</span>
                    </span>
                    </div>
                  </div>
                </q-item-tile>
                <q-item-tile class="content">
                  <div class="pv-4">
                    <div>记录人：</div>
                    <div>{{ item.user.fullname }}</div>
                  </div>
                </q-item-tile>
                <q-item-tile>
                  <div class="pv-4 row font-15">
                    <div class="col-8">
                      <div class="inline-flex">
                        <div>时间：</div>
                        <div>{{ item.createTime }}</div>
                      </div>
                    </div>
                    <div class="col-4 text-right btn-light">
                      <div>查看详情<q-icon name="keyboard arrow right" size="20px"/></div>
                    </div>
                  </div>
                </q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
          <div class="row justify-center" style="margin-bottom: 50px;" v-if="!hasLoadAll">
            <q-spinner name="dots" slot="message" :size="40"></q-spinner>
          </div>
        </q-infinite-scroll>
    </div>

   <q-layout-drawer
      side="right"
      v-model="leftDrawer"
    >
      <q-scroll-area class="fit q-pa-sm">
         <q-item  v-ripple.mat class="full-width user-item  underline">
        </q-item>
        <q-item  v-ripple.mat class="full-width user-item " >
          <q-item-side left icon="account circle" class="record-right active"/>
            <q-item-main  :label="`编辑资料`" />
        </q-item>
        <q-item  v-ripple.mat class="full-width user-item ">
          <q-item-side left icon="account balance wallet" class="record-right active"/>
            <q-item-main  :label="`账号管理`" />
        </q-item>
        <q-item  v-ripple.mat class="full-width user-item"  @click.native="logOut">
          <q-item-side left icon="exit to app" class="record-right active"/>
            <q-item-main  :label="`退出登录`" />
        </q-item>
      </q-scroll-area>
    </q-layout-drawer>
    <q-tabs class="footer" v-model="model">
        <q-route-tab slot="title" icon="home" to="/" replace label="首页" class="menu" name="home"/>
        <q-route-tab slot="title" icon="notifications none" to="/"  disable replace label="消息" class="menu" />
        <q-route-tab slot="title" icon="person" to="/jobGroup/byUser" replace label="我的" class="menu" name="my"/>
      </q-tabs>
   </q-page>
    </q-page-container>
  </q-layout>
  </div>
</template>

<script>
import eventBus from '../../eventBus'
import InfiniteScroll from '../../mixin/InfiniteScroll'
export default {
  data () {
    return {
      model: 'my',
      leftDrawer: true
    }
  },
  mixins: [
    InfiniteScroll
  ],
  methods: {
    logOut () {
      this.$q.dialog({
        title: '提示',
        message: '您确定要退出吗？',
        cancel: '取消',
        ok: '确定'
      }).then(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('partyId')
        this.$router.push('/')
      }).catch(() => {
        this.leftDrawer = false
      })
    }
  },
  mounted () {
    let currentUser = this.$store.state.User.current
    this.apiUrl = 'jobGroup/list/byUser?userId=' + currentUser.userId
    this.scroll = this.$refs.scroll
    this.infiniteScrollCallback = function () {
      if (this.list.length > 0) {
        eventBus.$emit('has-maintenance-records')
      }
    }
    console.log(this.list)
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#my {
   background: white;
  .q-item-main {
    .content {
      .work-content-title {
        width: 75px;
      }
      .work-content {
        width: calc(100% - 90px);
      }
      div {
        display: flex;
        div {
          font-size: 15px;
        }
      }
    }
  }
  .title {
    font-size: 18px !important;
    color: $text-highlight;
  }
  .type-title {
    color: $type-title;
  }
  .btn-light {
    color: $light-text;
    font-size: 15px;
  }
  .record-list {
    border-top: 1px solid #cccccc;
  }
  .user-item-header {
    background-color: #f5f5f5;
    color: #666666;
    font-size: 13px;
  }
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
  .header {
    margin-bottom: 0px;
  }
  .fix {
    border-bottom: none;
  }
  .user {
    min-width: auto;
  }
  .record-right {
    margin-left: 0px;
    min-width: 20px;
  }
  .top-color {
    color: #888;
  }
}
</style>
