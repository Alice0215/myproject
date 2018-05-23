import { ImagePreview } from 'vant'
import { server, plantType } from '../const'
import addPlantMixin from './addPlantMixin'
import _ from 'lodash'
import { setPicturesWithPreview } from '../common'

const QrCodeDetailMixin = {
  mixins: [
    addPlantMixin
  ],
  data () {
    return {
    }
  },
  methods: {
    back () {
      let projectId = this.$route.query.projectId
      let fromDetail = this.$route.query.fromDetail
      console.log(fromDetail)
      if (fromDetail === 'true' || !projectId) {
        this.$router.goBack()
      } else {
        console.log('列表')
        this.$router.replace('/qcode/list?projectId=' + projectId + '&twice=true')
      }
    },
    preview (i) {
      ImagePreview(this.previews, i)
    },
    edit (detail) {
      let type = detail.type.key

      let qrCodeForm = this.qrCode
      if (this.qrCode.project) {
        qrCodeForm.projectId = this.qrCode.project.id
        this.projectId = this.qrCode.project.id
      }
      qrCodeForm.qrCodeId = this.qrCode.id
      this.$store.commit('plantInfo/setQRCodeId', this.qrCode.id)
      if (!_.isNull(this.qrCode.location)) {
        qrCodeForm.locationJson = JSON.stringify(this.qrCode.location)
      }
      qrCodeForm.fromDetail = this.$route.query.projectId
      this.qrCodeForm = qrCodeForm
      console.log(this.qrCodeForm)
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
          let imgs = []
          _.forEach(v.pictures, (picture) => {
            imgs.push(picture.filePath)
          })
          v.pictures = imgs
        })
        this.areaForm = detail
      }


      this.type = this.qrCode.type.key
      this.$router.push('/qrcode/stepper')
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
