import eventBus from '../eventBus'
import { request } from '../common'
import { server, plantType } from '../const'
import _ from 'lodash'


const QrCodeMixin = {
  data () {
    return {
      qrCodeId: 0,
      code: {},
      detail: {},
      thumbnails: [],  
      previews: []
    }
  },
  methods: {
    async load () {
      this.$q.loading.show()
      const resp = await request('qrcode/detail?qrCodeId=' + this.qrCodeId, 'get', null, 'json', true)
      this.$q.loading.hide()
      if (resp) {
        let type = resp.data.resultMsg.type
        if(type && (type.key === plantType.SINGLE || type.key === plantType.AREA)) {
          this.code = resp.data.resultMsg.code
          this.detail = resp.data.resultMsg
          this.hasMaintenanceRecords = true
        } else {
          this.code = resp.data.resultMsg
        }
        
        this.dealPictures()

        eventBus.$emit('set-qrCodeDetail-code', this.code)
        eventBus.$emit('set-qrCodeDetail-detail', this.detail)
        eventBus.$emit('set-qrCodeDetail-previews', this.previews)
        eventBus.$emit('set-qrCodeDetail-thumbnails', this.thumbnails)
        
      }
    },
    dealPictures () {
      if (!_.has(this.code, 'pictures') || this.code.pictures.length === 0) {
        return
      }

      _.forEach(this.code.pictures, v=>{
        this.thumbnails.push(server.THUMBNAIL_API + v.filePath)
        this.previews.push(server.PREVIEW_API + v.filePath)
      })      
    }
  },
  async mounted () {
    this.qrCodeId = this.$route.query.id
    this.load()
  }
}

export default QrCodeMixin
