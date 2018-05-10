<template>
  <div>
   <q-layout view="Hhh lpr Fff">
      <q-layout-header>
        <q-toolbar>
          <a @click="back" class="back-a">
            <q-item-side left  icon="keyboard arrow left" class="back-left"/>
            返回
          </a>
          <q-toolbar-title class="header-title">
          {{this.formData.projectName}}
          </q-toolbar-title>
         <a class="top-btn float-right" @click="edit">保存</a>
        </q-toolbar>
      </q-layout-header>
      <q-page-container>
      <q-page>
      <div class="full-width card" id="edit">
      <q-field
         @blur="$v.formData.projectName.$touch"
        @keyup.enter="add"
        :error="$v.formData.projectName.$error"
         error-label="请添加项目名称">
        <div class="row col-12 box pt-10 font-14 underline">
          <span class="col-4 h-35 pt-10">项目名称<span class="required">*</span></span>
          <q-input text-dark required v-model="formData.projectName" placeholder="请输入项目名称" class="col-7 ml-8 p-8 text-right"/>
        </div>
      </q-field>
      <q-field
         @blur="$v.formData.locationJson.$touch"
        @keyup.enter="add"
        :error="$v.formData.locationJson.$error"
         error-label="请获取当前位置">
         <div class="row col-12 box pt-10 font-14 underline">
          <span class="col-4 h-35 pt-10">项目地址<span class="required">*</span></span>
          <q-input color="amber" v-model="formData.address" @click="openMap"
                class="col-7 ml-8 p-8 text-right" disable  placeholder="输入地址/定位地址"/>
        </div>
      </q-field>
      <q-field
         @blur="$v.formData.projectTypeId.$touch"
        @keyup.enter="edit"
        :error="$v.formData.projectTypeId.$error"
         error-label="请选择项目类别">
       <q-item link class="full-width underline users" @click.native="chooseProjectType">
          <q-item-side> 项目类型</q-item-side>
          <q-item-main class="text-right" >
            {{ formData.selectProjectType ? formData.selectProjectType.name : ''}}
          </q-item-main>
          <q-item-side right icon="expand more" />
      </q-item>
      </q-field>
      <q-field
            @blur="$v.formData.managerUsers.$touch"
            @keyup.enter="edit"
            :error="$v.formData.managerUsers.$error"
            error-label="请添加项目负责人">
        <q-item class="underline" @click.native="chooseUser('TL')" >
          <q-item-side>  项目负责人</q-item-side>
          <q-item-main class="text-right" v-line-clamp:20="1" >
            <q-item-tile>
              <span v-for="v in formData.managerUsers" :key="v.userId"
                    icon-right="clear">
              {{ v.fullname }}</span>
            </q-item-tile>
          </q-item-main>
          <q-item-side right  icon="expand more" />
        </q-item>
      </q-field>
      <q-item class="underline"  @click.native="chooseUser('TM')">
        <q-item-side>  项目成员</q-item-side>
        <q-item-main class="text-right" v-line-clamp:20="1">
          <q-item-tile>
            <span v-for="v in formData.memberUsers" :key="v.userId">
              {{ v.fullname }}
          </span>
          </q-item-tile>
        </q-item-main>
        <q-item-side right icon="expand more" />
      </q-item>
      <div class="row col-12 box pt-20 font-14">
        <span class="col-4 h-35">项目简介<span class="required">*</span></span>
          <q-input
        type="textarea"
        class="col-7 ml-8 p-8 text-right"
        v-model="formData.projectDesc"
        rows="5"
        :max-height="50"/>
      </div>
      </div>
      </q-page>
      </q-page-container>
   </q-layout>
    <q-modal v-model="selectProjectTypeOpen" :content-css="{minWidth: '80vw', minHeight: '80vh'}" position="bottom">
      <q-modal-layout id="choose-operator-detail">
        <q-toolbar slot="header">
          <q-item-side v-close-overlay class="font-14">取消</q-item-side>
          <q-toolbar-title class="header-title">
            选择项目类型
          </q-toolbar-title>
        </q-toolbar>
        <q-list no-border>
          <q-item v-for="type in projectTypes" :key="type.id" v-if="type.show !== false"
                  @click.native="chooseType(type)"
                  :class="{'text-main-color bg-white': type.checked}" class="underline">
            <q-item-main :label="type.name" />
            <q-item-side right icon="done" class="text-main-color" v-if="type.checked" />
          </q-item>
        </q-list>
      </q-modal-layout>
    </q-modal>
    <q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}" position="bottom">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-item-side v-close-overlay class="font-14">关闭</q-item-side>
          <q-toolbar-title class="header-title">
          </q-toolbar-title>
          <q-item-side class="font-14" v-close-overlay  @click.native="completed" right>完成</q-item-side>
        </q-toolbar>
        <q-search v-model="search" icon="search" type="text" class="m-10 underline" clearable placeholder="搜索"/>
        <q-list-header>{{ jobType === 'TL' ? '已选负责人' : '已选成员' }}</q-list-header>
        <div class="m-10">
          <q-chip v-for="(v, i) in formData.selectedUsers" :key="v.userId" @click="removeUser(v, i, null)" icon-right="clear">
            {{ v.fullname }}
          </q-chip>
        </div>
        <q-list inset-separator no-border>
          <q-list-header>{{ '人员列表(' + count + ')'}}</q-list-header>
          <q-item v-for="user in users" :key="user.userId" v-if="user.show !== false">
            <q-item-side icon="account circle" class="user"/>
            <q-item-main :label="user.fullname" />
            <q-item-side>
              <q-checkbox v-model="user.checked" @input="choose(user)" />
            </q-item-side>
          </q-item>
        </q-list>
      </q-modal-layout>
    </q-modal>
  </div>
</template>

<script>
import { request } from '../../common'
import ProjectEditMixin from '../../mixin/ProjectEditMixin'
import _ from 'lodash'
export default {
  mixins: [
    ProjectEditMixin
  ],
  data () {
    return {}
  },
  methods: {
    prepareData () {
      let project = this.$store.getters['Project/getEditData']
      console.log(project)
      this.formData.projectName = project.projectName
      this.formData.projectId = Number.parseInt(project.id)
      this.formData.locationJson = project.location
      this.formData.address = project.address
      this.formData.selectProjectType = project.projectType
      this.formData.managerUsers = _.map(project.TL, 'user')
      _.forEach(this.formData.managerUsers, v => {
        v.userId = Number.parseInt(v.id)
        v.checked = true
      })
      this.formData.memberUsers = _.map(project.TM, 'user')
      _.forEach(this.formData.memberUsers, v => {
        v.userId = Number.parseInt(v.id)
        v.checked = true
      })
      this.formData.projectDesc = project.projectDesc
      this.formData.projectTypeId = Number.parseInt(project.projectType.id)
    },
    back () {
      this.$store.commit('Project/setCurrent', null)
      this.$store.commit('Location/setCurrent', null)
      this.$store.commit('Project/setEditData', null)
      this.$router.goBack(this.isEdited, '确认放弃创建项目吗？', '离开当前页面您的项目信息将不会保存')
    },
    edit () {
      this.$v.formData.$touch()
      if (this.$v.formData.$error) {
        return false
      }
      if (this.formData.projectName.length >= 255) {
        this.$q.notify('项目名称太长，已超过255字')
        return false
      }
      if (this.formData.projectDesc.length > 999) {
        this.$q.notify('项目简介太长，已超过1000字')
        return false
      }
      let projectJobs = this.dealData()
      let data = {
        'projectTypeId': this.formData.projectTypeId,
        'projectId': this.formData.projectId,
        'projectName': this.formData.projectName,
        'projectDesc': this.formData.projectDesc,
        'projectJobs': projectJobs
      }
      let location = this.$store.getters['Location/getCurrent']
      // if (this.formData.locationJson !== '') {
      //   data.locationJson = JSON.stringify(this.formData.locationJson)
      // }
      console.log(!_.isNull(location))
      if (!_.isUndefined(location) && !_.isNull(location)) {
        this.formData.address = location.formattedAddress
        this.formData.locationJson = location
        data.locationJson = JSON.stringify(this.formData.locationJson)
      }
      let params = new URLSearchParams()
      for (var key in data) {
        params.append(key, data[key])
      }
      request('project/edit', 'put', data, 'json', true)
        .then(response => {
          if (response) {
            this.$q.dialog({
              title: '提示',
              message: '项目修改成功！'
            })
            this.$store.commit('Project/setCurrent', null)
            this.$store.commit('Location/setCurrent', null)
            this.$store.commit('Project/setEditData', null)
            this.$router.push('/qcode/list?projectId=' + this.formData.projectId)
          }
        })
    },
    openMap () {
      this.$store.commit('Project/setCurrent', this.formData)
      this.$router.push('map?projectId=' + this.formData.projectId)
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#edit {
  .users {
    font-size: 14px;
    .user {
      padding: 3px;
      text-align: center;
      display: inline-block;
      background-color: #dcdcdc;
      border-radius: 2px;
      margin-left: 3px;
    }
  }
  .underline {
    border-bottom: 1px solid #cccccc;
    margin-top: 20px;
  }
  input:not(.no-style):hover {
    border-bottom: none;
  }
  .q-if-inner {
    min-height: 30px !important;
    padding-bottom: 10px;
  }
  .q-if-control.q-icon {
    padding-bottom: 6px;
  }
}
</style>
