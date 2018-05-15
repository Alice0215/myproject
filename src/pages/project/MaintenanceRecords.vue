<template>
  <q-layout view="Hhh lpr Fff">
    <q-page-container>
      <q-page id="maintenance_records">
        <q-infinite-scroll :handler="load">
          <q-list separator v-if="joblist.length > 0">
            <q-item v-for="item in joblist"
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { request } from '../../common'
import eventBus from '../../eventBus'

export default {
  data () {
    return {
      joblist: [],
      pageNo: 1,
      hasLoadAll: false,
      projectId: this.$route.query.projectId
    }
  },
  methods: {
    
    async load (index, done) {
      let that = this
      setTimeout(() => {
        if (!that.hasLoadAll) {
          request('jobGroup/list/byProject?projectId=' + that.projectId + '&pageNo=' + that.pageNo + '&pageSize=20', 'get', '', 'json', true).then(response => {
            if (response) {
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
              if (that.joblist.length > 0) {
                that.joblist = that.joblist.concat(list)
              } else {
                that.joblist = list
              }
              if (this.joblist.length > 0) {
                eventBus.$emit('has-maintenance-records')
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

<style lang='scss'>
@import "../../assets/css/_variable.scss";
#maintenance_records {
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
}
</style>