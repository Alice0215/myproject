<template>
  <div id="area-plant-info" class="bg-color">
    <van-cell-group :border="false">
      <div class="van-hairline--bottom font-16 pl-15 area-input-class row">
        <label class="w-64">片区面积</label>
        <q-input placeholder="输入片区所占面积" class="no-margin" v-model="aForm.acreage" type="number"></q-input>
        <label class="uom-class border-left">
          平方米
        </label>
      </div>
      <div class="bg-color font-16 pl-15 pr-15 pt-16 pb-20">
        <label class="h-44">片区植物</label>
        <label class="h-44 float-right primary-color">新增植物</label>
        <div class="mt-6">
          <div class="row bg-white plant-list justify-between full-width">
            <label class="ml-10">植物名称</label>
            <label class="text-color">数量6</label>
            <div class="mr-18">
              <i class="iconfont holder-color font-18">&#xe61e;</i>
              <i class="iconfont ml-10 primary-color font-18">&#xe69b;</i>
            </div>
          </div>
        </div>
      </div>
    </van-cell-group>
    <div class="bottom-button-div bg-color mt-40">
      <q-btn color="white" text-color="black" class="border-1 float-left ml-16" label="上一步" size="md" @click="preStep"/>
      <q-btn color="white" text-color="black" class="border-1 float-right mr-16" label="完成" size="md"
             @click="nextStep"/>
    </div>
  </div>
</template>

<script>
  import addPlantMixin from '../../../mixin/addPlantMixin'
  export default {
    mixins: [
      addPlantMixin
    ],
    data () {
      return {
        aForm: {}
      }
    },
    methods: {
      nextStep () {
//        this.setForm()
        this.$root.$emit('next-step')
      },
      preStep () {
        this.$root.$emit('pre-step')
      }
    }
  }
</script>

<style lang="scss">
  #area-plant-info {
    .area-input-class {
      height: 44px;

      .q-input {
        margin-left: 20px !important;
        width: calc(100% - 64px - 15px - 20px - 76px);
        padding: 0 !important;
        height: 44px;

        .q-if-inner {
          height: 100%;
        }
      }

      .uom-class {
        width: 76px;
        text-align: center;
      }

      label {
        line-height: 44px;
      }
    }

    .plant-list {
      height: 54px;
      label {
        line-height: 54px;
      }

      i {
        line-height: 54px;
      }
    }

    .bottom-button-div {
      button {
        width: 45%;
      }
    }
  }
</style>
