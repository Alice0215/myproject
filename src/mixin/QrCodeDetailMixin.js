import { ImagePreview } from 'vant'
import { server } from '../const'

const QrCodeDetailMixin = {
  data () {
    return {
    }
  },
  methods: {
    preview (i) {
      ImagePreview(this.previews, i)
    },
    edit (detail) {
      this.$router.push('/qcode/edit?id=' + detail.id)
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
