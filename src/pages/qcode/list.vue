
<template>

    <q-layout class='list bg-color'>
        <q-toolbar class='header'>
         <q-item-side left  icon='keyboard arrow left' @click='$router.go(-1)' class='reback'/>
            <q-toolbar-title class='header-title text-center'>
            项目名称
            </q-toolbar-title>
         <q-item-side right icon='group' @click='$router.go(-1)' class='group'/>
        </q-toolbar>
        <q-toolbar>
          <q-toolbar-title class="text-center project-info">
            <q-item-tile sublabel lines='1'>
              简介：项目描述内容，项目描述内容
             </q-item-tile>
              <q-item-side left icon='place' class='inline newicon'></q-item-side>
                <q-item-tile sublabel lines='1' class='inline text-center'>
                郑州市，金水区
                </q-item-tile>
              <q-item-side right icon='border color' class='inline newicon'></q-item-side>
            </q-toolbar-title>
        </q-toolbar>

        <q-scroll-area  class='qfield'>
            <div>
            <p>二维码60/100<q-item-side right  icon='error' @click='$router.go(-1)' class='float-right icon-error'/></p>

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
.project-info{
  font-size: 15px;
  line-height: 23px;
}
.qfield {
  width: 100%;
  height: 350px;
  padding: 15px;
  background-color: #f5f5f5;
}
.qfield .item {
  width: 100%;
  height: 50px;
  background-color: white;
  border: 1px solid #DFDFDF;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
  line-height: 28px;
}
.newicon .q-icon,
.newicon .q-icon.material-icons,.icon-error .q-icon.material-icons {
  font-size: 18px;
  color: #999999
}
.group {
  margin-right: 10px;
}
.add-qcode {
  border: 1px solid #dcdcdc;
  border-radius: 5px;
}
</style>
