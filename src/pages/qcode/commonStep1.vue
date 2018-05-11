<template>
  <div id="step-common-info">
    <van-cell-group :border="false">
      <van-field  class="font-16" v-model="commonForm.projectName" label="植物名称" placeholder="请输入植物名称" required />
      <van-cell title="所属项目" is-link value="默认项目名称" required class="font-16" @click="showPop = true" />
      <van-cell title="地址" is-link value="定位地址" required class="font-16" @click="chooseMap" />
      <van-field class="van-hairline--bottom"
        v-model="commonForm.remark"
        label="备注"
        type="textarea"
        placeholder="请输入备注"
        rows="3"
        autosize
      />
    </van-cell-group>
    <q-list class="mt-6 bg-white no-border">
      <q-list-header class="p-0 pl-20 font-16 color-black">现场拍照</q-list-header>
      <div class="row pl-20">
        <div class="w-100 h-100" v-for="v, i in commonForm.pictures" :key="i">
          <img :src="v.previewUrl"  preview-title-enable="false" :key="i" @click="imagePreview(i)" class="full-height full-width">
          <q-icon class="img-close" @click.native="cancelUploadImage(i)" color="grey" name="ion-close-circled"/>
        </div>
        <div class="w-100 h-100 mt--8 camera-div">
          <q-btn icon="camera alt" size="20px" @click="openCamera" class="camera-button full-height full-width"/>
        </div>
      </div>
    </q-list>
    <van-popup v-model="showPop" position="bottom">
      <van-picker
        show-toolbar
        title="选择项目"
        :columns="projectList"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
    <div class="bottom-button-div mt-40">
      <q-btn color="white" text-color="black"  class="border-1 float-left ml-16" label="上一步" size="md" />
      <q-btn color="white" text-color="black" class="border-1 float-right mr-16" label="下一步" size="md" @click="nextStep" />
    </div>
  </div>
</template>

<script>
import addPlantMixin from '../../mixin/addPlantMixin'
import { uploadFiles, deleteFiles } from '../../common'
import { ImagePreview } from 'vant'

export default {
  mixins: [
    addPlantMixin
  ],
  data () {
    return {
      showPop: false,
      projectList: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    }
  },
  methods: {
    nextStep () {
      this.$root.$emit('next-step')
    },
    onConfirm (value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`)
    },
    onCancel () {
      console.log('取消')
    },
    chooseMap () {
    },
    imagePreview (index) {
      console.log(index)
      let previewArray = _.map(this.form.pictures, (img) => {
        return this.previewApi + img.contentUrl
      })
      console.log(previewArray)
      ImagePreview(previewArray, index)
    },
    cancelUploadImage (index) {
      this.$q.loading.show()
      let img = this.form.pictures[index]
      deleteFiles(img.contentUrl, index)
    },
    openCamera () {
      console.log('open camera')
      if (navigator.camera) {
        navigator.camera.getPicture(imgData => {
          this.$q.loading.show()
          uploadFiles(imgData)
        }, errorMsg => {
          console.log(errorMsg)
        }, { destinationType: Camera.DestinationType.DATA_URL })
      }
    }
  }
}
</script>

<style lang="scss">

@import "../../assets/css/common";

#step-common-info {
  .camera-div {
    background-color: #EEEEEE;
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
}
</style>
