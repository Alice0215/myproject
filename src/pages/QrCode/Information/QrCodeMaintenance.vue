<template>
  <q-layout view="hHh lpr fFf">
    <q-btn-dropdown label="筛选" v-model="dropdown">
      <div class="box font-14">
        <p class="pt-20">日期</p>
        <p class="block"><q-input v-model="startDateFormat" class="time-btn float-left ph-10 title-font-color" @click="chooseData(true)"/><span class="text-center float-left ph-20">——</span><q-input v-model="endDateFormat" class="time-btn ph-10" @click="chooseData(false)"/></p>
        <p>工作内容</p>
        <div class="p-10">
          <q-chip color="light" text-color="tertiary"  v-for="item in jobActions"
                    :key="item.id" @click.native="chooseActionId(item.id)" :class="{'active-btn':actionIds.indexOf(item.id) !== -1}">
          {{item.name}}
          </q-chip>
        </div>
        <div class="btn-field">
          <span class="wp-48 ib border-top text-center pv-10" @click="cancel">取消</span>
          <span class="wp-50 ib border-top text-center pv-10 active-btn" @click="doSearch"> 确定</span>
        </div>
      </div>
    </q-btn-dropdown>
    <q-scroll-area class="scroll-height">
    <q-page-container>
      <q-page id="maintenance">
        <div  class="bg-white mt-10">
          <q-infinite-scroll :handler="load" ref="scroll">
            <q-list separator v-if="list.length > 0">
              <q-item v-for="item in list"
                      :key="item.id"
                      @click.native="$router.push('/jobGroup/detail?jobGroupId='+ item.id)">
                <q-item-main>
                  <q-item-tile class="content">
                    <div class="pv-4 row">
                      <div class="work-content-title">工作内容：</div>
                      <div class="work-content bold" v-line-clamp:20="1">
                        <span v-for="(v, i) in item.jobs" v-if="item.jobs" :key="i">
                          <span v-if="v.action" class="ml-5">{{ v.action.name }}</span>
                        </span>
                      </div>

                    </div>
                  </q-item-tile>
                  <q-item-tile class="content">
                    <div class="pv-4 font-14">
                      <div class="ib font-14">记录人：</div>
                      <div class="ib font-14">{{ item.user.fullname }}</div>
                    </div>
                  </q-item-tile>
                  <q-item-tile>
                    <div class="pv-4 row font-14">
                      <div class="col-8">
                        <div class="inline-flex">
                          <div>时间：</div>
                          <div>{{ item.createTime }}</div>
                        </div>
                      </div>
                      <div class="col-4 text-right btn-light">
                        <div class="font-14">查看详情<q-icon name="keyboard arrow right" size="20px"/></div>
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
        </div>
      </q-page>
    </q-page-container>
    </q-scroll-area>
  </q-layout>
</template>

<script>
import { request } from '../../../common'
import eventBus from '../../../eventBus'
import { date } from 'quasar'
import { global } from '../../../const'
import _ from "lodash";


export default {
  
  props: [
    "codeId"
  ],
  
  data () {
    return {
      dropdown: false,
      startDate: null,
      endDate: null,
      jobActions: [],
      actionIds:[],
      isStartDate: true,

      scroll: null,
      hasLoadAll: false,
      list: [],
      pageNo: 1
    }
  },
    
  methods:{
    load(index, done) {
      console.log("refresher")

      let that = this
      if (that.hasLoadAll) {
        done()
        this.scroll.stop()
        return
      }
     
      setTimeout(() => {
        that.getList(done)
      }, 200)
    },

    async getList(done) {
      let that = this     
      
      let params = {
          "codeId": this.codeId,
          "pageNo": this.pageNo,
          "pageSize": global.pageSize,
          "actionIds": this.actionIds
      }
      if(this.startDate){
        params.from = this.startDate
      }
      if(this.endDate){
        params.to = this.endDate
      }
      let response = await request("jobGroup/list/byCondition", "post", params, "json", true)

      if (response) {
        let list = response.data.resultMsg
        if(_.isArray(list)){
          console.log(list.length)
          if (list.length < global.pageSize) {
            that.hasLoadAll = true            
          } else {
            that.pageNo++
          }
          that.list = that.list.concat(list)
        }
              
      }
      done()
    },

    async getJobAction () {
      let resp = await request('data/jobAction/category?category=MAINTAIN', 'get')
      if(resp){
        this.jobActions = resp.data.resultMsg
      }        
    },
    chooseActionId (id) {
      if (_.includes(this.actionIds, id)) {
        _.remove(this.actionIds, v => {
          this.$forceUpdate()
          return v === id
        })
      } else {
        this.actionIds.push(id)
      }
    },
    chooseData (isStartDate) {
      this.isStartDate = isStartDate
      this.dropdown = false
      eventBus.$emit('open-date-picker', {dateTime: Date.now(), currentMonth: false})
    },
    doSearch () {
      this.dropdown = false

      this.scroll.reset();
      this.hasLoadAll = false;
      this.pageNo = 1;
      this.list = [];   
      this.scroll.resume();

    },
    cancel () {
      this.dropdown = false
      this.actionIds = []
    }
  },
  mounted () {
    this.getJobAction()
    this.scroll = this.$refs.scroll
    eventBus.$on('close-date-picker', arg => {
      if(this.isStartDate){
        this.startDate = arg
      } else {
        this.endDate = arg
      }
      this.dropdown = true
    })
  },

  computed: {
    startDateFormat: function () {
      return date.formatDate(this.startDate, 'YYYY年M月D日')
    },

    endDateFormat: function () {
      return date.formatDate(this.endDate, 'YYYY年M月D日')
    } 
  }
};
</script>

<style lang='scss'>
  @import "../../../assets/css/_variable.scss";
  #common_info {
    .q-list {
      background: white;
    }
    img {
      width: 80px;
      height: 80px;
    }
    .title {
      width: 90px;
      font-size: 15px !important;
    }
    .content {
      color: $text-highlight;
      font-size: 15px !important;
    }
    .btn-right {
      font-size: 15px;
      position: absolute;
      right: 16px;
    }
  }
</style>
