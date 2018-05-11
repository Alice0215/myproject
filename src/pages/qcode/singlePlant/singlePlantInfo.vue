<template>
  <div id="single-plant-info">
    <van-cell-group :border="false">
      <van-cell title="所属片区" is-link value="选择或输入片区内容" required class="font-16" @click="chooseArea"/>
      <van-cell title="苗木分类" is-link value="选择苗木分类" required class="font-16" @click="chooseNursery"/>
      <div class="van-hairline--bottom font-16 ml-15 area-input-class row">
        <label class="w-64">苗木面积</label>
        <q-input placeholder="输入片值苗木面积" class="no-margin" v-model="singleForm.area" type="number"></q-input>
        <q-select v-model='singleForm.areaUnit' @input="" :options='singleForm.areaOptions'
                  class="no-margin border-left" placeholder='选择单位'/>
      </div>
      <div class="specification-class font-16 pl-15 pr-15 pt-16 pb-20">
        <label class="h-44">苗木规则</label>
        <div class="row mt-6 spec-row-div">
         <div class="row spec-left-div ">
           <label class="spec-input-left">胸径</label>
           <q-input class="spec-input" v-model="singleForm.xiongJing" type="number" />
           <span class="spec-input-unit">厘米</span>
         </div>
          <div class="row spec-right-div">
            <label class="spec-input-left">高度</label>
            <q-input class="spec-input" v-model="singleForm.gaoDu" type="number" />
            <span class="spec-input-unit">米</span>
          </div>
          <div class="row spec-left-div ">
            <label class="spec-input-left">地径</label>
            <q-input class="spec-input" v-model="singleForm.diJing" type="number" />
            <span class="spec-input-unit">厘米</span>
          </div>
          <div class="row spec-right-div">
            <label class="spec-input-left">冠幅</label>
            <q-input class="spec-input" v-model="singleForm.guanFu" type="number" />
            <span class="spec-input-unit">米</span>
          </div>
          <div class="row spec-left-div col-12">
            <label class="spec-input-left">蓬径</label>
            <q-input class="spec-input" v-model="singleForm.xiongJing" type="number" />
            <span class="spec-input-unit">米</span>
          </div>
          <div class="row spec-left-div ">
            <label class="spec-input-left w-64">分支数量</label>
            <q-input class="spec-input w-40" v-model="singleForm.branch" type="number" />
            <span class="spec-input-unit">个</span>
          </div>
          <div class="row spec-right-div">
            <label class="spec-input-left w-50">几年生</label>
            <q-input class="spec-input" v-model="singleForm.jiNian" />
            <span class="spec-input-unit">年</span>
          </div>
          <div class="row spec-left-div col-12">
            <label class="spec-input-left w-64">其他规格</label>
            <q-input class="spec-input other-spec" v-model="singleForm.otherSpec" />
          </div>
        </div>
      </div>
      <van-field  class="font-16" v-model="commonForm.source" label="苗源地" placeholder="请输入苗源地信息" />
      <van-field  class="font-16" v-model="commonForm.source" label="苗木商" placeholder="请输入苗木商信息" />
      <van-field  class="font-16 van-hairline--bottom" v-model="commonForm.source"
                  label="苗木其他" placeholder="请输入苗木其他信息" />
    </van-cell-group>

    <div class="bottom-button-div mt-40">
      <q-btn color="white" text-color="black"  class="border-1 float-left ml-16" label="上一步" size="md" @click="preStep" />
      <q-btn color="white" text-color="black" class="border-1 float-right mr-16" label="完成" size="md" @click="nextStep" />
    </div>
    <div class="h-50">
    </div>
  </div>
</template>

<script>
  import addPlantMixin from '../../../mixin/addPlantMixin'

  export default {
    mixins: [
      addPlantMixin,
    ],
    data () {
      return {}
    },
    methods: {
      nextStep () {
        this.$root.$emit('next-step')
      },
      preStep () {
        this.$root.$emit('pre-step')
      },
      chooseArea () {

      },
      chooseNursery () {

      },
    },
  }
</script>

<style lang="scss">
  @import "../../../assets/css/variable";

  #single-plant-info {

    .other-spec {
      width: calc(100% - 64px - 8px) !important;
    }
    .spec-row-div {
      justify-content: space-between;
      div {
        margin-top: 12px;
      }
    }

    .spec-input-left {
      width: 32px;
      height: 44px;
      line-height: 44px;
    }
    .spec-input {
      margin: 0 !important;
      background-color: white;
      width: 70px;
      margin-left: 8px !important;
      height: 44px;
      line-height: 44px;
    }

    .spec-input-unit {
      background-color: white;
      color: gray;
      width: 44px;
      text-align: center;
      height: 44px;
      line-height: 44px;
    }

    .specification-class {
      background-color: $bgcolor;
    }

    .border-left {
      border-left: 1px solid #e8e8e8;
    }

    .area-input-class {
      height: 44px;

      .q-input {
        margin-left: 20px !important;
        width: 150px;
        padding: 0 !important;
        height: 44px;

        .q-if-inner {
          height: 100%;
        }
      }

      .q-select {
        width: calc(100% - 20px - 150px - 64px);
        margin-right: 8px;
        text-align: center;
        padding-bottom: 0 !important;

        .q-input-target {
          height: 44px;
          line-height: 44px;
        }

        .q-icon {
          height: 44px;
        }
      }

      label {
        line-height: 44px;
      }
    }

    .bottom-button-div {
      button {
        width: 45%;
      }
    }
  }
</style>
