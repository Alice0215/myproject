
const addPlantMixin = {
  computed: {
    projectId: {
      get () {
        return this.$store.state.plantInfo.projectId
      },
      set (val) {
        return this.$store.commit('plantInfo/setProjectId', val)
      }
    },
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
    }
  }
}

export default addPlantMixin
