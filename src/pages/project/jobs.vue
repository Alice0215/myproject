<template>
  <div>
    <q-layout view="Hhh lpr Fff">
      <q-layout-header>
        <q-toolbar>
          <a @click="$router.goBack(isEdited,'取消选择', '点击确定将不会被保留所选择的信息，您确定要取消操作吗？')" class="back-a">
            <q-item-side left  icon="keyboard arrow left" class="back-left"/>
            返回
          </a>
          <q-toolbar-title class="header-title">
            工作内容
          </q-toolbar-title>
         <a class="top-btn float-right" @click="save">保存</a>
        </q-toolbar>
      </q-layout-header>
      <q-page-container>
      <q-page>
        <div class="full-width" id="job-action">
          <div class="full-width">
          <div class="bg-primary jobs-tags pt-5">
            <div class="m-5">
              <q-chip icon-right="close" color="white" text-color="lightGray" class="job-item" v-for="(item, index) in jobs" :key="index"  @click="remove(index)">
               {{item.fname}}<span v-if="item.description!==''">-{{item.description}}</span>
             </q-chip>
            </div>
          </div>
          <q-item  v-ripple.mat class="full-width underline user-item">
            <q-item-main label="可选择的工作内容" />
            <q-item-side class="active" right icon="add" @click.native="addWork" />
            <span class="active" @click="addWork">添加工作内容</span>
          </q-item>
          <div class="parent"  v-for="item in lists" :key="item.id">
            <q-item  v-ripple.mat class="full-width underline user-item">
              <q-item-side left icon="expand more" v-if="item.children" class="auto-width"  @click.native="getChildList(item.id,item.children,item.name)"/>
              <q-item-main :label="item.name" />
              <q-item-side right icon="radio button unchecked"   v-if="fids.indexOf(item.id) === -1" @click.native="choose(item.name,item.id,'','',item.children)"/>
              <q-item-side right icon="check circle" class="active"  v-if="fids.indexOf(item.id) !== -1" @click.native="choose(item.name,item.id,'','',item.children)"/>
            </q-item>
            <div class="child bg-primary" v-if="parentId===item.id" v-for="vo in children" :key="vo.id">
              <q-item  v-ripple.mat class="full-width underline user-item" @click.native="choose(item.name,item.id,vo.id,vo.name,item.children)">
                <q-item-main :label="vo.name" />
                <q-item-side right icon="radio button unchecked"   v-if="selected.indexOf(item.id+'-'+vo.id) === -1"/>
                <q-item-side right icon="check circle" class="active"  v-if="selected.indexOf(item.id+'-'+vo.id) !== -1"/>
              </q-item>
            </div>
          </div>
        </div>
        </div>
         <q-modal v-model="open" minimized :content-css="{padding: '20px'}" ref="modalRef" id="addjobs">
          <div class="job-title">添加工作内容</div>
          <div class="job-ins-title text-center">工作内容描述请少于7个字</div>
          <q-input class="job-input mt-10" placeholder="输入内容" type="text" v-model="content"></q-input>
          <div class="modal-buttons row">
          <q-btn class="job-btn" v-close-overlay  label="取消" />
          <q-btn class="job-btn active" v-close-overlay label="确定" @click="doAdd" />
          </div>
        </q-modal>
    </q-page>
    </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { request } from '../../common'
import { Dialog } from 'quasar'
import _ from 'lodash'
export default {
  data () {
    return {
      lists: [],
      parentId: '',
      children: [],
      isOpen: false,
      open: false,
      jobs: [],
      selected: [],
      fids: [],
      content: '',
      chooseId: '',
      isEdited: false
    }
  },
  methods: {
    remove (index) {
      this.jobs.splice(index, 1)
      this.fids.splice(index, 1)
      this.selected.splice(index, 1)
    },
    addWork () {
      this.content = ''
      this.open = true
    },
    doAdd () {
      this.isEdited = true
      if (this.content === '') {
        this.$q.notify({ message: '工作内容不能为空', timeout: 2000, type: 'warning' })
        return false
      }
      let job = { 'actionId': '', 'description': '', 'fid': '', 'fname': this.content }
      this.jobs = [...this.jobs, job]
    },
    async getList () {
      let resp = await request('data/jobAction/category?category=MAINTAIN', 'get')
      this.lists = resp.data.resultMsg
    },
    async getChildList (parentId) {
      if (!this.isOpen || (this.isOpen && this.parentId !== parentId)) {
        let resp = await request('data/jobAction/parent?parentId=' + parentId, 'get')
        if (resp) {
          this.children = resp.data.resultMsg
          this.isOpen = true
          this.parentId = parentId
        }
      } else {
        this.children = []
        this.isOpen = false
      }
    },
    async choose (fname, fid, id, name, isChildren) {
      if (id === '' && isChildren) {
        if (!this.isOpen || (this.isOpen && this.chooseId !== fid)) {
          let resp = await request('data/jobAction/parent?parentId=' + fid, 'get')
          if (resp) {
            this.children = resp.data.resultMsg
            this.chooseId = fid
            _.forEach(resp.data.resultMsg, v => {
              this.handleChoose(fid, v.id, v.name, fname)
            })
          }
        } else {
          _.forEach(this.children, v => {
            this.handleChoose(fid, v.id, v.name, fname)
          })
        }
      } else {
        this.handleChoose(fid, id, name, fname)
      }
    },
    handleChoose (fid, id, name, fname) {
      this.isEdited = true
      let select = fid + '-' + id
      if (this.selected.indexOf(select) !== -1) {
        let index = this.selected.findIndex(v => v === fid + '-' + id)
        this.jobs.splice(index, 1)
        this.selected.splice(index, 1)
        this.fids.splice(index, 1)
      } else {
        let job = { 'actionId': id, 'description': name, 'fid': fid, 'fname': fname }
        this.selected.push(select)
        this.fids.push(fid)
        this.jobs = [...this.jobs, job]
      }
    },
    save () {
      this.$store.commit('Maintenance/setJobGroup', this.jobs)
      this.$router.goBack()
    }
  },
  mounted () {
    this.getList()
    let jobs = this.$store.getters['Maintenance/getJobGroup']
    if (!_.isUndefined(jobs) && !_.isNull(jobs)) {
      this.jobs = jobs
      _.forEach(this.jobs, u => {
        let select = u.fid + '-' + u.actionId
        this.selected.push(select)
        this.fids.push(String(u.fid))
      })
    }
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
  }
  .border-right {
    border-right: 1px solid #e8e8e8;
  }
  .border-top {
    border-top: 1px solid #e8e8e8;
  }
}
</style>
