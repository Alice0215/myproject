<template>
    <q-layout view="Hhh lpr Fff" id="maintenance_records">
      <q-page-container>
        <q-page>
          <div class="bg-white">
            <q-infinite-scroll :handler="getjobGroup">
              <q-item  sublabel lines='1'
                       class="full-width underline users"
                       v-for="vo in joblist"
                       :key="vo.id"
                       @click.native="$router.push('/jobGroup/detail?jobGroupId='+vo.id)" >
                <q-item-main v-if="vo.code" :label="vo.code.alias" />
                <span class="user" v-if="vo.description">{{vo.description}}</span>
                <span class="user">{{vo.createTime}}</span>
                <q-item-side right icon="account circle" class="account"/>
                <q-item-side right  icon="keyboard_arrow_right"  class="record-right" />
              </q-item>
            </q-infinite-scroll>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
</template>

<script>
import { request } from '../../common'

export default {
  data () {
    return {
      joblist: [],
      pageNo: 1,
      hasLoadAll: true,
      projectId: '1',
      tabClass: ['hover', '']
    }
  },
  methods: {
    getjobGroup (index, done) {
      if (this.hasLoadAll) {
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
    }
  },
  mounted () {
    this.getjobGroup()
  }
  // created () {
  //   this.projectId = 1
  //   this.getjobGroup()
  // }
}
</script>

<style lang='scss'>
@import "../../assets/css/_variable.scss";
#maintenance_records {
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
