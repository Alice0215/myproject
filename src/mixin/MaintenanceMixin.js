import { request, uploadFiles, deleteFiles } from '../common'
import { required } from 'vuelidate/lib/validators'
import { server } from '../const'
import _ from 'lodash'
import eventBus from '../eventBus'
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
        QrInfo: {},
        codeId: '',
        jobs: [],
        imageArray: []
      },
      jobs: [],
      isEdited: false,
      previewApi: '',
      jobGroupId: '',
      title: '添加'
    }
  },
  validations: {
    jobs: { required }
  },
  methods: {
    remove (index) {
      this.jobs.splice(index, 1)
      this.fids.splice(index, 1)
      this.selected.splice(index, 1)
    },
    back () {
      this.$store.commit('Maintenance/setCurrent', null)
      this.$store.commit('Maintenance/setJobGroup', null)
      this.$router.goBack(this.isEdited, '取消操作', '点击确定将不会被保留所选择的信息，您确定要取消操作吗？')
    },
    imagePreview (index) {
      let previewArray = _.map(this.form.pictures, (img) => {
        return this.previewApi + img.contentUrl
      })
      ImagePreview(previewArray, index)
    },
    cancelUploadImage (index) {
      this.$q.loading.show()
      let img = this.form.pictures[index]
      deleteFiles(img.contentUrl, index)
    },
    openCamera () {
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
        let info = resp.data.resultMsg
        console.log(info)
        this.form.QrInfo = info.code
        this.form.codeId = info.code.id
        this.form.description = info.description
        this.form.pictures = info.pictures

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
        let jobs = []
        _.forEach(info.jobs, v => {
          if (v.action) {
            jobs = [...jobs, { 'actionId': v.action.id, 'description': v.action.name, 'jobId': v.id, 'fid': v.action.parent.id, 'fname': v.action.parent.name }]
          } else {
            jobs = [...jobs, { 'actionId': '', 'description': '', 'jobId': v.id, 'fid': '', 'fname': v.other }]
          }
        })
        this.jobs = jobs
        console.log(this.jobs)
      }
    },
    operate () {
      this.$v.$touch()
      if (this.$v.$error) {
        return false
      }
      if (!_.isNull(this.jobGroupId) && !_.isUndefined(this.jobGroupId)) {
        this.edit()
      } else {
        this.save()
      }
    },
    initJobs () {
      let jobs = []
      _.forEach(this.jobs, v => {
        if (_.isNull(v.fid) || v.fid === '') {
          // 自定义类型
          jobs.push({ 'other': v.fname })
        } else {
          if (_.isNull(v.actionId) || v.actionId === '') {
            // 无子类的
            if (v.jobId) {
              jobs.push({ 'actionId': v.fid, 'description': v.fname, 'jobId': v.jobId })
            } else {
              jobs.push({ 'actionId': v.fid, 'description': v.fname })
            }
          } else {
            if (v.jobId) {
              // 编辑的
              jobs.push({ 'actionId': v.actionId, 'description': v.description, 'jobId': v.jobId })
            } else {
              jobs.push({ 'actionId': v.actionId, 'description': v.description })
            }
          }
        }
      })
      this.form.jobs = jobs
    },
    save () {
      // 添加
      let imgArray = []
      if (this.form.pictures.length > 0) {
        imgArray = _.map(this.form.pictures, 'contentUrl')
      }
      this.initJobs()
      let data = {
        'codeId': this.form.codeId,
        'description': this.form.description,
        'jobs': this.form.jobs,
        'pictures': imgArray
      }
      request('jobGroup/create', 'post', data, 'json', true).then(resp => {
        if (resp) {
          this.$q.notify({
            timeout: 2000,
            type: 'positive',
            message: '养护记录添加成功！'
          })
          this.$store.commit('Maintenance/setCurrent', null)
          this.$store.commit('Maintenance/setJobGroup', null)
          this.$router.goBack()
        }
      })
    },
    edit () {
      // 修改
      this.initJobs()
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
        if (resp) {
          this.$store.commit('Maintenance/setCurrent', null)
          this.$store.commit('Maintenance/setJobGroup', null)
          this.$q.notify({
            timeout: 2000,
            type: 'positive',
            message: '养护记录修改成功！'
          })
          this.$router.goBack()
        }
      })
    },
    chooseJob () {
      this.$store.commit('Maintenance/setCurrent', this.form)
      this.$store.commit('Maintenance/setJobGroup', this.jobs)
      this.$router.push('jobs')
    }
  },
  mounted () {
    this.previewApi = server.PREVIEW_API
    this.jobGroupId = this.$route.query.jobGroupId
    eventBus.$on('upload-success', resp => {
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
    }
    let form = Object.assign({}, this.$store.getters['Maintenance/getCurrent'])
    let jobs = _.values(Object.assign({}, this.$store.getters['Maintenance/getJobGroup']))
    if (!_.isNull(form) && !_.isUndefined(form)) {
      this.form = form
      this.jobs = jobs
    } else if (this.$route.query.jobGroupId) {
      // 编辑
      this.getDetail()
    }
  },
  beforeDestroy () {
    eventBus.$off('upload-success')
    eventBus.$off('delete-success')
  }
}

export default MaintenanceMixin
