
<template>
    
    <q-list class="list">
        <q-toolbar class="header">
        <q-toolbar class="fix">
            <q-toolbar-title class="header-title">
            项目
            </q-toolbar-title>
       </q-toolbar>
        </q-toolbar>
        <q-item class="list-list">
             <span class="add-btn" @click="$router.push('project/add')">+</span>
            <q-item-main class="add-field">
            创建项目
            </q-item-main>  
        </q-item>

        <q-infinite-scroll :handler="load">
        <q-item multiline  v-for="item in list"
          :key="item.id" class="list-list">
           <q-item-side class="add-btn" />
            <q-item-main>
            <q-item-tile label class="title">{{item.projectName}}</q-item-tile>
            <q-item-tile sublabel lines="2" class="content">
            {{item.projectDesc}}
            </q-item-tile>
            </q-item-main>  
        </q-item>
        <!--
        <el-card v-if="items.length">
        <label class="gray" :class="{'pointer': !hasLoadAll, 'disable-click': hasLoadAll}" @click="load">
            {{ !hasLoadAll ? '查看更多...' : '已全部加载...'}}
        </label>
        </el-card>
    -->
        <div class="row justify-center" style="margin-bottom: 50px;" v-if="!hasLoadAll">
          <q-spinner name="dots" slot="message" :size="40"></q-spinner>
        </div>
      </q-infinite-scroll>
      
         <q-toolbar class="footer">
            <q-toolbar-title class="menu">
               <span icon="apps">我的项目</span>
               <q-tab slot="title" name="link" label="Link" icon="cloud" color="amber" />
               <span><i class="apps"></i>扫二维码</span>
                <span><i class="apps"></i>巡查</span>
                <span><i class="apps"></i>我的</span>
            </q-toolbar-title>
        </q-toolbar>
    </q-list>
    
    
</template>

<script>
    import { request } from '../../common'
    export default {
       data() {
            return {
                list: '',
                loading: false,
                pageNo: 1,
                hasLoadAll: false,
            }
        },
        mounted() {
            this.load()
        },
        methods: {
            async getlist(){
                request('project/list?pageNo='+this.pageNo+'&pageSize=20', 'get','','json',true)
                .then(response=>{
                    if(response.data.resultCode=="SUCCESS"){
                        this.list = response.data.resultMsg
                        this.pageNo++
                        console.log(this.list)
                    }else{
                        console.log(response.data.resultMsg)
                    }
                })
            },

            async load () {
                if(!this.hasLoadAll){
                    this.loading = true
                    request('project/list?pageNo='+this.pageNo+'&pageSize=20', 'get','','json',true)
                    .then(response=>{
                        console.log(response)
                        if(response.data.resultCode=="SUCCESS"){
                        this.loading = false
                        let list = response.data.resultMsg
                        if (list.length === 0 || !list.length) {
                            this.hasLoadAll = true
                            return
                        }
                        if (list.length < 20) {
                            this.list = list
                            this.hasLoadAll = true
                            return
                        }
                        this.list = this.list.concat(list)
                        console.log(this.list)
                        this.pageNo++
                        }
                    })
                }
               
            }

        }
    }
</script>

<style>
.list{
    padding: 0px;
    border: none;
}
.header,.fix,.footer{
    background-color: #F7F7F7 !important;
    padding: 0px;
    margin-bottom: 15px;
    text-align: center;
    font-size: 14px;
    color:#101010 !important;
}
.header-title{
    font-size: 15px;
}
.fix{
     top: 0;
    border-bottom: 1px solid #DCDCDC;
    z-index: 100;
    position: fixed;
}

.footer{
    background-color: #F9F9F9 !important;
    margin: 0px;
}
.footer .menu{
    background-color: #F9F9F9 !important;
    z-index: 100;
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 12px;
}
.footer span{
    width: 23%;
    display: inline-block;
    text-align: center;
    
}
.add-btn{
    width: 75px;
    height: 75px;
    background-color: #DCDCDC;
    border-radius: 5px;
    color: white;
    font-size: 60px;
    line-height: 75px;
    text-align: center;
}
.add-field{
    padding-left: 10px;
}
.title{
    font-size: 16px;
    color:black;
    padding-top: 10px;
}
.content{
    font-size: 14px;
    color: #666666 !important;
    margin-top: 5px;
}


</style>
