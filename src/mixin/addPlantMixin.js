
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
    },

    qrCodeFormJsonStr: {
      get () {
        return this.$store.state.plantInfo.qrCodeFormJsonStr
      },
      set (val) {
        return this.$store.commit('plantInfo/setQrCodeFormJsonStr', val)
      }
    },
    singleFormJsonStr: {
      get () {
        return this.$store.state.plantInfo.singleFormJsonStr
      },
      set (val) {
        return this.$store.commit('plantInfo/setSingleFormJsonStr', val)
      }
    },
    areaFormJsonStr: {
      get () {
        return this.$store.state.plantInfo.areaFormJsonStr
      },
      set (val) {
        return this.$store.commit('plantInfo/setAreaFormJsonStr', val)
      }
    }

  },
  methods: {
  

    convertCode(code){
      let rData = {}
      rData.id = code.id
      rData.qrCodeId = code.id
      if(code.type){
        rData.typeKey = code.type.key
      }
      
      rData.formattedAddress = ""
      if(code.location){
        rData.formattedAddress = code.location.formattedAddress
      }      
      rData.locationJson = code.locationJson
      rData.projectId = code.project.id
      rData.projectName = code.project.projectName
      rData.alias = code.alias
      rData.description = code.description
      rData.identifier = code.identifier
      rData.pictures = this.convertPictures(code.pictures)     
      return rData
    },

    convertPictures(pictures){
      if(pictures){
        let arr = []
        for(let i = 0; i < pictures.length; i++){
          console.debug(pictures[i].filePath)
          arr.push(pictures[i].filePath)
        }
        return arr
      }
      return []
    },

    convertSingle(code) {
      let rData = {}
      rData.id = code.id
      rData.singleId = code.id
      rData.areaName = ""
      rData.areaId = ""
      if(code.area){
        rData.areaName = code.area.code.alias
        rData.areaId = code.area.id
      }
      rData.position = code.position
      rData.uomName = code.uomName         
      rData.uomId = code.uomId
      if(code.uomId){
        rData.displayUom = code.uomId.toString() 
      } else {
        rData.displayUom = code.uomName
      }
      
      rData.category = ""
      rData.categoryName = ""
      if(code.category){
        rData.category = code.category.id
        rData.categoryName = code.category.name
      }
      
      rData.xiongJing = code.xiongJing
      rData.diJing = code.diJing
      rData.gaoDu = code.gaoDu
      rData.guanFu = code.guanFu
      rData.pengJing = code.pengJing
      rData.branch = code.branch
      rData.year = code.year
      rData.otherFeature = code.otherFeature
      rData.source = code.source
      rData.dealer = code.dealer
      rData.other = code.other
      rData.amount = code.amount

      //single in area
      rData.alias = code.alias
      rData.description = code.description
      rData.pictures = this.convertPictures(code.pictures)   
      return rData  
    },

    convertArea(code) {
      let rData = {}
      rData.id = code.id
      rData.areaId = code.id
      rData.acreage = code.acreage
      rData.singles = []
      if(code.singles){
        for(let i = 0; i<code.singles.length; i++){
          rData.singles.push(convertSingle(code.singles[i]))
        }
      }
      return rData
    },

    saveQrCodeForm(code){
      console.info("saveQrCodeForm")
      this.qrCodeFormJsonStr = JSON.stringify(code)
      console.info(this.qrCodeFormJsonStr)
    },

    saveSingleForm(code){
      console.debug("saveSingleForm")
      this.singleFormJsonStr = JSON.stringify(code)
      console.debug(this.singleFormJsonStr)
    },

    saveAreaForm(code){
      console.debug("saveAreaForm")
      this.areaFormJsonStr = JSON.stringify(code)
      console.debug(this.areaFormJsonStr)
    },

    toQrCodeForm(){
      console.debug("toQrCodeForm: " + this.qrCodeFormJsonStr)
      if(this.qrCodeFormJsonStr){
        return JSON.parse(this.qrCodeFormJsonStr)
      }
      return {}
    },

    toSingleForm(){
      console.debug("toSingleForm: " + this.singleFormJsonStr)
      if(this.singleFormJsonStr){
        return JSON.parse(this.singleFormJsonStr) 
      }
      return {}
    },

    toAreaForm(){
      console.debug("toAreaForm: " + this.areaFormJsonStr)
      if(this.areaFormJsonStr){
        return JSON.parse(this.areaFormJsonStr) 
      }
      return {}
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
