<template>

  <div class="main" id="allUser">
     <q-toolbar class='header'>
        <q-toolbar class='fix'>
             <a @click="$router.back(-1)"><q-item-side left  icon='keyboard arrow left' class='reback'/></a>
            <q-toolbar-title class='header-title'>
              类型
            </q-toolbar-title>
            <a class="top-nav-right" @click="toSave">保存</a>
       </q-toolbar>
    </q-toolbar>
    <div class="full-width">
      <q-item class="full-width bg-primary jobs-title" v-if="names.length>0">
        <q-item-tile class="color-black mb-8 mt-10 bg-primary">已选工作内容</q-item-tile>
      </q-item>
       <q-item class="bg-primary jobs-tags" v-if="names.length>0">
          <q-chips-input icon-right="close"  @input="value => remove(value.index)" v-model="names"  color="lightGray"  chips-color="lightGray" chips-bg-color="white" />
          <!-- <q-chip icon-right="close" color="white" text-color="lightGray" v-for="v, i in names" :key="i" class="job-item" @click="remove(i)">
          {{v}}
        </q-chip> -->
      </q-item>
      <div class="parent" v-for="item in lists" :key="item.id">
        <div  @click="getChildList(item.id,item.name)">
        <q-item  v-ripple.mat class="full-width underline user-item">
          <q-item-main :label="item.name" />
          <q-item-side right icon="done" class="active" v-if="ids.indexOf(item.id) !== -1"/>
          <q-item-side right icon="arrow drop down" v-if="!hasChildren[item.id]"/>
        </q-item>
        </div>
         <div class="child bg-primary" v-if="parentId===item.id" v-for="vo in children" :key="vo.id" >
          <q-item  v-ripple.mat class="full-width underline user-item" @click.native="choose(vo.id,vo.name)">
            <q-item-main :label="vo.name" />
            <q-item-side right icon="done" class="active" v-if="ids.indexOf(vo.id) !== -1" />
          </q-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../common'
export default {
  data () {
    return {
      lists: [],
      parentId: '',
      children: [],
      hasChildren: [],
      isOpen: false,
      ids: [],
      names: [],
      jobs: []
    }
  },
  methods: {
    remove (names) {
      console.log(names)
      let index = 0
      for (var key in this.names) {
        if (names.indexOf(this.names.key) === -1) {
          index = key
        }
      }
      console.log(index)
      this.ids.splice(index, 1)
      this.jobs.splice(index, 1)
    },
    async getList () {
      let resp = await request('data/jobAction/category?category=MAINTAIN', 'get')
      this.lists = resp.data.resultMsg
    },
    async getChildList (parentId, parentName) {
      this.parentId = parentId
      if (!this.isOpen) {
        let resp = await request('data/jobAction/parent?parentId=' + parentId, 'get')
        this.children = resp.data.resultMsg
        this.isOpen = true
        if (this.children.length === 0 || !this.children.length) {
          this.hasChildren[parentId] = true
          this.choose(parentId, parentName)
        }
      } else {
        this.isOpen = false
        this.children = []
      }
    },
    choose (id, name) {
      let job = { 'description': '', 'actionId': id }
      if (this.ids.indexOf(id) !== -1) {
        this.jobs.splice(this.jobs.findIndex(v => v === job), 1)
        this.names.splice(this.names.findIndex(v => v === name), 1)
        this.ids.splice(this.ids.findIndex(v => v === id), 1)
      } else {
        this.ids.push(id)
        this.names.push(name)
        this.jobs = [...this.jobs, job]
      }
      console.log(this.jobs)
    },
    toSave () {
      let info = { 'names': this.names, 'jobs': this.jobs, 'ids': this.ids }
      let form = JSON.parse(localStorage.getItem('form'))
      form.tags = this.names
      form.jobs = this.jobs
      form.jobObg = info
      localStorage.setItem('form', JSON.stringify(form))
      this.$router.back()
    }
  },
  mounted () {
    this.getList()
    let jobObg = JSON.parse(localStorage.getItem('form'))
    if (jobObg.jobObg.ids) {
      this.ids = jobObg.jobObg.ids
      this.names = jobObg.jobObg.names
      this.jobs = jobObg.jobObg.jobs
      localStorage.removeItem('jobs')
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#allUser {
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
  .user {
    min-width: auto;
  }
  .child {
    padding-left: 26px;
  }
}
</style>
