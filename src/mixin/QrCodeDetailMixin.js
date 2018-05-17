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
      let previewArray = _.map(this.qrCode.pictures, (img) => {
        return this.previewApi + img.contentUrl
      })
      ImagePreview(previewArray, index)
    }
  }
}

export default QrCodeDetailMixin
