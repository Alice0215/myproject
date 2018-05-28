<template>
  <div id="single-plant-info">
    <van-cell-group :border="false">
      <van-cell title="所属片区" is-link :value="sForm.areaName" class="font-16" @click="chooseArea"/>
      <van-field class="font-16" v-model="sForm.position" label="相对位置" placeholder="请输入相对位置" />
      <van-cell title="苗木分类" is-link :value="sForm.categoryName" required class="font-16" @click="chooseCategory"/>
      <div class="van-hairline--bottom font-16 ml-15 area-input-class row">
        <label class="w-64">苗木总量</label>
        <q-input placeholder="输入面积或数量" class="no-margin" v-model="sForm.amount" type="number"></q-input>
        <q-select hide-underline v-model="sForm.displayUom" @input="uomInput" :options="uomOptions"
                    class="no-margin border-left" placeholder='选择单位'/>
      </div>
      <div class="specification-class font-16 pl-15 pr-15 pt-16 pb-20">
        <label class="h-44">苗木规格</label>
        <div class="row mt-6 spec-row-div">
          <div class="row spec-left-div ">
            <label class="spec-input-left">胸径</label>
            <q-input class="spec-input" align="center" v-model="sForm.xiongJing" type="number"/>
            <span class="spec-input-unit">厘米</span>
          </div>
          <div class="row spec-right-div">
            <label class="spec-input-left">高度</label>
            <q-input class="spec-input" align="center" v-model="sForm.gaoDu" type="number"/>
            <span class="spec-input-unit">米</span>
          </div>
          <div class="row spec-left-div ">
            <label class="spec-input-left">地径</label>
            <q-input class="spec-input" align="center" v-model="sForm.diJing" type="number"/>
            <span class="spec-input-unit">厘米</span>
          </div>
          <div class="row spec-right-div">
            <label class="spec-input-left">冠幅</label>
            <q-input class="spec-input" align="center" v-model="sForm.guanFu" type="number"/>
            <span class="spec-input-unit">米</span>
          </div>
          <div class="row spec-left-div col-12">
            <label class="spec-input-left">蓬径</label>
            <q-input class="spec-input" align="center" v-model="sForm.pengJing" type="number"/>
            <span class="spec-input-unit">米</span>
          </div>
          <div class="row spec-left-div ">
            <label class="spec-input-left w-64">分支数量</label>
            <q-input class="spec-input w-40" align="center" v-model="sForm.branch" type="number"/>
            <span class="spec-input-unit">个</span>
          </div>
          <div class="row spec-right-div">
            <label class="spec-input-left w-50">几年生</label>
            <q-input class="spec-input" align="center" v-model="sForm.year"/>
            <span class="spec-input-unit">年</span>
          </div>
          <div class="row spec-left-div col-12">
            <label class="spec-input-left w-64">其他规格</label>
            <q-input class="spec-input other-spec" align="center" v-model="sForm.otherFeature"/>
          </div>
        </div>
      </div>
      <van-field class="font-16" v-model="sForm.source" label="苗源地" placeholder="请输入苗源地信息"/>
      <van-field class="font-16" v-model="sForm.dealer" label="苗木商" placeholder="请输入苗木商信息"/>
      <van-field class="font-16 van-hairline--bottom" v-model="sForm.other"
                 label="苗木其他" placeholder="请输入苗木其他信息"/>
    </van-cell-group>

    <div class="bottom-button-div mt-40">
      <q-btn color="white" text-color="black" class="border-1 float-left ml-16" label="上一步" size="md" @click="preStep"/>
      <q-btn color="white" text-color="black" class="border-1 float-right mr-16" label="完成" size="md"
             @click="nextStep"/>
    </div>
    
    <van-popup v-model="showArea" position="bottom">
      <van-picker
        show-toolbar
        title="所属区域"
        :columns="areaArray"
        @cancel="onAreaPickerCancel"
        @confirm="onAreaPickerConfirm"
      />
    </van-popup>
    
    <van-dialog
      v-model="otherUomShow"
      show-cancel-button
      :before-close="otherUomClose">
      <van-field
        v-model="otherUom"
        label="自定义单位"
        placeholder="请输入单位"
      />
    </van-dialog>
    <van-popup v-model="showPlantCategory" position="bottom">
      <van-picker
        show-toolbar
        title="苗木分类"
        :columns="plantCategoryArray"
        @cancel="onPickerCancel"
        @confirm="onPickerConfirm"
      />
    </van-popup>
    <div class="h-50">
    </div>
  </div>
</template>

<script>
import addPlantMixin from "../../../mixin/addPlantMixin";
import SingleMixin from "../../../mixin/SingleMixin";
import _ from "lodash";
import { request } from "../../../common";
import eventBus from "../../../eventBus";

export default {
  mixins: [addPlantMixin, SingleMixin],
  data() {
    return {
      showArea: false,
      areaArray: []      
    };
  },
  methods: {
    onAreaPickerCancel () {
      this.showArea = false
    },

    onAreaPickerConfirm(value, index) {
      let area = this.areaArray[index];      
      this.sForm.areaName = area.text;
      this.sForm.areaId = area.id;
      this.showArea = false;
    },
    async getAreaList() {
      let resp = await request(
        "qrcode/list?projectId=" + this.toQrCodeForm().projectId + "&type=AREA",
        "get",
        null,
        null,
        true
      );
      if (resp) {
        let list = resp.data.resultMsg;
        let that = this
        _.forEach(list, v => {
          let one = {};
          one.text = v.alias + "-" + v.identifier;
          one.id = v.id          
          that.areaArray.push(one);
        });
      }
    },
    chooseArea() {
      this.showArea = true;
    },
    verifyForm() {
      if (!this.sForm.category) {
        this.$q.notify({
          message: "分类不能为空",
          position: "center"
        });
        return false;
      }
      return true;
    },
    async nextStep() {
      if (!this.verifyForm()) {
        return false;
      }
      this.$q.loading.show();
      let param = Object.assign({}, this.sForm);
      console.log("areaId: "+this.sForm.areaId)
      param.qrCodeForm = this.toQrCodeForm();
      
      let resp = await request(
        "qrcode/single/save",
        "put",
        param,
        "json",
        true
      );
      this.$q.loading.hide();
      if (resp) {
        this.clearInfo()
        this.$root.$emit("next-step");
      }
    },
    preStep() {
      this.saveSingleForm(this.sForm)
      eventBus.$emit("load-commonStep");
      this.$root.$emit("pre-step");
    }
  },
  mounted() {
    console.log("mounted singlePlantInfo.vue")
    this.sForm = this.toSingleForm()        
    console.log("areaId: "+this.sForm.areaId)
    this.getAreaList()
    this.initSingle()   
    
  },
  beforeDestroy() {
    //this.setForm()
  }
};
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