import { request } from '../common'
import _ from "lodash";

const SingleMixin = {
  data () {
    return {
      sForm: {
        pictures: []
      },
      uomOptions: [],
      plantCategoryArray: [],
      showPlantCategory: false,
      otherUomShow: false,
      otherUom: null
    }
  },
  computed: {
    
    
  },
  methods: {
    uomInput(val) {
      console.log(val)
      if (val === "other") {
        this.otherUomShow = true;
      } else {
        this.sForm.uomName = null;    
        let p= parseInt(val)
        console.log(p)
        if(_.isInteger(p)){
          this.sForm.uomId = val
        } else {
          this.sForm.uomName = uomName
        }        
        this.sForm.displayUom = val;
        
        for (let i = 0; i < this.uomOptions.length; i++) {
          let one = this.uomOptions[i];
          if (one.value === val) {
            this.sForm.uomStr = one.label;        
            return 
          }
        }
        
      }
    },

    onPickerConfirm(value, index) {
      let category = this.plantCategoryArray[index];
      this.sForm.category = category.id
      this.sForm.categoryName = category.text
      this.showPlantCategory = false;
    },

    otherUomClose(action, done) {
      done();
      if (action === "confirm") {
        let otherUom = this.otherUom.toString();
        for (let i = 0; i < this.uomOptions.length; i++) {
          let one = this.uomOptions[i];
          if (one.label === otherUom) {
            this.$q.notify("单位已存在");
            return;
          }
        }

        this.uomOptions.splice(this.uomOptions.length - 1, 0, {
          label: otherUom,
          value: otherUom
        });

        this.sForm.uomId = null;
        this.sForm.uomName = otherUom;
        this.sForm.displayUom = otherUom;
        this.sForm.uomStr = otherUom;        

        this.otherUom = null;
        this.otherUomShow = false;
      } else {
        console.log("cancel");
        this.otherUom = null;
        this.otherUomShow = false;
      }
    },

    chooseCategory () {
      this.showPlantCategory = true
    },

    onPickerCancel () {
      this.showPlantCategory = false
    },

    onUomPickerCancel () {
      this.showUom = false
    },

    async getPlantCategory () {
      let resp = await request('data/plantCategory')
      if (resp) {
        let list = resp.data.resultMsg;
        let that = this
        _.forEach(list, v => {
          let one = {};
          one.text = v.name
          one.id = v.id                  
          that.plantCategoryArray.push(one);
        });
       
      }
    },

    initSingle(){
      this.getPlantCategory();
      let customUom = null
      if(!this.sForm.uomId){
        customUom = this.sForm.uomName
      }
      console.log("customUom: "+customUom)
      this.getWorkUomList(customUom);
      
    },

    async getWorkUomList (customUom) {   
      this.uomOptions.push({label: '', value: '0'})
      let resp = await request('uom/all', 'get', null, true)
      if (resp) {
        let that = this
        if(resp.data.resultMsg){
          _.forEach(resp.data.resultMsg, v => {
            that.uomOptions.push({label: v.name, value: v.id.toString()})
          })  
        }        
      }     
      if(customUom){
        this.uomOptions.push({label: customUom, value: customUom})
      }
      this.uomOptions.push({label: '其他', value: 'other'})
    },
  },
  mounted () {},
  
}

export default SingleMixin
