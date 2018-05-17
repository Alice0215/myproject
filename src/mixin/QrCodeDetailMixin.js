const QrCodeDetailMixin = {
  computed: {
    qrCode: {
      get () {
        return this.$store.state.QrCodeDetail.current
      },
      set (o) {
        this.$store.commit('QrCodeDetail/setCurrent', o)
      }
    }
  }
}

export default QrCodeDetailMixin
