import eventBus from '../eventBus'
import { date } from 'quasar'
import { request } from '../common'
import { server } from '../const'
import _ from 'lodash'

const QrDetailMixin = {
  data () {
    return {
      tabsModel: 'qr',
      dropdown: false,
      projectId: '',
      qrCodeId: '',
      type: '',
      editable: false,
      qrImgUrl: '',
      info: {},
      picUrl: '',
      previewApi: '',
      pageNo: 1,
      hasLoadAll: false,
      tab: 'qr',
      isSearch: false,
      joblist: [],
      actionIds: [],
      startData: date.formatDate(Date.now(), 'YYYY年MM月DD日'),
      formatStartData: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      endData: date.formatDate(Date.now(), 'YYYY年MM月DD日'),
      formatEndData: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jobs: []
    }
  },
  methods: {
    toAreaDetail (info) {
      this.$store.commit('Qrcode/setCurrent', info)
      this.$router.push('/areaDetail')
    },
    edit () {
      if (!this.editable) {
        this.$q.dialog({
          title: '提示',
          message: '您没有编辑权限'
        })
        return
      }
      this.$router.push('/qcode/edit?id=' + this.qrCodeId + '&typeKey=' + this.type)
    },
    choose (type) {
      this.tab = type
    },
    initData () {
      this.joblist = []
      this.pageNo = 1
      this.hasLoadAll = false
    },
    async getMaintenanceInfo (index, done) {
      if (this.hasLoadAll) {
        done()
        return
      }
      setTimeout(() => {
        this.getMaintenance()
        done()
      }, 2500)
    },
    async getMaintenance () {
      this.$q.loading.show()
      let that = this
      let response = {}
      if (this.isSearch) {
        let data = {
          'codeId': this.qrCodeId,
          'actionIds': this.actionIds,
          'from': date.formatDate(Date.parse(this.formatStartData), 'YYYY-MM-DD'),
          'to': date.formatDate(Date.parse(this.formatEndData), 'YYYY-MM-DD'),
          'pageNo': this.pageNo,
          'pageSize': 20
        }
        response = await request('jobGroup/list/byCondition', 'post', data, 'json', true)
      } else {
        response = await request('jobGroup/list/byProject?projectId=' + that.projectId + '&pageNo=' + that.pageNo + '&pageSize=20', 'get', '', 'json', true)
      }
      if (response) {
        this.$q.loading.hide()
        let list = response.data.resultMsg
        if (list.length === 0 || !list.length) {
          that.hasLoadAll = true
          return
        }
        if (list.length < 20) {
          that.hasLoadAll = true
        } else {
          that.pageNo++
        }
        if (that.joblist.length > 0) {
          that.joblist = that.joblist.concat(list)
        } else {
          that.joblist = list
        }
      }
    },
    getQrInfo () {
      this.$q.loading.show()
      request('qrcode/detail?qrCodeId=' + this.qrCodeId, 'get', null, 'json', true).then(response => {
        this.$q.loading.hide()
        if (response) {
          this.info = response.data.resultMsg
          if (this.type === 'SINGLE' || this.type === 'AREA') {
            if (!this.info.code) {
              this.info.code = this.info
            }
            this.qrImgUrl = server.THUMBNAIL_QR + this.info.code.batch.batchNo + '/' + this.qrCodeId + '.png'
          } else {
            this.qrImgUrl = server.THUMBNAIL_QR + this.info.batch.batchNo + '/' + this.qrCodeId + '.png'
          }
          this.editable = response.data.resultMsg.editable
        }
      })
    },
    async getJobAction () {
      let resp = await request('data/jobAction/category?category=MAINTAIN', 'get')
      this.jobs = resp.data.resultMsg
    },
    chooseData (type) {
      if (type) {
        this.$store.commit('DatetimePicker/setIsStartData', true)
        this.$store.commit('DatetimePicker/setCurrent', this.startData)
      } else {
        this.$store.commit('DatetimePicker/setIsStartData', false)
        this.$store.commit('DatetimePicker/setCurrent', this.endData)
      }
      this.$router.push('/chooseDate')
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
    doSearch () {
      this.tab = 'maintenance'
      this.dropdown = false
      this.tabsModel = 'maintenance'
      this.initData()
      this.isSearch = true
      this.getMaintenance()
    },
    cancel () {
      this.dropdown = false
      this.actionIds = []
    }
  },
  async mounted () {
    this.qrCodeId = this.$route.query.id
    this.type = this.$route.query.type
    this.projectId = this.$route.query.projectId
    this.picUrl = server.THUMBNAIL_API
    this.previewApi = server.PREVIEW_API
    this.getJobAction()
    this.getQrInfo()
    let isStartData = this.$store.getters['DatetimePicker/getIsStartData']
    let dateTime = this.$store.getters['DatetimePicker/getCurrent']
    if (!_.isUndefined(dateTime) && !_.isNull(dateTime)) {
      if (isStartData) {
        this.startData = date.formatDate(dateTime, 'YYYY年M月D日')
        this.formatStartData = dateTime
      } else {
        this.endData = date.formatDate(dateTime, 'YYYY年M月D日')
        this.formatEndData = dateTime
      }
      this.tab = 'maintenance'
      this.dropdown = true
      this.tabsModel = 'maintenance'
      this.initData()
    }
    eventBus.$on('refresh-project-page', () => {
      this.load()
    })
  },
  beforeDestroy () {
    eventBus.$off('refresh-project-page')
  }
}

export default QrDetailMixin
