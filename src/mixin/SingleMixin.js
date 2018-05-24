import { request } from '../common'

const SingleMixin = {
  data () {
    return {
      uomOptions: [],
      plantCategoryArray: [],
      showPlantCategory: false,
      otherUomShow: false,
      otherUom: null,
      displayUom: null
    }
  },
  computed: {
    
    
  },
  methods: {

    chooseNursery () {
      this.showPlantCategory = true
    },

    onPickerCancel () {
      this.showPlantCategory = false
    },

    async getPlantCategory () {
      let resp = await request('data/plantCategory')
      if (resp) {
        let that = this
        this.plantCategoryArray = resp.data.resultMsg
        console.log()
        _.forEach(this.plantCategoryArray, (v, key) => {
          
          v.text = v.name
          v.category = v.id.toString()
        })          
      }
    },

    async queryWorkUomList () {   
      let resp = await request('uom/all', 'get', null, true)
      if (resp) {
        let that = this
        _.forEach(resp.data.resultMsg, v => {
          that.uomOptions.push({label: v.name, value: v.id})
        })  
      }     
    },
    getWorkUomList (uomId, uomName) {   
      let resp = this.queryWorkUomList ()
      
      if(uomId){
        this.displayUom = uomId
      } else {
        if(uomName){
          this.uomOptions.push({label: uomName, value: uomName})
        }
        this.displayUom = uomName
      }
      this.uomOptions.push({label: '其他', value: 'other'})
    },
  },
  mounted () {},
  
}

export default SingleMixin
