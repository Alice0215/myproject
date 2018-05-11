
const addPlantMixin = {
  computed: {
    qrCodeForm: {
      get () {
        return this.$store.state.plantInfo.qrCodeForm
      },
      set (val) {
        return this.$store.commit('plantInfo/updateQRCodeForm', val)
      }
    },
    singleForm: {
      get () {
        return this.$store.state.plantInfo.singleForm
      },
      set (val) {
        return this.$store.commit('plantInfo/updateSingleForm', val)
      }
    },
    areaForm: {
      get () {
        return this.$store.state.plantInfo.areaForm
      },
      set (val) {
        return this.$store.commit('plantInfo/updateAreaForm', val)
      }
    }
  },
  data () {
    return {
//      qrCodeForm: {},
//      singleForm: {'areaOptions': [{'label': '平方米', 'value': '平方米'}]},
//      areaForm: {}
    }
  }
}

export default addPlantMixin
