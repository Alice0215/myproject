
<template>

    <q-layout class='list'>
        <q-toolbar class='header'>
         <q-item-side left  icon='keyboard arrow left' @click='$router.go(-1)' class='reback'/>
            <q-toolbar-title class='header-title'>
            项目名称
            </q-toolbar-title>
         <q-item-side right icon='group' @click='$router.go(-1)' class='group'/>
        </q-toolbar>
        <q-toolbar class='header'>
          <q-toolbar-title>
            <q-item-tile sublabel lines='1' class='header-info'>
              简介：项目描述内容，项目描述内容
             </q-item-tile>
              <q-item-side left icon='place' class='inline newicon'></q-item-side>
                <q-item-tile sublabel lines='1' class='inline'>
                郑州市，金水区
                </q-item-tile>
              <q-item-side right icon='border color' class='inline newicon'></q-item-side>
            </q-toolbar-title>
        </q-toolbar>

        <q-scroll-area  class='qfield'>
            <div>
            <q-item-tile sublabel lines='1' class='item'>
                简介：项目描述内容，项目描述内容
             </q-item-tile>
             <q-item-tile sublabel lines='1' class='item'>
                简介：项目描述内容，项目描述内容
             </q-item-tile>
             <q-item-tile sublabel lines='1' class='item'>
                简介：项目描述内容，项目描述内容
             </q-item-tile>
              <q-item-tile sublabel lines='1' class='item'>
                简介：项目描述内容，项目描述内容
             </q-item-tile>
              <q-item-tile sublabel lines='1' class='item'>
                简介：项目描述内容，项目描述内容
             </q-item-tile>
            </div>
        </q-scroll-area>

         <q-toolbar class='footer add-qcode'>
            <q-toolbar-title class='header-title' @click="$router.push('/add')">
            申请制作二维码
            </q-toolbar-title>
         </q-toolbar>
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
      hasLoadAll: true
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    async getlist () {
      request(
        'project/list?pageNo=' + this.pageNo + '&pageSize=20',
        'get',
        '',
        'json',
        true
      ).then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          this.list = response.data.resultMsg
          this.pageNo++
        } else {
          console.log(response.data.resultMsg)
        }
      })
    },

    async load () {
      if (!this.hasLoadAll) {
        this.loading = true
        request(
          'project/list?pageNo=' + this.pageNo + '&pageSize=20',
          'get',
          '',
          'json',
          true
        ).then(response => {
          console.log(response)
          if (response.data.resultCode === 'SUCCESS') {
            this.loading = false
            let list = response.data.resultMsg
            if (list.length === 0 || !list.length) {
              this.hasLoadAll = true
              return
            }
            if (list.length < 20) {
              this.list = list
              this.hasLoadAll = true
              return
            }
            this.list = this.list.concat(list)
            this.pageNo++
          }
        })
      }
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
.list {
  padding: 0px;
  border: none;
}
.inline {
  display: inline;
}
.qfield {
  width: 100%;
  height: 300px;
  padding: 15px;
  background-color: #f5f5f5;
}
.qfield .item {
  width: 100%;
  height: 50px;
  background-color: white;
  border: 1px solid #999999;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
  line-height: 28px;
}
.newicon .q-icon,
.newicon .q-icon.material-icons {
  font-size: 20px;
}
.header,
.fix {
  background-color: #f7f7f7 !important;
  padding: 0px;
  text-align: center;
  font-size: 14px;
  color: #101010 !important;
}
.header-title {
  font-size: 15px;
}
.header-info {
  margin-bottom: 8px;
}
.group {
  margin-right: 10px;
}
.fix {
  top: 0;
  border-bottom: 1px solid #dcdcdc;
  z-index: 100;
  position: fixed;
}
.add-qcode {
  border: 1px solid #dcdcdc;
  border-radius: 5px;
}
.center {
  text-align: center;
}
</style>
