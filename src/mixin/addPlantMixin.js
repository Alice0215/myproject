
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
        console.log("get qrCodeForm")
        return this.$store.state.plantInfo.qrCodeForm
      },
      set (val) {
        console.log("set qrCodeForm")
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
    getQrCodeFormParam(form) {
      let params = {}
      params.projectId = form.projectId 
      params.qrCodeId = this.qrCodeId
      params.alias = form.alias
      params.description = form.description
      params.pictures = form.pictures
      params.locationJson = form.locationJson
      return params
    },    

    clearInfo () {
      this.$root.$emit('clear-info')
      this.$store.commit('plantInfo/clearInfo')
    },
    // removeLocationIfNotChanged (commonForm) {
    //   if (commonForm.locationJson) {
    //     let lj = JSON.parse(commonForm.locationJson)
    //     if (!lj.position) {
    //       delete commonForm.locationJson
    //     }
    //   }
    //   return commonForm
    // }
  },
  data () {
    return {
    }
  }
}

export default addPlantMixin
