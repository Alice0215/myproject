import { request, uploadFiles, deleteFiles } from '../../common'
import { required } from 'vuelidate/lib/validators'
import { server } from '../../const'
import _ from 'lodash'
import eventBus from '../../eventBus'
import { ImagePreview } from 'vant'
import 'vant/lib/vant-css/base.css'
import 'vant/lib/vant-css/image-preview.css'
import 'vant/lib/vant-css/index.css'

const MaintenanceMixin = {
  data () {
    return {
      form: {
        description: '',
        pictures: [],
        jobs: [],
        tags: [],
        jobObg: [],
        QrInfo: {},
        codeId: '',
        imageArray: []
      },
      isEdited: false,
      previewApi: '',
      jobGroupId: '',
      title: '添加'
    }
  },
  validations: {
    form: {
      tags: { required }
    }
  },
  methods: {
    back () {
      // this.$store.commit('Project/setCurrent', null)
      // this.$store.commit('Location/setCurrent', null)
      this.$router.goBack(this.isEdited, '确认放弃创建项目吗？', '离开当前页面您的项目信息将不会保存')
    },
    imagePreview (index) {
      console.log(index)
      let previewArray = _.map(this.form.pictures, (img) => {
        return this.previewApi + img.contentUrl
      })
      console.log(previewArray)
      ImagePreview(previewArray, index)
    },
    cancelUploadImage (index) {
      this.$q.loading.show()
      let img = this.form.pictures[index]
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
      let resp = await request('qrcode/detail?qrCodeId=' + this.form.codeId, 'get', null, 'json', true)
      if (resp) {
        this.form.QrInfo = resp.data.resultMsg.code
      }
    },
    async getDetail () {
      this.areaBranches = []
      let resp = await request('jobGroup/detail?jobGroupId=' + this.jobGroupId, 'get', null, 'json', true)
      if (resp) {
        this.form.QrInfo = resp.data.resultMsg.code
        this.form.codeId = resp.data.resultMsg.code.id
        this.form.description = resp.data.resultMsg.description
        this.form.pictures = resp.data.resultMsg.pictures
        let jobs = resp.data.resultMsg.jobs
        let names = []
        let jobObg = []
        let ids = []
        if (this.form.pictures.length > 0) {
          let imageArray = []
          _.forEach(this.form.pictures, v => {
            let previewUrl = server.THUMBNAIL_API + v.filePath
            imageArray.push({
              'previewUrl': previewUrl,
              'contentUrl': v.filePath
            })
          })
          this.form.pictures = imageArray
        }
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
      }
    },
    operate () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        return false
      }
      if (this.jobGroupId !== undefined) {
        console.log(this.jobGroupId)
        this.edit()
      } else {
        this.save()
      }
    },
    save () {
      let imgArray = []
      if (this.form.pictures.length > 0) {
        imgArray = _.map(this.form.pictures, 'contentUrl')
      }
      let data = {
        'codeId': this.form.codeId,
        'description': this.form.description,
        'jobs': this.form.jobs,
        'pictures': imgArray
      }
      request('jobGroup/create', 'post', data, 'json', true).then(resp => {
        if (resp.data.resultCode === 'SUCCESS') {
          this.$q.dialog({
            title: '提示',
            message: '添加成功'
          })
          setTimeout(() => {
            this.$router.goBack()
          }, 1000)
        }
      })
    },
    edit () {
      let imgArray = []
      if (this.form.pictures.length > 0) {
        imgArray = _.map(this.form.pictures, 'contentUrl')
      }
      let data = {
        'jobGroupId': this.jobGroupId,
        'description': this.form.description,
        'jobs': this.form.jobs,
        'pictures': imgArray
      }
      request('jobGroup/edit', 'post', data, 'json', true).then(resp => {
        if (resp && resp.data.resultCode === 'SUCCESS') {
          this.$q.dialog({
            title: '提示',
            message: '修改成功'
          })
          setTimeout(() => {
            this.$router.goBack()
          }, 1000)
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
    this.previewApi = server.PREVIEW_API
    this.jobGroupId = this.$route.query.jobGroupId

    eventBus.$on('upload-success', resp => {
      console.log(resp)
      this.$q.loading.hide()
      this.form.pictures.push(resp)
    })
    eventBus.$on('delete-success', (params) => {
      this.$q.loading.hide()
      let index = parseInt(params.idx)
      this.form.pictures.splice(index, 1)
      this.$q.dialog({
        title: '提示',
        message: params.msg
      })
    })
    if (this.$route.query.jobGroupId) {
      this.title = '修改'
    } else {
      this.form.codeId = this.$route.query.codeId
      this.getQrInfo()
    }
    let form = JSON.parse(localStorage.getItem('form'))
    if (!_.isNull(form)) {
      this.form = form
      localStorage.removeItem('form')
    } else if (this.$route.query.jobGroupId) {
      this.getDetail()
    }
  },
  beforeDestroy () {
    eventBus.$off('upload-success')
    eventBus.$off('delete-success')
  }
}

export default MaintenanceMixin
