<template>
    <q-layout view="Hhh lpr Fff">
      <q-layout-header>
        <q-toolbar>
           <a @click="back" class="back-a font-14">
            <q-item-side left  icon="keyboard arrow left" class="back-left "/>
            返回
          </a>
          <q-toolbar-title class="header-title">
            {{ isEdit? "修改" : "记录" }}养护内容
          </q-toolbar-title>
          <q-item-side class="white-right" right/>
        </q-toolbar>
      </q-layout-header>
      <q-page-container>
      <q-page id="maintenace-page">
    <q-list>
       <q-field
         @blur="$v.jobs.$touch"
        @keyup.enter="operate"
        :error="$v.jobs.$error"
         error-label="请先选择工作内容">
          <q-item class="mt-6" @click.native="showJobActionModal">
            <q-item-side label class="font-14">工作内容选择</q-item-side>
            <q-item-main></q-item-main>
            <q-item-side right icon="keyboard_arrow_right" class="color-gray"></q-item-side>
          </q-item>
       </q-field>
      <q-item-separator class="mt-0 mb-0"/>
        <div class="bg-primary jobs-tags">
          <div class="m-5">
            <q-chip icon-right="close" color="white" text-color="lightGray" class="job-item bg-white" v-for="(item, index) in displayJobs" :key="index"  v-if="item.visible" @click="removeJob(index)">
            {{item.name}}
            </q-chip>
          </div>
        </div>
    </q-list>
    <q-list class="mt-6 bg-white pb-8 row col-12 box pt-10 font-14 underline" >
      <q-list-header class="font-14 col-2 h-35">备注</q-list-header>
      <q-input class="remark-field col-9 ml-8 p-8 text-left" v-model="description"  placeholder="输入内容" type="textarea" rows="6" hide-underline/>
    </q-list>
    <q-list class="mt-6 bg-white pb-8">
      <q-list-header class="font-14">现场拍照</q-list-header>
      <div class="row">
        <div class="w-100 h-100 ml-10" v-for="(v, i) in pictures" :key="i">
          <img :src="v.previewUrl"  preview-title-enable="false" :key="i" @click="imagePreview(i)" class="full-height full-width">
          <q-icon class="img-close" @click.native="cancelUploadImage(i)" color="grey" name="ion-close-circled"/>
        </div>
        <div class="w-100 h-100 ml-10">
          <q-btn icon="camera alt" size="35px" @click="openCamera" class="camera-button full-height full-width bg-primary"/>
        </div>
        <q-btn class="full-width btn no-radius font-14 " @click="save()">{{ isEdit? "修改" : "保存" }}</q-btn>
      </div>
    </q-list>
    <job-action-modal :tree="tree" :jobsCopy.sync="jobs" :jobActionIds="jobActionIds" :jobActionNames="jobActionNames"></job-action-modal>
      </q-page>
      </q-page-container>
  </q-layout>
</template>

<script>
import _ from 'lodash'
import { request, uploadFiles, deleteFiles } from '../../common'
import { required } from 'vuelidate/lib/validators'
import { server } from '../../const'
import JobActionModal from './JobActionModal'
import eventBus from '../../eventBus'
import JobActionMixin from '../../mixin/JobActionMixin'
import { ImagePreview } from 'vant'

export default {
  components: {
    JobActionModal
  },
  mixins: [
    JobActionMixin
  ],
  data () {
    return {
      jobgroup: null,
      description: '',
      pictures: [],
      jobs: [],
      tree: null,
      jobActionIds: [],
      jobActionNames: [],
      jobGroupId: null,
      codeId: null
    }
  },
  validations: {
    jobs: { required }
  },
  methods: {
    showJobActionModal () {
      console.log('show-job-action-modal')
      eventBus.$emit('show-job-action-modal')
    },
    removeJob (index) {
      this.jobs.splice(index, 1)
    },
    save () {
      let that = this
      let jobs = []
      for (let i = 0; i < this.jobs.length; i++) {
        let v = this.jobs[i]
        if (v.other) {
          jobs.push(v)
          continue
        }
        let action = that.findAction(that.tree, v.actionId)
        if (!action.children) {
          jobs.push(v)
          continue
        }
      }

      console.log(jobs)

      let pictures = []
      if (this.pictures.length > 0) {
        let pics = _.map(this.pictures, 'contentUrl')
        pictures = pics
      }

      let data = {
        'description': this.description,
        'jobs': jobs,
        'pictures': pictures
      }
      let url = 'jobGroup/'
      let mes = ''

      if (this.isEdit) {
        data.jobGroupId = this.jobGroupId
        url += 'edit'
        mes = '养护记录修改成功！'
      } else {
        data.codeId = this.codeId
        url += 'create'
        mes = '养护记录保存成功！'
      }
      console.log(url)

      request(url, 'post', data, 'json', true).then(resp => {
        if (resp) {
          this.$q.notify({
            timeout: 2000,
            type: 'positive',
            message: mes
          })
          this.$router.push('/jobGroup/detail?jobGroupId=' + resp.data.resultMsg)
        }
      })
    },

    back () {
      this.$router.goBack(this.isEdited, '取消操作', '点击确定将不会被保留所选择的信息，您确定要取消操作吗？')
    },
    imagePreview (index) {
      let previewArray = _.map(this.pictures, (img) => {
        return server.PREVIEW_API + img.contentUrl
      })
      console.log(previewArray)
      ImagePreview(previewArray, index)
    },
    cancelUploadImage (index) {
      this.$q.loading.show()
      deleteFiles(this.pictures[index], index)
    },
    openCamera () {
      if (navigator.camera) {
        navigator.camera.getPicture(imgData => {
          this.$q.loading.show()
          uploadFiles(imgData)
        }, errorMsg => {
        }, { destinationType: Camera.DestinationType.DATA_URL })
      }
    },
    async getTree () {
      let resp = await request('data/jobAction/tree?category=MAINTAIN', 'get')
      if (resp) {
        this.tree = resp.data.resultMsg
        this.buildJobAction(this.tree, '')
      }
    },
    buildJobAction (list, parent) {
      let jobActionIds = this.jobActionIds
      let jobActionNames = this.jobActionNames
      _.forEach(list, v => {
        jobActionIds.push(v.id)
        let name = (parent ? parent + '-' : '') + v.name
        jobActionNames.push(name)
        if (v.children) {
          this.buildJobAction(v.children, name)
        }
      })
    },
    async getDetail () {
      let resp = await request(
        'jobGroup/detail?jobGroupId=' + this.jobGroupId,
        'get',
        null,
        'json',
        true
      )
      if (resp) {
        this.jobgroup = resp.data.resultMsg
        this.codeId = this.jobgroup.code.id
        this.description = this.jobgroup.description
        let pictures = []
        _.forEach(this.jobgroup.pictures, v => {
          pictures.push(v.filePath)
        })
        this.pictures = pictures
        let jobs = this.jobs
        _.forEach(this.jobgroup.jobs, v => {
          let one = {
            jobId: v.id,
            actionId: null,
            other: null
          }
          if (v.other) {
            one.other = v.other
          } else {
            one.actionId = _.toInteger(v.action.id)
          }
          jobs.push(one)
        })
      }
    }
  },
  computed: {
    // 计算属性的 getter
    isEdit: function () {
      console.log('isedit: ' + this.jobGroupId)
      return _.isInteger(this.jobGroupId)
    },
    thumbnails: function () {
      let arr = []
      _.forEach(this.pictures, v => {
        arr.push(server.THUMBNAIL_API + v)
      })
      return arr
    },
    previews: function () {
      let arr = []
      _.forEach(this.pictures, v => {
        arr.push(server.PREVIEW_API + v)
      })
      return arr
    }
    // ,
    // displayJobs: function() {
    //   let arr = []

    //   for(let i=0; i<this.jobs.length; i++){
    //     let v = this.jobs[i]

    //     if(v.other){
    //       arr.push({name:v.other, visible:true})
    //     } else {
    //       let action = this.findAction(this.tree, v.actionId)
    //       let visible = true
    //       if(action.children){
    //         visible = false
    //       }

    //       let index = this.jobActionIds.indexOf(v.actionId)
    //       let name = this.jobActionNames[index]

    //       arr.push({name:name, visible:visible})

    //     }
    //   }

    //   return arr
    // }
  },
  async mounted () {
    await this.getTree()
    let jobGroupId = this.$route.query.jobGroupId
    let codeId = this.$route.query.codeId
    if (jobGroupId) {
      this.jobGroupId = _.toInteger(jobGroupId)
      console.log('jobGroupId=' + this.jobGroupId)
      console.log('jobGroupId:' + typeof this.jobGroupId)
      this.getDetail()
    } else if (codeId) {
      this.codeId = _.toInteger(codeId)
    } else {
      this.$q.notify({
        timeout: 2000,
        type: 'info',
        message: '请扫描二维码进入！'
      })
      this.$router.goBack()
      return
    }

    eventBus.$on('upload-success', resp => {
      this.$q.loading.hide()
      this.pictures.push(resp)
    })
    eventBus.$on('delete-success', (params) => {
      this.$q.loading.hide()
      let index = parseInt(params.idx)
      this.pictures.splice(index, 1)
      this.$q.dialog({
        title: '提示',
        message: params.msg
      })
    })
  }
}
</script>

<style lang="scss">
@import "../../assets/css/common";
#maintenace-page {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .q-chip {
    background-color: white !important;
  }
  .q-list {
    border: 0;
    padding: 0;
  }
  .no-radius {
    border-radius: 0px;
  }
  .q-item {
    background-color: white;
  }

  .q-item-side {
    color: black;
  }

  .remark-field {
    padding: 8px 10px;
    width: 96%;
    left: 2%;
    font-size: 14px;
    border-style: solid;
    border-width: 1px;
    border-color: lightgray;
    border: none;
  }
  .auto {
    min-width: auto;
  }
  .img-close {
    margin-left: 70px;
    margin-top: -195px;
    font-size: 28px;
  }
}
</style>
