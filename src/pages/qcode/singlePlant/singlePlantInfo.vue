<template>
  <div id="single-plant-info">
    <van-cell-group :border="false">
      <van-cell title="所属片区" is-link :value="sForm.areaName" class="font-16" @click="chooseArea"/>
      <van-field class="font-16" v-model="sForm.position" label="相对位置" placeholder="请输入相对位置" />
      <van-cell title="苗木分类" is-link :value="sForm.category.name" required class="font-16" @click="chooseNursery"/>
      <div class="van-hairline--bottom font-16 ml-15 area-input-class row">
        <label class="w-64">苗木面积</label>
        <q-input placeholder="输入片值苗木面积" class="no-margin" v-model="sForm.amount" type="number"></q-input>
        <q-select v-model='displayUom' @input="uomInput" :options='uomOptions'
                  class="no-margin border-left" placeholder='选择单位'/>
      </div>
      <div class="specification-class font-16 pl-15 pr-15 pt-16 pb-20">
        <label class="h-44">苗木规则</label>
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
    <van-actionsheet v-model="branchShow" :actions="branchActions" cancel-text="取消"/>
    
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

export default {
  mixins: [addPlantMixin, SingleMixin],
  data() {
    return {
      branchShow: false,
      branchActions: [],
      sForm: {category:{}}
    };
  },
  methods: {
    uomInput(val) {
      if (val === "other") {
        this.otherUomShow = true;
      } else {
        this.sForm.uomId = val;
        this.displayUom = val;
        this.sForm.uomName = null;
      }
    },

    onPickerConfirm(value, index) {
      this.sForm.category = this.plantCategoryArray[index];
      this.showPlantCategory = false;
    },

    otherUomClose(action, done) {
      done();
      if (action === "confirm") {
        let otherUom = this.otherUom.toString();
        for (let i = 0; i < this.uomOptions.length; i++) {
          let one = this.uomOptions[i];
          if (one.label === otherUom) {
            this.$q.notify("单位已存在");
            return;
          }
        }

        this.uomOptions.splice(this.uomOptions.length - 1, 0, {
          label: otherUom,
          value: otherUom
        });

        this.sForm.uomId = null;
        this.displayUom = otherUom;
        this.sForm.uomName = otherUom;

        this.otherUom = null;
        this.otherUomShow = false;
      } else {
        console.log("cancel");
        this.otherUom = null;
        this.otherUomShow = false;
      }
    },
    branchItemClicked(item) {
      console.log(item);
      this.sForm.areaName = item.area.alias;
      this.sForm.areaId = item.area.id;
      this.branchShow = false;
    },
    async getAreaList() {
      let resp = await request(
        "qrcode/list?projectId=" + this.qrCodeForm.projectId + "&type=AREA",
        "get",
        null,
        null,
        true
      );
      if (resp) {
        let branches = resp.data.resultMsg;
        let that = this
        _.forEach(branches, v => {

          let branch = {};
          branch.name = v.alias + "-" + v.identifier;
          branch.id = v.id.toString();
          branch.callback = this.branchItemClicked;
          branch.area = v;
          that.branchActions.push(branch);
        });
      }
    },
    chooseArea() {
      this.branchShow = true;
    },
    verifyForm() {
      if (_.isNull(this.sForm.category) || _.isUndefined(this.sForm.category)) {
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
      let param = {};
      console.log(this.qrCodeForm.projectId+"-"+this.qrCodeForm.projectName)
      param.qrCodeForm = this.getQrCodeFormParam(this.qrCodeForm);
      param.position = this.sForm.position;
      param.uomId = this.sForm.uomId;
      param.uomName = this.sForm.uomName;
      param.category = this.sForm.categoryId;
      param.xiongJing = this.sForm.xiongJing;
      param.diJing = this.sForm.diJing;
      param.gaoDu = this.sForm.gaoDu;
      param.guanFu = this.sForm.guanFu;
      param.pengJing = this.sForm.pengJing;
      param.branch = this.sForm.branch;
      param.year = this.sForm.year;
      param.otherFeature = this.sForm.otherFeature;
      param.source = this.sForm.source;
      param.dealer = this.sForm.dealer;
      param.other = this.sForm.other;
      param.amount = this.sForm.amount;
      param.singleId = this.sForm.id;
      param.areaId = this.sForm.areaId;

      param.projectId = 1
      param.qrCodeId = 37
      param.category = 1

      let resp = await request(
        "qrcode/single/save",
        "put",
        param,
        "json",
        true
      );
      this.$q.loading.hide();
      if (resp) {
        this.$root.$emit("next-step");
      }
    },
    preStep() {
      this.singleForm = this.sForm
      this.$root.$emit("pre-step");
    }
  },
  mounted() {
    this.sForm.area = this.singleForm.area;
    this.sForm.position = this.singleForm.position;
    this.sForm.uomId = this.singleForm.uomId;
    this.sForm.uomName = this.singleForm.uomName;
    this.sForm.location = this.singleForm.location;
    if(this.singleForm.category){
      this.sForm.category = this.singleForm.category;
    } else {
      this.sForm.category = {name:"", id:0};
    }
   
    this.sForm.xiongJing = this.singleForm.xiongJing;
    this.sForm.diJing = this.singleForm.diJing;
    this.sForm.gaoDu = this.singleForm.gaoDu;
    this.sForm.guanFu = this.singleForm.guanFu;
    this.sForm.pengJing = this.singleForm.pengJing;
    this.sForm.branch = this.singleForm.branch;
    this.sForm.year = this.singleForm.year;
    this.sForm.otherFeature = this.singleForm.otherFeature;
    this.sForm.source = this.singleForm.source;
    this.sForm.dealer = this.singleForm.dealer;
    this.sForm.other = this.singleForm.other;
    this.sForm.amount = this.singleForm.amount;
    
    if (!this.singleForm.areaName) {
      if (this.singleForm.area && this.singleForm.area.code) {
        console.log("area: "+this.singleForm.area.code)
        this.sForm.areaName = this.singleForm.area.code.alias;
        this.sForm.areaId = this.singleForm.area.code.id;
      }
    }
   
    this.getAreaList();
    this.getPlantCategory();
    this.getWorkUomList(this.sForm.uomId, this.sForm.uomName);
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
