import { ImagePreview } from 'vant'
import { server, plantType } from '../const'
import addPlantMixin from './addPlantMixin'
import _ from 'lodash'

const QrCodeDetailMixin = {
  mixins: [
    addPlantMixin
  ],
  data () {
    return {
    }
  },
  methods: {
    preview (i) {
      ImagePreview(this.previews, i)
    },
    edit (detail) {
      console.log(this.qrCode)
      console.log(this.detail)
      let type = detail.type.key

      let qrCodeForm = this.qrCode
      if (this.qrCode.project) {
        qrCodeForm.projectId = this.qrCode.project.id
        this.projectId = this.qrCode.project.id
      }
      qrCodeForm.qrCodeId = this.qrCode.id
      qrCodeForm.locationJson = JSON.stringify(this.qrCode.location)
      this.qrCodeForm = qrCodeForm
      if (type === plantType.SINGLE) {
        let singleForm = this.detail
        singleForm.category = this.detail.category.id
        if (this.detail.code) {
          singleForm.singleId = this.detail.code.id
        }
        this.singleForm = singleForm
      } else if (type === plantType.AREA) {
        let detail = this.detail
        _.forEach(detail.singles, (v) => {
          v.category = v.category.id
        })
        this.areaForm = detail
      }


      this.type = this.qrCode.type.key
      this.$router.push('/qrcode/stepper')
//      this.$router.push('/qcode/edit?id=' + detail.id)
    },
    openQrCode (detail) {
      let images = [server.THUMBNAIL_QR + detail.batch.batchNo + '/' + detail.id + '.png']
      ImagePreview(images, 1)
    }
  },
  async mounted () {
  }
}

export default QrCodeDetailMixin
