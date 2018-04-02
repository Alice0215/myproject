
<template>
    <q-layout class='list bg-color'>
        <q-toolbar class='header'>
          <a @click="$router.push('/')"><q-item-side left  icon='keyboard arrow left' class='reback'/></a>
            <q-toolbar-title class='header-title text-center'>
            项目名称
            </q-toolbar-title>
         <router-link :to="{ path: '/project/userList?id='+projectId}">
         <q-item-side right icon='group' @click='$router.go(-1)' class='group'/>
        </router-link>
        </q-toolbar>
        <q-toolbar>
          <q-toolbar-title class="text-center project-info">
            <q-item-tile sublabel lines='1'>
              简介：{{projectDesc}}
             </q-item-tile>
              <q-item-side left icon='place' class='inline newicon' v-if="location"></q-item-side>
                <q-item-tile sublabel lines='1' class='inline text-center'>
               {{location}}
                </q-item-tile>
              <a class="inline" href='javascript:' @click="$router.push('/project/edit?id='+projectId)"><q-item-side right icon='border color' class='inline newicon'></q-item-side></a>
            </q-toolbar-title>
        </q-toolbar>
        <div class='nav-title'>
            <span class='hover'>二维码列表</span>
            <span @click="$router.push('/add')">维护记录</span>
            <q-select v-model='qrtype' :options='qrtypes' placeholder='类型 ∨' class="type"/>
        </div>
        <p class='qcount'>二维码{{active}}/{{total}}<q-item-side right  icon='error' @click='$router.go(-1)' class='float-right icon-error'/></p>
        <q-scroll-area  class='qfield'>
              <q-item-tile sublabel lines='1' class='item text-left' v-for="item in list"
          :key="item.id" >
              <router-link :to="{ path: '/qcode/detail?id='+item.id }">
               <span class="qfield-mtitle">{{item.alias}}</span>
               <span class="qfield-stitle">{{item.alias}}</span>
               <span class="qfield-stitle"> {{item.createTime}} {{item.description}}</span>
              </router-link>
             </q-item-tile>
        </q-scroll-area>
        <div  class="btn-field">
         <q-btn class='full-width bg-color show-qr add-qcode'  @click="$router.push('add')">申请制作二维码</q-btn>
        </div>
         <q-tabs class="footer">
          <q-route-tab slot="title" icon="apps" to="/qcode/list" replace label="我的项目" class="menu" />
          <q-route-tab slot="title" icon="view_array" to="/" replace label="扫二维码" class="menu"/>
          <q-route-tab slot="title" icon="event note" to="/" replace label="巡查" class="menu"/>
          <q-route-tab slot="title" icon="person" to="/" replace label="我的" class="menu"/>
        </q-tabs>
    </q-layout>
</template>

<script>
import { request } from '../../common'
export default {
  data () {
    return {
      list: '',
      loading: false,
      pageNo: 1,
      hasLoadAll: false,
      qrtype: '',
      projectId: '',
      projectDesc: '',
      location: '',
      total: '',
      active: '',
      qrtypes: [
        {
          label: '单株植物',
          value: '1'
        },
        {
          label: '片区植物',
          value: '2'
        },
        {
          label: '工具',
          value: '3'
        },
        {
          label: '其它',
          value: '4'
        }
      ]
    }
  },
  methods: {
    async load () {
      if (!this.hasLoadAll) {
        this.loading = true
        request(
          'qrcode/list?projectId=' + this.projectId + '&pageNo=' + this.pageNo + '&pageSize=20',
          'get',
          '',
          'json',
          true
        ).then(response => {
          if (response.data.resultCode === 'SUCCESS') {
            this.loading = false
            let list = response.data.resultMsg
            if (list.length === 0 || !list.length) {
              this.hasLoadAll = true
              return
            }
            if (list.length <= 20) {
              this.list = list
              this.hasLoadAll = true
              return
            }
            this.list = this.list.concat(list)
            this.pageNo++
          } else {
            this.hasLoadAll = true
            return ''
          }
        })
      }
    },
    getInfo () {
      request(
        'project/detail?projectId=' + this.projectId,
        'get',
        '',
        'json',
        true
      ).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          if (response.data.resultMsg.location) {
            this.location = response.data.resultMsg.location.formattedAddress
          }
          this.projectDesc = response.data.resultMsg.projectDesc
        } else {
          this.$q.dialog({
            title: '提示',
            message: response.data.resultMsg
          })
        }
      })
    },
    getCount () {
      request(
        'qrcode/count?projectId=' + this.projectId,
        'get',
        '',
        'json',
        true
      ).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          this.total = response.data.resultMsg.total
          this.active = response.data.resultMsg.active
        } else {
          this.$q.dialog({
            title: '提示',
            message: response.data.resultMsg
          })
        }
      })
    }
  },
  created () {
    this.projectId = this.$route.query.projectId
    this.getInfo()
    this.load()
    this.getCount()
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
.project-info {
  font-size: 12px;
  line-height: 23px;
  min-height: 50px;
}
.qcount {
  padding: 15px 15px 0px;
  margin-bottom: 3px;
}
.header {
  margin-bottom: 0px;
}
.qfield {
  width: 100%;
  height: 300px;
  padding: 15px;
  background-color: #f5f5f5;
  .item {
    width: 100%;
    height: 50px;
    background-color: white;
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 10px;
    line-height: 28px;
    .qfield-mtitle {
      font-size: 14px;
      padding-right: 100px;
    }
  }
}
.qfield .item .qfield-stitle {
  font-size: 12px;
}
.newicon .q-icon,
.newicon .q-icon.material-icons,
.icon-error .q-icon.material-icons {
  font-size: 18px;
  color: #999999;
}
.group {
  margin-right: 10px;
}
.add-qcode {
  border-radius: 5px;
  height: 45px;
  background-color: #f1f1f5;
}
.btn-field {
  padding: 15px;
  width: 100%;
}
.type .q-if-control {
  display: none !important;
}
</style>
