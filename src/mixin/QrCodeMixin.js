import eventBus from '../eventBus'
import { request } from '../common'
import { server, plantType } from '../const'
import _ from 'lodash'


const QrCodeMixin = {
  data () {
    return {
      qrCodeId: 0,
      qrCode: {},
      detail: {},
      thumbnails: [],
      previews: []
    }
  },
  methods: {
    async initQrCodeMixin () {
      this.qrCodeId = this.$route.query.id
      this.load()
    },
    
    async load () {
      this.$q.loading.show()
      const resp = await request('qrcode/detail?qrCodeId=' + this.qrCodeId, 'get', null, 'json', true)
      this.$q.loading.hide()
      if (resp) {
        let type = resp.data.resultMsg.type
        if(type && (type.key === plantType.SINGLE || type.key === plantType.AREA)) {
          this.qrCode = resp.data.resultMsg.code
          this.detail = resp.data.resultMsg
          this.hasMaintenanceRecords = true
        } else {
          this.qrCode = resp.data.resultMsg
        }
        console.log(this.qrCode)
        this.dealPictures()

      }
    },
    dealPictures () {
      if (!_.has(this.qrCode, 'pictures') || this.qrCode.pictures.length === 0) {
        return
      }

      _.forEach(this.qrCode.pictures, v=>{
        this.thumbnails.push(server.THUMBNAIL_API + v.filePath)
        this.previews.push(server.PREVIEW_API + v.filePath)
      })
    }
  },
  
}

export default QrCodeMixin
