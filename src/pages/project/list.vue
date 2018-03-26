
<template>

    <q-list class="q-mt-md list" dark>
        <q-toolbar inverted>
            <q-toolbar-title class="header">
                任务{{$store.state.count}}
            </q-toolbar-title>
        </q-toolbar>
        <q-item multiline>
            <q-item-side class="add-btn" />
            <q-item-main>
            <q-item-tile label class="title">这是标题</q-item-tile>
            <q-item-tile sublabel lines="2" class="content">
            这是标题这是标题这是标题这是标题这是标题这是标题
            </q-item-tile>
            </q-item-main>
        </q-item>

        <q-item multiline>
            <q-item-side class="add-btn" value="`设置项目负责人`"/>
            <q-item-main>
            <q-item-tile label class="title">这是标题</q-item-tile>
            <q-item-tile sublabel lines="2" class="content">
            这是标题这是标题这是标题这是标题这是标题这是标题是标题这是标题这是标题是
            标题这是标题这是标题是标题这是标题这是标题是标题这是标题这是标题
            </q-item-tile>
            </q-item-main>
        </q-item>

    </q-list>
    
</template>

<script>

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
