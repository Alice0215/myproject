
const JobActionMixin = {
  data () {
    return {
    }
  },
  computed: {
    
    displayJobs: function() {
      let arr = []

      for(let i=0; i<this.jobs.length; i++){
        let v = this.jobs[i]
        
        if(v.other){
          arr.push({name:v.other, visible:true})
        } else {
          let action = this.findAction(this.tree, v.actionId)
          let visible = true
          if(action.children){
            visible = false
          }      
          
          let index = this.jobActionIds.indexOf(v.actionId)
          let name = this.jobActionNames[index]
            
          arr.push({name:name, visible:visible})  
    
        }
      }

      return arr
    }
  },
  methods: {
    findAction(list, actionId){
      for(let i =0; i<list.length; ++i){
        let v = list[i]
        console.log("v.id: "+ v.id)
        if(v.id===actionId){
          console.log("v.id: "+ v.id)
          return v
        }
        if(v.children){
          let one = this.findAction(v.children, actionId)
          if(one){
            console.log("one: "+ one)
            return one
          } 
        }
               
      };
      return null
    },
    uncheckParent(list, outIds, id){
      if(list.length===0){
        return false
      }
      for(let i=0; i<list.length; i++){        
        let root = list[i]        
        if(root.id===id){
          console.log("up.root: "+root.name)
          outIds.push(root.id)
          return true    
        }
        if(root.children){
          let one = this.uncheckParent(root.children, outIds, id)
          if(one) {
            console.log("up.root: "+root.name)
            outIds.push(root.id)
            return true   
          }
        }
      }
      return false
    },
    uncheckChildren(action, list){
      list.push(action.id)
      if(action.children){
        _.forEach(action.children, v => {
          this.uncheckChildren(v, list)          
        });   
      }      
    }
  },
  mounted () {},
  
}

export default JobActionMixin
