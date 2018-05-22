<template>
  <q-modal v-model="jobActionModal" :content-css="{minWidth: '100wh', minHeight: '100vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <a @click="back" class="back-a font-14">
          <q-item-side left  icon="keyboard arrow left" class="back-left "/>
          返回
        </a>           
        <q-toolbar-title class="header-title">
          工作内容选择
        </q-toolbar-title>
        <a class="top-btn float-right" @click="save">完成</a>
      </q-toolbar>

      <div class="layout-padding">
        <div class="full-width" id="job-action">
          <div class="full-width">
            <div class="bg-primary jobs-tags pt-5">
              <div class="m-5">
                <q-chip icon-right="close" color="white" text-color="lightGray" class="job-item" v-for="(item, index) in displayJobs" :key="index" v-if="item.visible" @click="removeJob(index)">
                {{item.name}}
              </q-chip>
              </div>
            </div>
            <q-item  v-ripple.mat class="full-width underline user-item">
              <q-item-main label="可选择的工作内容" />
              <q-item-side class="active" right icon="add" @click.native="addCustom" />
              <span class="active" @click="showCustomModal">添加工作内容</span>
            </q-item>
            <job-action :tree="tree" :list="tree" :jobs.sync="jobs"></job-action>
          </div>
        </div>
         <q-modal v-model="custom" minimized :content-css="{padding: '20px'}" ref="modalRef" id="addjobs">
          <div class="job-title">添加工作内容</div>
            <div class="job-ins-title text-center">工作内容描述请少于7个字</div>
            <q-input class="job-input mt-10" placeholder="输入内容" type="text" v-model="content"></q-input>
            <div class="modal-buttons row">
            <q-btn class="job-btn" v-close-overlay  label="取消" />
            <q-btn class="job-btn active" v-close-overlay label="确定" @click="addCustomAction" />
          </div>
        </q-modal>
      </div>
    </q-modal-layout>
  </q-modal>       
</template>

<script>
import { request } from '../../common'
import _ from 'lodash'
import JobAction from './JobAction'
import eventBus from '../../eventBus'
import JobActionMixin from '../../mixin/JobActionMixin'

export default {
  props: ["tree", "jobsCopy", "jobActionIds", "jobActionNames"],
  components: {
    JobAction
  },
  mixins: [
    JobActionMixin
  ],
  
  data () {
    return {
      content: '',
      custom: false,
      jobActionModal:false,
      jobs:[]
    }
  },

  methods: {
    init(){
      this.content = ''
      this.custom = false,
      this.jobActionModal = false
      this.jobs.splice(0, this.jobs.length)
    },
    showCustomModal () {
      this.content = ''
      this.custom = true
    },
    
    removeJob(index){
      let job = this.jobs[index]
      if(job.other){
        this.jobs.splice(index, 1)
        return      
      }
     
      let actionId = job.actionId
      console.log("actionId: "+actionId)
      console.log("actionId: "+typeof actionId)

      let action = this.findAction(this.tree, actionId)
      console.log("action:"+action.id+"-"+action.name)

      let outIds = []
      this.uncheckChildren(action, outIds)    
        
      this.uncheckParent(this.tree, outIds, action.id)     
    
      let jobs = []
      for(let i = 0; i<this.jobs.length; ++i){
        let one = this.jobs[i]
        if(outIds.indexOf(one.actionId) === -1) {
          jobs.push(one)
        }
      }
      console.log("jobs: "+jobs)
      this.jobs.splice(0, this.jobs.length)
      for(let i = 0; i<jobs.length; ++i){
        this.jobs.push(jobs[i])
      }

      console.log("uncheck: "+this.jobs)

      this.$emit('update:jobs', this.jobs)
      this.$forceUpdate()    
    },
    back() {
      console.log("back")
        
      this.$q.dialog({
        title: '取消选择',
        message: '点击确定将不会被保留所选择的信息，您确定要取消操作吗？',
        ok: '确定',
        cancel: '取消'
      }).then(() => {
        this.init()
      }).catch(() => {
        //TODO
      })
   
    },
       
    addCustomAction () {      
      if (this.content === '') {
        this.$q.notify({ message: '工作内容不能为空', timeout: 2000, type: 'warning' })
        return false
      }
      let job = { 'other': this.content }
      this.jobs.push(job)
    },   
    
    save () {
      this.jobsCopy.splice(0, this.jobsCopy.length)
      for(let i = 0; i<this.jobs.length; ++i){
        this.jobsCopy.push(this.jobs[i])
      }

      this.$emit('update:jobsCopy', this.jobsCopy)
      this.init()
    }
  },
  mounted() {
    let that = this    
    
    console.log('mounted job-action-modal')
    eventBus.$on('show-job-action-modal', () => {
      console.log('show-job-action-modal')
      that.jobActionModal = true

      console.log("mounted.jobsCopy.length:"+that.jobsCopy.length)
      _.forEach(that.jobsCopy, v => {  
        that.jobs.push(v)
      })
    })
  }
 
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#job-action {
  .jobs-title {
    padding-top: 3px !important;
    padding-bottom: 1px !important;
  }
  .jobs-tags {
    padding-top: 0px;
  }
  .user-item:hover {
    background: none;
  }
  .search-field {
    background: #cccccc;
    height: 50px;
  }
  .search-field .btn {
    background-color: white;
    text-align: center;
    width: 96%;
    margin-left: 2%;
  }
  .auto-width {
    min-width: auto !important;
  }
  .child {
    padding-left: 26px;
  }
}
#addjobs {
  .job-title {
    color: #000000;
    font-size: 16px;
    padding-bottom: 10px;
    text-align: center;
  }
  .job-ins-title {
    color: #888888;
    font-size: 14px;
  }
  .job-input {
    border: 1px solid #dddddd;
    padding: 8px !important;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .job-btn {
    border-radius: 0px;
    font-size: 14px;
    padding: 0px;
    width: 48%;
  }
  .border-right {
    border-right: 1px solid #e8e8e8;
  }
  .border-top {
    border-top: 1px solid #e8e8e8;
  }
}
</style>

