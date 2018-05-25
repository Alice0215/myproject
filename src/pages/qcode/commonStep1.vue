<template>
  <div id="step-common-info">
    <van-cell-group :border="false">
      <van-field class="font-16" v-model="form.alias" :label="nameLabel" :placeholder="nameHolder" required/>
      <van-cell title="所属项目" is-link :value="form.projectName" required class="font-16" @click="showPop = true"/>
      <van-cell title="地址" is-link :value="form.formattedAddress" required class="font-16" @click="chooseMap"/>
      <van-field class="van-hairline--bottom"
                 v-model="form.description"
                 label="备注"
                 type="textarea"
                 placeholder="请输入备注"
                 rows="3"
                 autosize
      />
    </van-cell-group>
    <q-list class="mt-1 bg-white no-border">
      <q-list-header class="p-0 pl-20 font-16 color-black">现场拍照</q-list-header>
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
    <van-popup v-model="showPop" position="bottom">
      <van-picker
        :loading="pickerLoading"
        show-toolbar
        title="选择项目"
        :columns="projectList"
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onChang"
      />
    </van-popup>
    <div class="bottom-button-div mt-40">
      <q-btn color="white" text-color="black" class="border-1 float-left ml-16" label="上一步" size="md" @click="preStep"/>
      <q-btn color="white" text-color="black" class="border-1 float-right mr-16" label="下一步" size="md"
             @click="nextStep"/>
    </div>
  </div>
</template>

<script>
import addPlantMixin from "../../mixin/addPlantMixin";
import {
  uploadFiles,
  deleteFiles,
  request,
  setPicturesWithPreview
} from "../../common";
import { ImagePreview } from "vant";
import _ from "lodash";
import eventBus from "../../eventBus";
import { plantType, server } from "../../const";

export default {
  mixins: [addPlantMixin],
  computed: {
    thumbnails: function() {
      let arr = [];
      _.forEach(this.form.pictures, v => {
        arr.push(server.THUMBNAIL_API + v);
      });
      return arr;
    },
    previews: function() {
      let arr = [];
      _.forEach(this.form.pictures, v => {
        arr.push(server.PREVIEW_API + v);
      });
      return arr;
    }
  },
  data() {
    return {
      form: { pictures: [] },
      showPop: false,
      projectList: [],
      pageNum: 1,
      pickerLoading: false,
      hasLoadAll: false,
      nameLabel: "",
      nameHolder: "",
      pickArray: []
    };
  },
  methods: {
    preview(i) {
      ImagePreview(this.previews, i);
    },
    async getProjectList() {
      if (this.hasLoadAll) {
        return;
      }
      this.pickerLoading = true;
      let resp = await request(
        "project/list?pageNo=" + this.pageNum + "&pageSize=20",
        "get",
        "",
        "json",
        true
      );
      if (resp.data.resultCode === "SUCCESS") {
        this.pickerLoading = false;
        let list = resp.data.resultMsg;
        if (list.length === 0 || !list.length) {
          this.hasLoadAll = true;
          return;
        }
        if (list.length < 20) {
          this.hasLoadAll = true;
        } else {
          this.pageNum++;
        }
        for (let i = 0; i < list.length; i++) {
          let v = list[i];
          this.projectList.push({ text: v.projectName, id: v.id });
        }
      }
    },
    preStep() {
      this.stash();
      this.$root.$emit("last-pre");
    },
    verifyForm() {
      if (_.isNull(this.form.alias) || _.isUndefined(this.form.alias)) {
        this.$q.notify({
          message: "名称不能为空",
          position: "center"
        });
        return false;
      }
      if (_.isNull(this.form.projectId) || _.isUndefined(this.form.projectId)) {
        this.$q.notify({
          message: "所属项目不能为空",
          position: "center"
        });
        return false;
      }
      if (!this.form.locationJson && !this.form.formattedAddress) {
          this.$q.notify({
            message: "地址不能为空",
            position: "center"
          });
          // return false;
        }
      
      return true;
    },
    async nextStep() {
      if (!this.verifyForm()) {
        return false;
      }

      let url = null;
      if (this.type === plantType.DEVICE) {
        url = "qrcode/equipment/save";
      } else if (this.type === plantType.OTHER) {
        url = "/qrcode/other/save";
      }

      if (_.isNull(url)) {
        this.stash();
        this.$root.$emit("next-step");
      } else {
        this.$q.loading.show();
        let resp = await request(url, "put", this.form, "json", true);
        this.$q.loading.hide();
        if (resp) {
          this.clearInfo();
          this.$root.$emit("next-step");
        }
      }
    },
    onConfirm(value, index) {
      console.log("value: " + value.id + "-" + value.text);
      this.form.projectId = value.id;
      this.form.projectName = value.text;

      this.showPop = false;
    },
    onCancel() {
      this.showPop = false;
    },
    async onChang(picker, values, index) {
      if (index === this.projectList.length - 1 && !this.hasLoadAll) {
        await this.getProjectList();
        picker.setIndexes([index]);
      }
    },

    stash() {
      this.saveQrCodeForm(this.form);
    },

    chooseMap() {
      this.stash();
      this.$router.push("/project/map?from=qrCode");
    },

    cancelUploadImage(index) {
      this.form.pictures.splice(index, 1);
    },
    openCamera() {
      this.stash();
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

    async init() {
      console.log("commonStep1.init");
      this.qrCodeId = this.$route.query.id;
      this.type = this.$route.query.type;
    
      let qrCodeForm = this.toQrCodeForm();
      if (!qrCodeForm.id) {
        this.$q.loading.show();
        const resp = await request(
          "qrcode/detail?qrCodeId=" + this.qrCodeId,
          "get",
          null,
          "json",
          true
        );
        this.$q.loading.hide();
        if (resp) {
          let type = resp.data.resultMsg.type;
          let code = resp.data.resultMsg;
          console.debug("code: ");
          console.debug(code);
          if (type) {
            if (type.key === plantType.SINGLE) {
              let singleForm = this.convertSingle(resp.data.resultMsg);
              this.saveSingleForm(singleForm);
              code = resp.data.resultMsg.code;
            } else if (type.key === plantType.AREA) {
              let areaForm = this.convertArea(resp.data.resultMsg);
              this.saveAreaForm(areaForm);
              code = resp.data.resultMsg.code;
            }
            qrCodeForm = this.convertCode(code);
          } else {
            qrCodeForm = this.convertCode(code);
            qrCodeForm.typeKey = this.type
            if (this.type === plantType.SINGLE) {              
              this.saveSingleForm({id:this.qrCodeId});
            } else if (this.type === plantType.AREA) {
              this.saveAreaForm({id:this.qrCodeId})
            }
          }
          
          this.saveQrCodeForm(qrCodeForm);
        }
      }     

      if (qrCodeForm.typeKey) {
        this.type = qrCodeForm.typeKey;
        console.log(this.type);
      } else {
        this.type = this.$route.query.type;
        qrCodeForm.typeKey = this.$route.query.type;
      }

      this.form = qrCodeForm
      let data = {areaShow:false, singleShow:false, title:''}
      if (this.type === plantType.AREA) {
        data.areaShow = true;
        data.title = "填写片区信息";
        data.headerTitle = "片区类型";
        this.nameLabel = "片区名称";
        this.nameHolder = "请输入片区名称";
      } else if (this.type === plantType.SINGLE) {
        data.singleShow = true;
        data.title = "填写单株信息";
        data.headerTitle = "单株类型";
        this.nameLabel = "植物名称";
        this.nameHolder = "请输入植物名称";
      } else if (this.type === plantType.DEVICE) {
        data.headerTitle = "设备类型";
        this.nameLabel = "设备名称";
        this.nameHolder = "请输入设备名称";
      } else if (this.type === plantType.OTHER) {
        data.headerTitle = "其他类型";
        this.nameLabel = "名称";
        this.nameHolder = "请输入名称";
      }
      
      this.$root.$emit("refresh-data", data)

      this.getProjectList();

    }
  },
  mounted() {
    console.log("mounted commonStep1.vue");
    let that = this;
    
    that.init();    

    eventBus.$on("upload-success", resp => {
      that.$q.loading.hide();
      that.form.pictures.push(resp.contentUrl);
    });
  },
  beforeDestroy() {
    eventBus.$off("upload-success");
    eventBus.$off("clear-info");
  }
};
</script>

<style lang="scss">
@import "../../assets/css/common";

#step-common-info {
  .camera-div {
    background-color: #eeeeee;
  }

  .q-btn-inner {
    .q-icon {
      color: gray;
    }
  }

  .van-cell {
    padding-left: 20px;
    padding-right: 20px;
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
}
</style>
