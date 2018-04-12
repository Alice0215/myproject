<template>
  <q-layout id="maintenace-page" class="fit">
   <q-toolbar class='header'>
        <q-toolbar class='fix'>
             <a @click="$router.goBack()" class="back-a"><q-item-side left  icon='keyboard arrow left' class='back-left'/>返回</a>
            <q-toolbar-title class='header-title'>
              施工养护
            </q-toolbar-title>
            <a class="top-nav-right">历史记录</a>
       </q-toolbar>
    </q-toolbar>
    <q-list>
      <q-item link class="full-width bg-white">
        <q-item-side>
          <q-item-tile class="color-black mb-8 mt-10">{{QrInfo.alias}}</q-item-tile>
          <q-item-tile icon="place" class="mb-8">
            <label class="color-black font-12" v-if="QrInfo.location">{{QrInfo.location.formattedAddress}}</label>
          </q-item-tile>
        </q-item-side>
        <q-item-main>
        </q-item-main>
        <q-item-side right icon="fas fa-qrcode color-black" @click.native="$router.push('/qcode/detail?id='+qrCodeId+'&type='+qrtype)"/>
        <q-item-side right class="color-gray" icon="keyboard_arrow_right"/>
      </q-item>
      <q-item class="mt-6" @click.native="chooseJob">
        <q-item-side label class="font-14">工作内容选择</q-item-side>
        <q-item-main></q-item-main>
        <q-item-side right icon="keyboard_arrow_right" class="color-gray"></q-item-side>
      </q-item>
      <q-item-separator class="mt-0 mb-0"/>
      <q-item v-if="form.tags.length>0">
        <q-chips-input v-model="form.tags" hide-underline readonly chips-bg-color="lightGray" chips-color="black"/>
      </q-item>
    </q-list>
    <q-list class="mt-6 bg-white pb-8">
      <q-list-header>备注信息</q-list-header>
      <q-input class="remark-field" v-model="form.description" type="textarea" placeholder="请输入备注信息" rows="6" hide-underline/>
    </q-list>
    <q-list class="mt-6 bg-white pb-8">
      <q-list-header>现场拍照</q-list-header>
      <div class="row">
        <div class="w-100 h-100 ml-10" v-for="v, i in form.pictures" :key="i">
          <img class="full-height full-width" :src="v.previewUrl">
          <q-icon class="img-close" @click.native="cancelUploadImage(i)" color="grey" name="ion-close-circled"/>
        </div>
        <div class="w-100 h-100 ml-10">
          <q-btn icon="camera alt" size="35px" @click="openCamera" class="camera-button full-height full-width"/>
        </div>
        <q-btn class="full-width btn" @click="operate()">{{title}}</q-btn>
      </div>
    </q-list>
  </q-layout>
</template>

<script>
import { request, deleteFiles, uploadFiles } from '../../common'
import eventBus from '../../eventBus'

export default {
  data () {
    return {
      form: {
        description: '',
        pictures: [],
        jobs: [],
        tags: [],
        jobObg: []
      },
      codeId: '',
      qrtype: '',
      jobGroupId: '',
      QrInfo: {},
      title: '添加'
    }
  },
  methods: {
    cancelUploadImage (index) {
      this.$q.loading.show()
      let img = this.pictures[index]
      deleteFiles(img.contentUrl, index)
    },
    openCamera () {
      console.log('open camera')
      if (navigator.camera) {
        navigator.camera.getPicture(imgData => {
          this.$q.loading.show()
          uploadFiles(imgData)
        }, errorMsg => {
          console.log(errorMsg)
        }, { destinationType: Camera.DestinationType.DATA_URL })
      }
    },
    async getQrInfo () {
      this.areaBranches = []
      let resp = await request('qrcode/detail?qrCodeId=' + this.codeId, 'get', null, 'json', true)
      if (resp) {
        this.QrInfo = resp.data.resultMsg
      }
    },
    async getDetail () {
      this.areaBranches = []
      let resp = await request('jobGroup/detail?jobGroupId=' + this.jobGroupId, 'get', null, 'json', true)
      if (resp) {
        this.form.description = resp.data.resultMsg.description
        this.form.pictures = resp.data.resultMsg.pictures
        let jobs = resp.data.resultMsg.jobs
        let names = []
        let jobObg = []
        let ids = []
        for (var key in jobs) {
          let editData = {}

          if (jobs[key]['id']) {
            editData.jobId = jobs[key]['id']
          }
          if (jobs[key]['action']) {
            editData.actionId = parseInt(jobs[key]['action']['id'])
            names.push(jobs[key]['action']['name'])
            ids.push(jobs[key]['action']['id'])
            jobObg = [...jobObg, { 'description': '', 'actionId': jobs[key]['action']['id'] }]
            this.form.tags.push(jobs[key]['action']['name'])
          }
          if (jobs[key]['description']) {
            editData.description = jobs[key]['description']
          }
          if (editData.actionId) {
            this.form.jobs.push(editData)
          }
        }
        this.form.jobObg = { 'names': names, 'jobs': jobObg, 'ids': ids }
        console.log(this.form.jobObg)
      }
    },
    operate () {
      if (this.jobGroupId !== 'null') {
        this.edit()
      } else {
        this.save()
      }
    },
    save () {
      let data = {
        'codeId': this.codeId,
        'description': this.form.description,
        'jobs': this.form.jobs,
        'pictures': this.form.pictures
      }
      request('jobGroup/create', 'post', data, 'json', true).then(resp => {
        if (resp.data.resultCode === 'SUCCESS') {
          this.$q.dialog({
            title: '提示',
            message: '添加成功'
          })
        }
      })
    },
    edit () {
      let data = {
        'jobGroupId': this.jobGroupId,
        'description': this.form.description,
        'jobs': this.form.jobs,
        'pictures': this.form.pictures
      }
      request('jobGroup/edit', 'post', data, 'json', true).then(resp => {
        if (resp.data.resultCode === 'SUCCESS') {
          this.$q.dialog({
            title: '提示',
            message: '修改成功'
          })
        }
      })
    },
    saveLocalData () {
      localStorage.setItem('form', JSON.stringify(this.form))
    },
    chooseJob () {
      this.saveLocalData()
      this.$router.push('jobs')
    }
  },
  mounted () {
    this.codeId = this.$route.query.codeId
    this.jobGroupId = this.$route.query.jobGroupId
    eventBus.$on('upload-success', resp => {
      console.log(resp)
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
    this.getQrInfo()

    if (this.jobGroupId !== 'null') {
      this.title = '修改'
    }
    let form = JSON.parse(localStorage.getItem('form'))
    if (!_.isNull(form)) {
      this.form = form
      localStorage.removeItem('form')
    } else if (this.jobGroupId !== 'null') {
      this.getDetail()
    }
  },
  beforeDestroy () {
    eventBus.$off('upload-success')
    eventBus.$off('delete-success')
  }
}
</script>

<style lang="scss">
@import "../../assets/css/common";
#maintenace-page {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;

  .q-list {
    border: 0;
    padding: 0;
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
    border-radius: 8px;
  }

  .img-close {
    margin-left: 80px;
    margin-top: -190px;
  }
}
</style>
