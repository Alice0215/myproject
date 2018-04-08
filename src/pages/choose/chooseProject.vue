<template>
  <div>
    <q-toolbar class="header mb-0">
      <q-toolbar class="fix">
        <router-link :to="{ path: urlName }" class="top-nav-left">关闭</router-link>
        <q-toolbar-title class="header-title">
          选择项目
        </q-toolbar-title>
        <q-item-side right/>
      </q-toolbar>
    </q-toolbar>
    <q-list id="choose-project">
      <q-infinite-scroll :handler="load" class="scroll-field">
        <q-item multiline  v-for="item in list"
                :key="item.id" class="list-list"  @click.native="toDetail(item)">
          <q-item-side class="add-btn" />
          <q-item-main>
            <q-item-tile label class="title">{{item.projectName}}</q-item-tile>
            <q-item-tile sublabel lines="2" class="content">
              {{item.projectDesc}}
            </q-item-tile>
          </q-item-main>
        </q-item>
        <div class="row justify-center" style="margin-bottom: 50px;" v-if="!hasLoadAll">
          <q-spinner name="dots" slot="message" :size="40"></q-spinner>
        </div>
      </q-infinite-scroll>
    </q-list>
  </div>
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
        urlName: '/qcode/edit?id=' + localStorage.getItem('qrCodeId') + '&typeKey=' + localStorage.getItem('typeKey')
      }
    },
    methods: {
      toDetail (item) {
        console.log(item)
        localStorage.setItem('choose-project', JSON.stringify(item))
        this.$router.back()
        // return 'qcode/List?projectId' + projectId
      },
      async load (index, done) {
        localStorage.setItem('qrCodeId', '250')
        let that = this
        setTimeout(() => {
          if (!this.hasLoadAll) {
            this.loading = true
            request(
              'project/list?pageNo=' + that.pageNo + '&pageSize=20',
              'get',
              '',
              'json',
              true
            ).then(response => {
              if (response.data.resultCode === 'SUCCESS') {
                this.loading = false
                let list = response.data.resultMsg
                if (list.length === 0 || !list.length) {
                  that.hasLoadAll = true
                  return
                }
                if (list.length < 20) {
                  that.hasLoadAll = true
                } else {
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
        }, 100)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/common";
  #choose-project {
    border: 0;

    .title {
      font-size: 16px;
      color: black;
      padding-top: 10px;
    }
    .content {
      font-size: 14px;
      color: #666666 !important;
      margin-top: 5px;
    }
    .add-btn {
      width: 75px;
      height: 75px;
      background-color: #dcdcdc;
      border-radius: 5px;
      color: white;
      font-size: 60px;
      line-height: 75px;
      text-align: center;
    }
    .add-field {
      padding-left: 10px;
    }
  }
</style>
