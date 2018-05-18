import { ImagePreview } from 'vant'

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
    }
  },
  async mounted () {
  }
}

export default QrCodeDetailMixin
