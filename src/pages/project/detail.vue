
<template>

    <q-list class="q-mt-md list" dark>
        <q-toolbar inverted>
            <q-toolbar-title class="header">
                任务
            </q-toolbar-title>
        </q-toolbar>
        <q-item multiline  v-for="item in list"
          :key="item.id"  @click="addUser(item.fullname,user.userId)">
            <q-item-side class="add-btn" />
            <q-item-main>
            <q-item-tile label class="title">{{item.projectName}}</q-item-tile>
            <q-item-tile sublabel lines="2" class="content">
            {{item.projectDesc}}
            </q-item-tile>
            </q-item-main>
        </q-item>

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
.header{
    background-color: #F7F7F7;
    text-align: center;
    font-size: 14px;
    color:black;
    height: 40px;
    line-height: 40px;
}
.add-btn{
    width: 75px;
    height: 75px;
    background-color:#DCDCDC; 
    border-radius: 10px;
}
.title{
    font-size: 16px;
    color:black;
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

</style>
