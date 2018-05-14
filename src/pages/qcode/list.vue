
<template>
    <q-layout class='list bg-color' id="qr-list">
        <q-toolbar class='header'>
          <a @click="$router.push('/')" class='back-a'><q-item-side left  icon='keyboard arrow left' class="back-left" />返回</a>
            <q-toolbar-title class='header-title text-center'>
            {{projectName}}
            </q-toolbar-title>
         <router-link :to="{ path: '/project/userList?id='+projectId}">
         <q-item-side right icon='group' class='group'/>
        </router-link>
        </q-toolbar>
        <q-toolbar>
          <q-toolbar-title class="text-center project-info">
            <q-item-tile sublabel lines='1'>
              简介：{{projectDesc}}
             </q-item-tile>
              <q-item-tile sublabel lines='1' icon="place" class="mb-8 newicon" v-if="location">
                  <label class="color-black font-12 location">{{location}}</label>
              </q-item-tile>
              <a class="inline" href='javascript:' @click="$router.push('/projectDetail?id='+projectId)"><q-item-side right icon='border color' class='inline newicon'></q-item-side></a>
            </q-toolbar-title>
        </q-toolbar>
        <div class='nav-title'>
            <span :class="tabClass[0]" @click="chooseTab(0)">二维码列表</span>
            <span :class="tabClass[1]" @click="chooseTab(1)">养护记录</span>
            <div v-if="qrcode">
            <q-btn-dropdown :label="type_lable" class="block qr-type" v-model="dropdown">
              <q-list link>
                <q-item v-for="k in qrtypes" :key="k.value" @click.native="changeType(k.value,k.label),dropdown = false" >
                  <q-item-main>
                    <q-item-tile label>{{k.label}}</q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            </div>
        </div>
        <div v-if="qrcode" class="scrool-field ">
        <p class='qcount'>二维码{{active}}/{{total}}<q-item-side right  icon='error' @click='$router.goBack()' class='float-right icon-error'/></p>
        <q-scroll-area  class='qfield'>
           <q-infinite-scroll :handler="load">
              <q-item-tile sublabel lines='1' class='item text-left' v-for="item in list" :key="item.id"  @click.native="$router.push('/qcode/detail?projectId='+projectId+'&id='+item.id+'&type='+item.type.key)">
               <span class="qfield-mtitle">{{item.alias}}</span>
               <span class="qfield-stitle" v-if="item.type">{{item.type.value}}</span>
               <span class="qfield-stitle"> {{item.createTime}} {{item.description}}</span>
             </q-item-tile>
            <div class="row justify-center" style="margin-bottom: 50px;" v-if="!hasLoadAll">
              <q-spinner name="dots" slot="message" :size="40"></q-spinner>
            </div>
           </q-infinite-scroll>
        </q-scroll-area>
        <div  class="btn-field">
         <q-btn class='full-width bg-color show-qr add-qcode'  @click="$router.push('add?projectId='+projectId)">申请制作二维码</q-btn>
        </div>
        </div>
        <div v-if="weihu" class="bg-white">
          <q-infinite-scroll :handler="getjobGroup">
            <q-item  sublabel lines='1' class="full-width underline users"  v-for="vo in joblist" :key="vo.id" @click.native="$router.push('/jobGroup/detail?jobGroupId='+vo.id)" >
              <q-item-main v-if="vo.code" :label="vo.code.alias" /><span class="user" v-if="vo.description">{{vo.description}}</span>
              <span class="user">{{vo.createTime}}</span>
              <q-item-side right icon="account circle" class="account"/>
              <q-item-side right  icon="keyboard_arrow_right"  class="record-right" />
            </q-item>
          </q-infinite-scroll>
        </div>
         <q-tabs class="footer">
          <q-route-tab slot="title" icon="dashboard" to="/qcode/list" replace label="我的项目" class="menu" />
          <q-route-tab slot="title" icon="view_array" to="/qcode/scan" append label="扫二维码" class="menu"/>
          <q-route-tab slot="title" icon="event note" to="/" replace label="巡查" class="menu"/>
          <q-route-tab slot="title" icon="person" to="/jobGroup/byUser" replace label="我的" class="menu"/>
        </q-tabs>
    </q-layout>
</template>

<script>
import { request } from '../../common'
export default {
  data () {
    return {
      type_lable: '类型',
      dropdown: false,
      qrcode: true,
      weihu: false,
      list: '',
      joblist: [],
      pageNo: 1,
      hasLoadAll: true,
      projectId: '',
      projectName: '',
      projectDesc: '',
      location: '',
      total: '',
      active: '',
      type: '',
      tabClass: ['hover', ''],
      qrtypes: [
        {
          label: '单株植物',
          value: 'SINGLE'
        },
        {
          label: '片区植物',
          value: 'AREA'
        },
        {
          label: '工具',
          value: 'EQUIPMENT'
        },
        {
          label: '其它',
          value: 'OTHER'
        }
      ]
    }
  },
  methods: {
    async  load (index, done) {
      setTimeout(() => {
        if (!this.hasLoadAll) {
          request(
            'qrcode/list?projectId=' + this.projectId + '&type=' + this.type + '&pageNo=' + this.pageNo + '&pageSize=20', 'get', null, null, true).then(response => {
            if (response.data.resultCode === 'SUCCESS') {
              let that = this
              let list = response.data.resultMsg
              if (list.length === 0 || !list.length) {
                this.hasLoadAll = true
                return
              }
              if (list.length < 20) {
                that.hasLoadAll = true
              } else {
                this.hasLoadAll = false
                that.pageNo++
              }
              if (that.list.length > 0) {
                that.list = that.list.concat(list)
              } else {
                that.list = list
              }
              done()
            }
          })
        }
      }, 2000)
    },
    changeType (value, lable) {
      this.type_lable = lable
      this.type = value
      console.log(value)
      this.inputChange()
    },
    initList () {
      request('qrcode/list?projectId=' + this.projectId + '&type=' + this.type + '&pageNo=' + this.pageNo + '&pageSize=20', 'get', null, null, true).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          let that = this
          let list = response.data.resultMsg
          if (list.length === 0 || !list.length) {
            this.hasLoadAll = true
            return
          }
          if (list.length < 20) {
            that.hasLoadAll = true
          } else {
            that.pageNo++
            this.hasLoadAll = false
          }
          if (that.list.length > 0) {
            that.list = that.list.concat(list)
          } else {
            that.list = list
          }
        }
      })
    },
    getInfo () {
      request('project/detail?projectId=' + this.projectId, 'get', null, 'json', true).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          if (response.data.resultMsg.location) {
            this.location = response.data.resultMsg.location.formattedAddress
          }
          this.projectDesc = response.data.resultMsg.projectDesc
          this.projectName = response.data.resultMsg.projectName
        } else {
          this.$q.dialog({
            title: '提示',
            message: response.data.resultMsg
          })
        }
      })
    },
    getCount () {
      this.$q.loading.show()
      request('qrcode/count?projectId=' + this.projectId + '&type=' + this.type, 'get', null, 'json', true).then(response => {
        this.$q.loading.hide()
        if (response.data.resultCode === 'SUCCESS') {
          this.total = response.data.resultMsg.total
          if (response.data.resultMsg.active === null) {
            this.active = 0
          } else {
            this.active = parseInt(response.data.resultMsg.active)
          }
        } else {
          this.$q.dialog({
            title: '提示',
            message: response.data.resultMsg
          })
        }
      })
    },
    inputChange () {
      this.initData()
      this.getCount()
      this.initList()
    },
    chooseTab (index) {
      localStorage.setItem('qlistIndex', index)
      _.forEach(this.tabClass, (v, k) => {
        if (k === index) {
          this.$set(this.tabClass, k, 'hover')
        } else {
          this.$set(this.tabClass, k, '')
        }
      })
      if (index === 0) {
        this.qrcode = true
        this.weihu = false
      } else {
        this.qrcode = false
        this.weihu = true
      }
      this.initData()
    },
    getjobGroup (index, done) {
      if (!this.hasLoadAll) {
        request('jobGroup/list/byProject?projectId=' + this.projectId + '&pageNo=' + this.pageNo + '&pageSize=20', 'get', null, 'json', true).then(response => {
          if (response.data.resultCode === 'SUCCESS') {
            let that = this
            let list = response.data.resultMsg
            if (list.length === 0 || !list.length) {
              this.hasLoadAll = true
              return
            }
            if (list.length < 20) {
              that.hasLoadAll = true
            } else {
              that.pageNo++
              this.hasLoadAll = false
            }
            if (that.joblist.length > 0) {
              that.joblist = that.joblist.concat(list)
            } else {
              that.joblist = list
            }
            done()
          }
        })
      }
    },
    initData () {
      this.hasLoadAll = false
      this.pageNo = 1
      this.list = ''
      this.joblist = []
    }
  },
  created () {
    this.projectId = this.$route.query.projectId
    this.getCount()
    this.getInfo()
    this.initList()
    let index = localStorage.getItem('qlistIndex')
    if (!_.isNull(index) && index === '1') {
      this.chooseTab(1)
      // localStorage.removeItem('qlistIndex')
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#qr-list {
  .project-info {
    font-size: 12px;
    line-height: 23px;
    min-height: 50px;
  }
  .location {
    max-width: 180px;
    display: inline-block !important;
  }
  .qcount {
    padding: 15px 15px 0px;
    margin-bottom: 3px;
  }
  .header {
    margin-bottom: 0px;
    font-size: 14px;
  }
  .newicon {
    color: #999999;
    font-size: 18px;
  }
  .qr-type {
    width: 100%;
  }
  .nav-title .q-btn {
    box-shadow: none;
  }
  .scrool-field {
    position: fixed;
    top: 200px;
    bottom: 148px;
    left: 0px;
    right: 0px;
  }
  .qfield {
    width: 100%;
    height: 100%;
    padding: 0px 15px;
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
        padding-right: 50px;
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
    height: 35px;
    background-color: #f1f1f5;
  }
  .btn-field {
    padding: 15px 15px 0px;
    width: 100%;
    position: fixed;
    bottom: 63px;
  }
  .type .q-if-control {
    display: none !important;
  }
  .users {
    font-size: 14px;
  }
  .user {
    min-width: auto;
    padding-left: 8px;
  }
  .account .q-item-icon {
    font-size: 22px;
  }
  .record-right {
    margin-left: 0px;
    min-width: 20px;
  }
}
</style>
