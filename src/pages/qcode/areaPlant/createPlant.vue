<template>
  
  <q-layout id="create-plant" view="lHr lpr lfr">
    <q-layout-header>
      <q-toolbar class="nav-header">
        <q-item-side  @click="back" left icon="keyboard arrow left" class="back-left">
          <label @click="back">返回</label>
        </q-item-side>
        <q-toolbar-title class="header-title">
          {{ createPlantTitle }}
        </q-toolbar-title>
        <q-item-side class="no-info" right>
          <q-btn label="完成" @click="save" size="xs"></q-btn>
        </q-item-side>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <van-cell-group :border="false">
        <van-field class="font-16" v-model="sForm.alias" label="植物名称" placeholder="请输入植物名称" required/>
        <div class="van-hairline--bottom font-16 ml-15 area-input-class row">
          <label class="w-64">数量</label>
          <q-input placeholder="输入片值物数量" hide-underline class="no-margin" v-model="sForm.amount"
                   type="number"></q-input>
          <q-select hide-underline v-model="sForm.displayUom" @input="uomInput" :options="uomOptions"
                    class="no-margin border-left" placeholder='选择单位'/>
        </div>
        <van-cell title="苗木分类" is-link :value="sForm.categoryName" required class="font-16" @click="chooseCategory"/>
        <van-field class="font-16" v-model="sForm.position" label="相对位置" placeholder="请输入植物在片区内的位置"/>
        <div class="specification-class font-16 pl-15 pr-15 pt-16 pb-20">
          <label class="h-44">苗木规则</label>
          <div class="row mt-6 spec-row-div">
            <div class="row spec-left-div ">
              <label class="spec-input-left">胸径</label>
              <q-input class="spec-input" hide-underline align="center" v-model="sForm.xiongJing" type="number"/>
              <span class="spec-input-unit">厘米</span>
            </div>
            <div class="row spec-right-div">
              <label class="spec-input-left">高度</label>
              <q-input class="spec-input" hide-underline align="center" v-model="sForm.gaoDu" type="number"/>
              <span class="spec-input-unit">米</span>
            </div>
            <div class="row spec-left-div ">
              <label class="spec-input-left">地径</label>
              <q-input class="spec-input" hide-underline align="center" v-model="sForm.diJing" type="number"/>
              <span class="spec-input-unit">厘米</span>
            </div>
            <div class="row spec-right-div">
              <label class="spec-input-left">冠幅</label>
              <q-input class="spec-input" hide-underline align="center" v-model="sForm.guanFu" type="number"/>
              <span class="spec-input-unit">米</span>
            </div>
            <div class="row spec-left-div col-12">
              <label class="spec-input-left">蓬径</label>
              <q-input class="spec-input" hide-underline align="center" v-model="sForm.pengJing" type="number"/>
              <span class="spec-input-unit">米</span>
            </div>
            <div class="row spec-left-div ">
              <label class="spec-input-left w-64">分支数量</label>
              <q-input class="spec-input w-40" hide-underline align="center" v-model="sForm.branch" type="number"/>
              <span class="spec-input-unit">个</span>
            </div>
            <div class="row spec-right-div">
              <label class="spec-input-left w-50">几年生</label>
              <q-input class="spec-input" hide-underline align="center" v-model="sForm.year"/>
              <span class="spec-input-unit">年</span>
            </div>
            <div class="row spec-left-div col-12">
              <label class="spec-input-left w-64">其他规格</label>
              <q-input class="spec-input other-spec" hide-underline align="center" v-model="sForm.otherFeature"/>
            </div>
          </div>
        </div>
      </van-cell-group>
      <van-field class="font-16" v-model="sForm.source" label="苗源地" placeholder="请输入苗源地信息"/>
      <van-field class="font-16" v-model="sForm.dealer" label="苗木商" placeholder="请输入苗木商信息"/>
      <van-field class="font-16 van-hairline--bottom" v-model="sForm.other"
                 label="苗木其他" placeholder="请输入苗木其他信息"/>
      <q-list class="mt-1 bg-white no-border">
        <q-list-header class="p-0 pl-15 mt-15 font-16 color-black">现场拍照</q-list-header>
        <div class="row pl-20">
          <div class="w-100 h-100 ml-8 mt-8" v-for="(v, i) in thumbnails" :key="i">
            
            <img :src="v" preview-title-enable="false" :key="i" @click="preview(i)"
                 class="full-height full-width">
            <q-icon class="img-close" @click.native="cancelUploadImage(i)" color="grey" name="ion-close-circled"/>
          </div>
          <div class="w-100 h-100 ml-8 mt-8 camera-div">
            <q-btn icon="camera alt" size="20px" @click="openCamera" class="camera-button full-height full-width"/>
          </div>
        </div>
      </q-list>
      
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
    </q-page-container>
  </q-layout>
 
</template>

<script>
import {
  uploadFiles,
  deleteFiles,
  request,
  setPicturesWithPreview
} from "../../../common";
import { ImagePreview } from "vant";
import _ from "lodash";
import eventBus from "../../../eventBus";
import { server } from "../../../const";
import SingleMixin from "../../../mixin/SingleMixin";
import addPlantMixin from "../../../mixin/addPlantMixin";

export default {
  data() {
    return {      
      index: -1
    };
  },
  mixins: [SingleMixin, addPlantMixin],
  computed: {
    createPlantTitle: function() {
      if (this.index !== -1) {
        return "修改片区植物";
      }
      return "添加片区植物";
    },

    thumbnails: function() {
      let arr = [];
      _.forEach(this.sForm.pictures, v => {
        arr.push(server.THUMBNAIL_API + v);
      });
      return arr;
    },
    previews: function() {
      let arr = [];
      _.forEach(this.sForm.pictures, v => {
        arr.push(server.PREVIEW_API + v);
      });
      return arr;
    }
  },
  
  methods: {
    preview(i) {
      ImagePreview(this.previews, i);
    },
   
    back() {
      eventBus.$emit("close-create-plant");
    },

    cancelUploadImage (index) {
      this.sForm.pictures.splice(index, 1)
    },

    openCamera() {
      console.log("open camera");
      if (navigator.camera) {
        navigator.camera.getPicture(
          imgData => {
            this.$q.loading.show();
            uploadFiles(imgData);
          },
          errorMsg => {
            console.log(errorMsg);
          },
          { destinationType: Camera.DestinationType.DATA_URL }
        );
      }
    },
    verifyForm() {
      if (_.isNull(this.sForm.alias) || _.isUndefined(this.sForm.alias)) {
        this.$q.notify({
          message: "名称不能为空",
          position: "center"
        });
        return false;
      }
      if (!this.sForm.category) {
        this.$q.notify({
          message: "分类不能为空",
          position: "center"
        });
        return false;
      }
      return true;
    },
    save() {
      if (!this.verifyForm()) {
        return false;
      }      

      let aForm = this.toAreaForm()
      console.log(aForm)
      if(this.index===-1){
        if(aForm.singles){
          if(aForm.singles.length === 0){
            aForm.singles = []
          }
        } else {
          aForm.singles = []
        }
         
        aForm.singles.push(this.sForm)
      } else {
        aForm.singles[this.index] = this.sForm
      }

      console.log("uomId="+this.sForm.uomId)
      console.log("uomName="+this.sForm.uomName)
      console.log("displayUom="+this.sForm.displayUom)
      console.log("pictures="+this.sForm.pictures)
      console.log(this.sForm.pictures)

      this.saveAreaForm(aForm)
      eventBus.$emit("close-create-plant");
    }     
   
  },
  mounted() {
    let that = this 
    eventBus.$on("show-create-plant", (index) => {
      that.index = index
      console.log("event show-create-plant")
      let aForm = that.toAreaForm()
      if(that.index!==-1){
        that.sForm = Object.assign({}, aForm.singles[index])   
      } else {
        that.sForm = {pictures:[]}
      }
      console.log(that.sForm)
      that.initSingle()
    });   
    

    eventBus.$on("upload-success", resp => {
      this.$q.loading.hide();
      this.sForm.pictures.push(resp.contentUrl);
    });   

    
  },
  beforeDestroy() {
    eventBus.$off("upload-success");
  }
};
</script>

<style lang="scss">
@import "../../../assets/css/variable";

#create-plant {
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

    .q-if-inner {
      height: 100%;
      margin-top: 0 !important;
    }
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

  .img-close {
    margin-left: 70px;
    margin-top: -195px;
    font-size: 28px;
  }

  .camera-div {
    background-color: #eeeeee;

    .q-icon {
      color: gray;
    }
  }

  .no-info {
    .q-btn {
      background-color: $primary !important;
      color: white !important;
    }
  }
}
</style>