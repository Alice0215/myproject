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
        <label class="h-44 float-right primary-color" @click="showPlant(-1)">新增植物</label>
        <div class="mt-6" v-for="(v, i) in aForm.singles" :key="i">
          <div class="row bg-white plant-list justify-between full-width">
            <label class="ml-10">{{v.alias}}</label>
            <label class="text-color">{{ v.amount }}{{ v.uomStr }}</label>
            <div class="mr-18">
              <i class="iconfont holder-color font-18" @click="deleteAddPlant(i)">&#xe61e;</i>
              <i class="iconfont ml-10 primary-color font-18" @click="editPlant(i)">&#xe69b;</i>
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
    <q-modal v-model="createPageShow"> 
    <create-plant></create-plant>
    </q-modal>
  </div>
</template>

<script>
import addPlantMixin from "../../../mixin/addPlantMixin";
import createPlant from "./createPlant";
import _ from "lodash";
import { request } from "../../../common";
import eventBus from '../../../eventBus'

export default {
  mixins: [addPlantMixin],
  components: {
    createPlant
  },
  data() {
    return {
      createPageShow: false,
      aForm: { singles: [], acreage:""}
    };
  },
  methods: {
    editPlant(index) {
      this.showPlant(index)
    },
    deleteAddPlant(index) {
      console.log(index);
      this.aForm.singles.splice(index, 1);
    },

    showPlant(index) {
      this.saveAreaForm(this.aForm)
      eventBus.$emit("show-create-plant", index)
      
      this.createPageShow = true;
    },
    async nextStep() {
      this.$q.loading.show();     

      let param = Object.assign({}, this.aForm);
      param.qrCodeForm = this.toQrCodeForm();      
      console.log("singles :"+param.singles)

      let resp = await request("qrcode/area/save", "put", param, "json", true);
      this.$q.loading.hide();
      if (resp) {
        this.clearInfo()
        this.$root.$emit("next-step");
      }
    },
    preStep() {
      this.saveAreaForm(this.aForm)
      this.$root.$emit("pre-step");
    }
  },
  mounted() {
    console.log("mounted areaPlantInfo.vue")
    let that = this
    that.aForm = that.toAreaForm()
    
    eventBus.$on('close-create-plant', resp => {
      console.log('event close-create-plant')
      that.aForm = that.toAreaForm()
      that.createPageShow = false
    })

  },
  beforeDestroy() {}
};
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
