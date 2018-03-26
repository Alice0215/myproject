
<template>
    
    <q-list class="list">
        <q-toolbar class="header">
        <q-toolbar class="fix">
            <q-toolbar-title>
            项目
            </q-toolbar-title>
       </q-toolbar>
        </q-toolbar>
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
         <q-toolbar class="footer">
            <q-toolbar-title class="menu">
               <span>我的项目apps</span>
                <span>扫二维码</span>
                <span>巡查</span>
                <span>我的</span>
            </q-toolbar-title>
        </q-toolbar>
    </q-list>
    
    
</template>

<script>
    import { request } from '../../common'
    export default {
       data() {
            return {
                list: ''
            }
        },
        mounted() {
            this.getlist()
        },
        methods: {
            async getlist(){
                request('project/list', 'get','','json',true)
                .then(response=>{
                if(response.data.resultCode=="SUCCESS"){
                   
                    this.list = response.data.resultMsg
                     console.log(this.list)
                }else{
                    console.log(response.data.resultMsg)
                }
                
                })
            }

        }
    }
</script>

<style>
.list{
    padding: 0px;
}
.header,.fix,.footer{
    background-color: #F7F7F7 !important;
    padding: 0px;
    margin-bottom: 15px;
    text-align: center;
    font-size: 14px;
    color:#101010 !important;
   
   
}
.fix{
     top: 0;
    border-bottom: 1px solid #DCDCDC;
    z-index: 100;
    position: fixed;
}
.add-btn{
    width: 75px;
    height: 75px;
    background-color:#DCDCDC; 
    border-radius: 5px;
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
 .item {
    flex: 1;
    width: 20%;
}
.footer{
    background-color: #F9F9F9 !important;
     z-index: 100;
    position: fixed;
}
.footer span{
    width: 25%;
    display: inline-block;
    text-align: center;
    
}


</style>
