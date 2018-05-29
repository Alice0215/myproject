<template>
  <q-layout view="hhh lpr fff" style="min-height:0vh">
    
      <q-page style="min-height:0vh">
        <div class="child bg-primary" v-for="(item, index) in list" :key="index">
    
          <q-item  v-ripple.mat class="full-width underline user-item">
            <q-item-side left icon="expand less" v-if="item.children" class="auto-width" />
            <q-item-side left icon="expand more" v-else class="auto-width"  />
            <q-item-main :label="item.name" />
            <q-item-side right icon="radio button unchecked"   v-if="selected.indexOf(item.id) === -1" @click.native="check(item)"/>
            <q-item-side right icon="check circle" class="active"  v-if="selected.indexOf(item.id) !== -1" @click.native="uncheck(item)"/>
          </q-item>
          
          <job-action v-if="item.children" :list="item.children" :tree="tree" :jobs.sync="jobs"></job-action>

        </div>
      </q-page>
  
  </q-layout>
</template>

<script>
import eventBus from '../../eventBus'
import JobActionMixin from '../../mixin/JobActionMixin'

export default {
  name: "job-action",
  props: ["tree", "list", "jobs"],
  mixins: [
    JobActionMixin
  ],
  computed: {   
    selected: function() {
      let arr = []
      _.forEach(this.jobs, v => {        
        if(v.actionId){  
          arr.push(v.actionId)  
        } 
      });   
       
      return arr
    }
  },
  data() {
    return {};
  },
  methods: {
    findRoot(list, id){
      if(list.length===0){
        return null
      }
      for(let i=0; i<list.length; i++){        
        let root = list[i]
        console.log("0.root: "+root.name)
        if(root.id===id){
          console.log("1.root: "+root.name)
          return root
        }
        if(root.children){
          let one = this.findRoot(root.children, id)
          if(one!==null) {
            console.log("2.one: "+one.name)
            console.log("2.root: "+root.name)
            return root
          }
        }
      }
      return null
    },
   
    checkParent(root, newIds){
      if(root.children){
        let isAllCheck = true
        for(let i=0; i<root.children.length; i++){
          let c = root.children[i]
          let isCheck = this.checkParent(c, newIds)
          if(!isCheck){
            isAllCheck = false
          }
        }
        console.log("c.root: "+root.name + "-" + isAllCheck) 

        if(isAllCheck){
          if(newIds.indexOf(root.id)===-1){
            console.log("1.add:" + root.id)
            newIds.push(root.id)
          }
        }       
        return isAllCheck
      } else {
        let one = (newIds.indexOf(root.id)!==-1 || this.selected.indexOf(root.id)!==-1)      
        console.log("p.root: "+root.name + "-" + one) 
        return one
      }

    },
    checkChildren(action, list){
      if(list.indexOf(action.id)===-1){
        console.log("2.add:" + action.id)
        list.push(action.id)
      }
      
      if(action.children){
        _.forEach(action.children, v => {
          this.checkChildren(v, list)          
        });   
      }      
    },
    check(action) {
      let newIds = []
      this.checkChildren(action, newIds)    

      let root = this.findRoot(this.tree, action.id)
      console.log("root: "+root.name)
      let isCheck = this.checkParent(root, newIds)
      console.log("r.root: "+root.name + "-" + isCheck) 
      if(isCheck){
        if(newIds.indexOf(root.id)===-1){
          console.log("3.add:" + root.id)
          newIds.push(root.id)
        }
      }

      let that = this
      _.forEach(newIds, v => {  
        if(that.selected.indexOf(v)===-1){  
          that.jobs.push({
            actionId: v
          })
        }        
      });  
      this.$emit('update:jobs', this.jobs)
    },
   
    // uncheckParent(list, outIds, id){
    //   if(list.length===0){
    //     return false
    //   }
    //   for(let i=0; i<list.length; i++){        
    //     let root = list[i]        
    //     if(root.id===id){
    //       console.log("up.root: "+root.name)
    //       outIds.push(root.id)
    //       return true    
    //     }
    //     if(root.children){
    //       let one = this.uncheckParent(root.children, outIds, id)
    //       if(one) {
    //         console.log("up.root: "+root.name)
    //         outIds.push(root.id)
    //         return true   
    //       }
    //     }
    //   }
    //   return false
    // },
    // uncheckChildren(action, list){
    //   list.push(action.id)
    //   if(action.children){
    //     _.forEach(action.children, v => {
    //       this.uncheckChildren(v, list)          
    //     });   
    //   }      
    // },
    uncheck(action) {
      let outIds = []
      this.uncheckChildren(action, outIds)    
        
      this.uncheckParent(this.tree, outIds, action.id)     
    
      let jobs = []
      for(let i = 0; i<this.jobs.length; ++i){
        let one = this.jobs[i]
        if(outIds.indexOf(one.actionId) === -1) {
          jobs.push(one)
        }
      }
      console.log("jobs: "+jobs)
      this.jobs.splice(0, this.jobs.length)
      for(let i = 0; i<jobs.length; ++i){
        this.jobs.push(jobs[i])
      }

      console.log("uncheck: "+this.jobs)

      this.$emit('update:jobs', this.jobs)
      this.$forceUpdate()

      console.log("uncheck: "+this.selected)
    }  
  }
};
</script>

<style lang='scss'>
@import "../../assets/css/common";

</style>
