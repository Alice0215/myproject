import { ImagePreview } from 'vant'
import {server} from "../const";

const QrCodeDetailMixin = {
  data () {
    return {
      previewApi: '',
      hasMaintenanceRecords: false
    }
  },
  computed: {
    qrCode: {
      get () {
        return this.$store.state.QrCodeDetail.current
      },
      set (o) {
        this.$store.commit('QrCodeDetail/setCurrent', o)
      }
    }
  },
  created () {
    this.previewApi = server.PREVIEW_API
  },
  methods: {
    imagePreview (index) {
      let pictures = []
      if (_.has(this.qrCode, 'pictures')) {
        pictures = this.qrCode.pictures
      } else if (_.has(this.qrCode, 'code')) {
        if (_.has(this.qrCode.code, 'pictures'))  {
          pictures = this.qrCode.code.pictures
        }
      }
      let previewArray = _.map(pictures, (img) => {
        return this.previewApi + img.contentUrl
      })
      ImagePreview(previewArray, index)
    }
  }
}

export default QrCodeDetailMixin
