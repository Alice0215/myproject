
const addPlantMixin = {
  computed: {
    qrCodeId: {
      get () {
        return this.$store.state.plantInfo.qrCodeId
      },
      set (val) {
        return this.$store.commit('plantInfo/setQRCodeId', val)
      }
    },
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
    },
    type: {
      get () {
        return this.$store.state.plantInfo.type
      },
      set (val) {
        return this.$store.commit('plantInfo/setChooseType', val)
      }
    },
    navTitle: {
      get () {
        return this.$store.state.plantInfo.navTitle
      },
      set (val) {
        return this.$store.commit('plantInfo/setNavTitle', val)
      }
    }
  },
  methods: {
    clearInfo () {
      this.$root.$emit('clear-info')
      this.$store.commit('plantInfo/clearInfo')
    },
    removeLocationIfNotChanged (commonForm) {
      if (commonForm.locationJson) {
        let lj = JSON.parse(commonForm.locationJson)
        if (!lj.position) {
          delete commonForm.locationJson
        }
      }
      return commonForm
    }
  },
  data () {
    return {
    }
  }
}

export default addPlantMixin
