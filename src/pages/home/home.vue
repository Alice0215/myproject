<template>
  <div>
    <q-layout view="Hhh lpr Fff">
    <q-page-container>
      <q-page>
      <div id="home">
        <div class="top-log">
          <p class="log">
            <img src="statics/home/logo.png"/>
          </p>
          <p class="time">{{dataTime}}</p>
        </div>
        <div class="row card menu-field">
          <div class="col-6 nav border-bottom border-right" @click="$router.push('/workload')">
            <img src="statics/home/edit.png"/>
            <div>工单记录</div>
          </div>
          <div class="col-6 nav  border-bottom" @click="$router.push('/workOrder/add')">
            <img src="statics/home/order.png"/>
            <div>创建工单</div>
          </div>
          <div class="col-6 nav border-bottom border-right" @click="$router.push('/project/list')">
            <img src="statics/home/book.png"/>
            <div>项目管理</div>
          </div>
        <div class="col-6 nav  border-bottom" @click="$router.push('/workOrder/list')">
            <img src="statics/home/project.png"/>
            <div>工单管理</div>
          </div>
          <div class="col-6 nav border-right">
            <img src="statics/home/user.png"/>
            <div>成员管理</div>
          </div>
          <div class="col-6 nav">
            <img src="statics/home/chart.png"/>
            <div>工作量统计</div>
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
    height: calc(48vh - 66px);
    background-color: #ffaa2b;
    color: white;
    text-align: center;
    font-size: 20px;
    padding-top: calc((48vh - 220px)/2);
    // padding-bottom: 10px;
    // padding-top: 30px;
  }
  .log {
    text-align: center;
    img {
      width: 120px;
      height: 120px;
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
