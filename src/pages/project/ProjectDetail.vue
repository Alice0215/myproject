<template>
  <div>
   <q-layout view="Hhh lpr Fff">
      <q-layout-header>
        <q-toolbar>
          <a @click="$router.goBack()" class="back-a">
            <q-item-side left  icon="keyboard arrow left" class="back-left"/>
            返回
          </a>
          <q-toolbar-title class="header-title">
          详情
          </q-toolbar-title>
          <q-item-side class="white-right" right v-if="!isEdit"/>
          <!-- <q-item-side class="white-right text-main-color font-14"  right v-if="isEdit" @click.native="$router.push('/project/edit')">修改</q-item-side> -->
         <a class="top-btn float-right" @click="edit" v-if="isEdit">修改</a>
        </q-toolbar>
      </q-layout-header>
      <q-page-container>
      <q-page>
      <div class="full-width card pt-20" id="projectDetail">
        <q-item class="underline"  @click.native="chooseUser('TM')">
          <q-item-side> 项目名称</q-item-side>
          <q-item-main class="text-right" v-line-clamp:20="1">
            <q-item-tile>
              {{formData.projectName}}
            </q-item-tile>
          </q-item-main>
        </q-item>
        <q-item class="underline"  @click.native="chooseUser('TM')">
          <q-item-side> 位置</q-item-side>
          <q-item-main class="text-right" v-line-clamp:20="1">
            <q-item-tile>
              {{formData.address}}
            </q-item-tile>
          </q-item-main>
        </q-item>
       <q-item link class="full-width underline users">
          <q-item-side> 项目类型</q-item-side>
          <q-item-main class="text-right" >
            {{ formData.selectProjectType ? formData.selectProjectType.name : ''}}
          </q-item-main>
      </q-item>
      <q-item class="underline" @click.native="chooseUser('TL')" >
        <q-item-side>项目负责人</q-item-side>
        <q-item-main class="text-right" v-line-clamp:20="1" >
          <q-item-tile>
            <span v-for="v in formData.TL" :key="v.userId"
                  icon-right="clear">
            {{ v.user.fullname }}</span>
          </q-item-tile>
        </q-item-main>
        <q-item-side right  icon="expand more" />
      </q-item>
      <q-item class="underline"  @click.native="chooseUser('TM')">
        <q-item-side>  项目成员</q-item-side>
        <q-item-main class="text-right" v-line-clamp:20="1">
          <q-item-tile>
            <span v-for="v in formData.TM" :key="v.userId">
              {{ v.user.fullname }}
          </span>
          </q-item-tile>
        </q-item-main>
        <q-item-side right icon="expand more" />
      </q-item>
        <div class="row col-12 box pt-20 font-14">
          <span class="col-4 h-35 pt-10">项目简介</span>
            <q-input
          type="textarea"
          class="col-7 ml-8 p-8 text-right"
          v-model="formData.projectDesc"
          rows="5"
          :max-height="50"
          placeholder="项目简介"/>
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
        </q-toolbar>
        <q-list-header>{{ jobType === 'TL' ? '已选负责人' : '已选成员' }}</q-list-header>
        <div class="m-10">
          <q-chip v-for="v in formData.selectedUsers" :key="v.userId">
            {{ v.user.fullname }}
          </q-chip>
        </div>
        <q-list inset-separator no-border>
          <q-item v-for="user in users" :key="user.userId" v-if="user.show !== false">
            <q-item-side icon="account circle" class="user"/>
            <q-item-main :label="user.fullname" />
            <q-item-side>
              <q-checkbox v-model="user.checked" />
            </q-item-side>
          </q-item>
        </q-list>
      </q-modal-layout>
    </q-modal>
  </div>
</template>

<script>
import { request } from '../../common'
import { jobType } from '../../const'
import _ from 'lodash'
export default {
  data () {
    return {
      projectTypes: [],
      jobType: null,
      users: [],
      selectProjectTypeOpen: false,
      opened: false,
      isTL: false,
      isEdit: false,
      formData: {}
    }
  },
  methods: {
    async getProjectDetail (projectId) {
      this.$q.loading.show()
      request('project/detail?projectId=' + projectId, 'get', '', 'json', true).then(response => {
        if (response) {
          this.$q.loading.hide()
          let info = response.data.resultMsg
          this.formData = this.prepareData(info)
          this.formData.projectName = info.projectName
          this.formData.projectDesc = info.projectDesc
          this.formData.selectProjectType = info.projectType
          this.formData.projectTypeId = info.projectType.id
          if (response.data.resultMsg.location) {
            this.formData.address = info.location.formattedAddress
          }
        }
      })
    },
    async getUsers () {
      this.$q.loading.show()
      const resp = await request('user/all', 'get', {}, true)
      this.$q.loading.hide()
      if (resp) {
        this.users = resp.data.resultMsg
        _.forEach(this.users, v => {
          v.checked = false
        })
      }
    },
    async getProjectType () {
      const resp = await request('projectType/all', 'get')
      if (resp) {
        this.projectTypes = resp.data.resultMsg
        _.forEach(this.projectTypes, v => {
          v.checked = false
          if (this.formData.selectProjectType) {
            if (this.formData.selectProjectType.id === v.id) {
              v.checked = true
            }
          }
        })
      }
    },
    prepareData (resp) {
      let currentUser = this.$store.state.User.current
      let projectJobList = resp.projectJobList
      let TL = []
      let TM = []
      _.forEach(projectJobList, v => {
        let type = v.jobType
        if (type.key === jobType.TL) {
          if (parseInt(currentUser.userId) === parseInt(v.user.id)) {
            this.isEdit = true
          }
          TL.push(v)
        } else {
          TM.push(v)
        }
      })
      resp.TL = TL
      resp.TM = TM
      return resp
    },
    chooseProjectType () {
      this.selectProjectTypeOpen = true
    },
    chooseUser (type) {
      this.opened = true
      this.jobType = type
      if (this.jobType === jobType.TL) {
        this.formData.selectedUsers = _.cloneDeep(this.formData.TL)
      } else {
        this.formData.selectedUsers = _.cloneDeep(this.formData.TM)
      }
      _.forEach(this.users, v => {
        v.checked = false
      })
      _.forEach(this.formData.selectedUsers, u => {
        _.forEach(this.users, v => {
          if (parseInt(u.user.id) === parseInt(v.userId)) {
            v.checked = true
          }
        })
      })
    },
    back () {
      this.$router.goBack(this.isEdited, '确认放弃创建项目吗？', '离开当前页面您的项目信息将不会保存')
    },
    edit () {
      this.$store.commit('Project/setCurrent', this.formData)
      this.$router.push('/project/edit')
    }
  },
  async mounted () {
    this.getUsers()
    this.getProjectType()
    let projectId = this.$route.query.id
    this.getProjectDetail(projectId)
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#projectDetail {
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
