<template>
  <q-layout view="Hhh lpr Fff">
    <q-page-container>
      <q-page id="maintenance_records">
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
                      <span v-else class="ml-5">{{ v.action.name }}</span>
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
import InfiniteScroll from '../../mixin/InfiniteScroll'

export default {
  data () {
    return {
      projectId: this.$route.query.projectId,
    }
  },
  mixins: [
    InfiniteScroll
  ],
  mounted () {
    this.apiUrl = 'jobGroup/list/byProject?projectId=' + this.projectId
    this.scroll = this.$refs.scroll
    this.infiniteScrollCallback = function () {
      if (this.list.length > 0) {
        eventBus.$emit('has-maintenance-records')
      }
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