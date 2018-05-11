<template>
  <div id="step-common-info">
    <van-cell-group :border="false">
      <van-field class="font-16" v-model="qrCodeForm.alias" label="植物名称" placeholder="请输入植物名称" required/>
      <van-cell title="所属项目" is-link :value="projectName" required class="font-16" @click="showPop = true"/>
      <van-cell title="地址" is-link :value="positionName" required class="font-16" @click="chooseMap"/>
      <van-field class="van-hairline--bottom"
                 v-model="qrCodeForm.remark"
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
        <div class="w-100 h-100" v-for="v, i in qrCodeForm.pictures" :key="i">
          <img :src="v.previewUrl" preview-title-enable="false" :key="i" @click="imagePreview(i)"
               class="full-height full-width">
          <q-icon class="img-close" @click.native="cancelUploadImage(i)" color="grey" name="ion-close-circled"/>
        </div>
        <div class="w-100 h-100 mt--8 camera-div">
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
      <q-btn color="white" text-color="black" class="border-1 float-left ml-16" label="上一步" size="md"/>
      <q-btn color="white" text-color="black" class="border-1 float-right mr-16" label="下一步" size="md"
             @click="nextStep"/>
    </div>
  </div>
</template>

<script>
  import addPlantMixin from '../../mixin/addPlantMixin'
  import { uploadFiles, deleteFiles, request } from '../../common'
  import { ImagePreview } from 'vant'
  import _ from 'lodash'
  import eventBus from '../../eventBus'

  export default {
    mixins: [
      addPlantMixin,
    ],
    data () {
      return {
        showPop: false,
        projectList: [],
        projectAllList: [],
        projectName: '默认项目名称',
        positionName: '定位地址',
        pageNum: 1,
        pickerLoading: false,
        hasLoadAll: false
      }
    },
    methods: {
      async getProjectList () {
        if (this.hasLoadAll) {
          return
        }
        this.pickerLoading = true
        let resp = await request('project/list?pageNo=' + this.pageNum + '&pageSize=20', 'get', '', 'json', true)
        if (resp.data.resultCode === 'SUCCESS') {
          this.pickerLoading = false
          let list = resp.data.resultMsg
          if (list.length === 0 || !list.length) {
            this.hasLoadAll = true
            return
          }
          if (list.length < 20) {
            this.hasLoadAll = true
          } else {
            this.pageNum++
          }
          if (this.projectAllList.length > 0) {
            this.projectAllList = this.projectAllList.concat(list)
          } else {
            this.projectAllList = list
          }
          this.projectList = _.map(this.projectAllList, (v) => {
            return {text: v.projectName, 'id': v.id}
          })
          console.log(this.projectList)
        }
      },
      nextStep () {
        this.$root.$emit('next-step')
      },
      onConfirm (value, index) {
        this.projectName = value.text
        this.qrCodeForm.projectId = value.id
        this.showPop = false
      },
      onCancel () {
        this.showPop = false
      },
      async onChang (picker, values, index) {
        if ((index === (this.projectList.length - 1)) && !this.hasLoadAll) {
          await this.getProjectList()
          picker.setIndexes([index])
        }
      },
      chooseMap () {
        this.$router.push('/project/map?from=qrCode')
      },
      imagePreview (index) {
        console.log(index)
        let previewArray = _.map(this.qrCodeForm.pictures, (img) => {
          return this.previewApi + img.contentUrl
        })
        console.log(previewArray)
        ImagePreview(previewArray, index)
      },
      cancelUploadImage (index) {
        this.$q.loading.show()
        let img = this.qrCodeForm.pictures[index]
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
          }, {destinationType: Camera.DestinationType.DATA_URL})
        }
      },
    },
    mounted () {
      eventBus.$on('upload-success', resp => {
        this.$q.loading.hide()
        let imgs = this.qrCodeForm.pictures
        imgs.push(resp)
        // todo vuex，需要修改
        this.qrCodeForm.pictures = imgs
      })
      eventBus.$on('delete-success', (params) => {
        this.$q.loading.hide()
        let index = parseInt(params.idx)
        let imgs = this.qrCodeForm.pictures
        imgs.splice(index, 1)
        // todo vuex，需要修改
        this.qrCodeForm.pictures = imgs
        this.$q.dialog({
          title: '提示',
          message: params.msg
        })
      })
      if (this.qrCodeForm && this.qrCodeForm.locationJson) {
        let location = JSON.parse(this.qrCodeForm.locationJson)
        this.positionName = location.formattedAddress
      }
      this.getProjectList()
    },
    beforeDestroy () {
      eventBus.$off('upload-success')
      eventBus.$off('delete-success')
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
