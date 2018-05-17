import eventBus from '../eventBus'
import { date } from 'quasar'
import { request } from '../common'
import { server, plantType } from '../const'
import _ from 'lodash'
import { ImagePreview } from 'vant'

const QrCodeDetailMixin = {
  data () {
    return {
      previewApi: '',
      type: null,
      data: {}
    }
  },
  methods: {
    async load () {
      this.$q.loading.show()
      const resp = await request('qrcode/detail?qrCodeId=' + this.qrCodeId, 'get', null, 'json', true)
      this.$q.loading.hide()
      if (resp) {
        this.data = resp.data.resultMsg
        if (this.data.type) {
          switch (this.data.type.key) {
            case plantType.SINGLE:
              this.type = 1
              break
            case plantType.AREA:
              this.type = 2
              break
            case plantType.DEVICE:
              this.type = 3
              break
            case plantType.OTHER:
              this.type = 4
              break
          }
        } else {
          this.type = 5
        }
        if (this.data.pictures.length > 0) {
          let imageArray = []
          _.forEach(this.data.pictures, v => {
            let previewUrl = server.THUMBNAIL_API + v.filePath
            imageArray.push({
              'previewUrl': previewUrl,
              'contentUrl': v.filePath
            })
          })
          this.data.pictures = imageArray
        }
        this.$store.commit('QrCodeDetail/setCurrent', this.data)
        // if (this.type === 'SINGLE' || this.type === 'AREA') {
        //   if (!this.data.code) {
        //     this.data.code = this.data
        //   }
        //   this.qrImgUrl = server.THUMBNAIL_QR + this.info.code.batch.batchNo + '/' + this.qrCodeId + '.png'
        // } else {
        //   this.qrImgUrl = server.THUMBNAIL_QR + this.info.batch.batchNo + '/' + this.qrCodeId + '.png'
        // }
        // this.editable = this.data.editable
      }
    },
    imagePreview (index) {
      let previewArray = _.map(this.data.pictures, (img) => {
        return this.previewApi + img.contentUrl
      })
      ImagePreview(previewArray, index)
    },
  },
  created () {
    this.previewApi = server.PREVIEW_API
  },
  async mounted () {
    this.qrCodeId = this.$route.query.id
    this.load()
  }
}

export default QrCodeDetailMixin
