<template>
  <div>
    <q-layout view="Hhh lpr Fff">
    <q-page-container>
      <q-page>
      <div id="home">
        <div class="top-log">
          <p class="log">
            <img src="statics/home/home-logo.png"/>
          </p>
          <p class="time">{{dataTime}}</p>
        </div>
        <div class="row card menu-field">
          <div class="col-6 nav border-bottom border-right">
            <img src="statics/home/1-1.png"/>
            <div>养护记录</div>
          </div>
          <div class="col-6 nav  border-bottom">
            <img src="statics/home/1-2.png"/>
            <div>现场巡查记录</div>
          </div>
          <div class="col-6 nav border-bottom border-right">
            <img src="statics/home/2-1.png"/>
            <div>苗木到场</div>
          </div>
          <div class="col-6 nav  border-bottom">
            <img src="statics/home/2-1.png"/>
            <div>二维码编辑</div>
          </div>
          <div class="col-6 nav border-right">
            <img src="statics/home/3-1.png"/>
            <div>项目</div>
          </div>
          <div class="col-6 nav">
            <img src="statics/home/3-2.png"/>
            <div>成员</div>
          </div>
           <div class="col-6 nav">
            <img src="statics/home/4-1.png"/>
            <div>管理</div>
          </div>
        </div>
      </div>
      </q-page>
      </q-page-container>
       <q-layout-footer>
      <q-tabs class="footer">
        <q-route-tab slot="title" icon="home" to="/" replace label="首页" class="menu" />
        <q-route-tab slot="title" icon="notifications none" to="/" replace label="消息" class="menu" />
        <q-route-tab slot="title" icon="person" to="/me" replace label="我的" class="menu"/>
      </q-tabs>
    </q-layout-footer>
    </q-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataTime: ''
    }
  },
  mounted () {
    this.getTime()
  },
  methods: {
    getTime () {
      let myDate = new Date()
      let Week = ['日', '一', '二', '三', '四', '五', '六']
      this.dataTime = myDate.getFullYear() + '年' + (myDate.getMonth() + 1) + '月' + myDate.getDate() + '日 周' + Week[myDate.getDay()]
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#home {
  .q-layout-page-container {
    padding-top: 50px;
  }

  .top-log {
    height: calc(40vh - 66px);
    background-color: $primary;
    color: white;
    text-align: center;
    font-size: 20px;
    padding-top: calc((41vh - 220px)/2);
    // padding-bottom: 10px;
    // padding-top: 30px;
  }
  .log {
    text-align: center;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .nav {
    height: calc(20vh - 22px);
    padding-top: calc((20vh - 100px)/2);
    // padding-bottom: 15px;
    img {
      width: 60px;
    }
  }
  .menu-field {
    height: calc(60vh - 66px);
    margin-top: 15px;
    text-align: center;
  }
  .border-bottom {
    border-bottom: 1px solid #e8e8e8;
  }
  .border-right {
    border-right: 1px solid #e8e8e8;
  }
}
</style>
