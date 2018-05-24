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
      this.$router.push('/qrcode/stepper?id='+this.qrCode.id)
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
