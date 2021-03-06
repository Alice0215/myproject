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
      let projectId =  this.qrCode.project.id
      this.$router.push('/qcode/list?projectId=' + projectId)
    },
    preview (i) {
      ImagePreview(this.previews, i)
    },
    edit (detail) {      
      this.$router.push('/qrcode/stepper?id='+this.qrCode.id)

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
