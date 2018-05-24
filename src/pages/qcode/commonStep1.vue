<template>
  <div id="step-common-info">
    <van-cell-group :border="false">
      <van-field class="font-16" v-model="form.alias" :label="nameLabel" :placeholder="nameHolder" required/>
      <van-cell title="所属项目" is-link :value="form.projectName" required class="font-16" @click="showPop = true"/>
      <van-cell title="地址" is-link :value="positionName" required class="font-16" @click="chooseMap"/>
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
  import addPlantMixin from '../../mixin/addPlantMixin'
  import { uploadFiles, deleteFiles, request, setPicturesWithPreview } from '../../common'
  import { ImagePreview } from 'vant'
  import _ from 'lodash'
  import eventBus from '../../eventBus'
  import { plantType, server } from '../../const'

  export default {
    mixins: [
      addPlantMixin,
    ],
    computed:{      
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
    data () {
      return {
        form:{},
        showPop: false,
        projectList: [],
        positionName: '定位地址',
        pageNum: 1,
        pickerLoading: false,
        hasLoadAll: false,
        nameLabel: '',
        nameHolder: '',
        pickArray: []
      }
    },
    methods: {
      preview (i) {
        ImagePreview(this.previews, i)
      },
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
          for(let i=0; i<list.length; i++) {
            let v = list[i]
            this.projectList.push({text: v.projectName, 'id': v.id})
          }          
        }
      },
      preStep () {
        this.qrCodeForm = this.form
        this.$root.$emit('last-pre')
      },
      verifyForm () {
        if (_.isNull(this.form.alias) || _.isUndefined(this.form.alias)) {
          this.$q.notify({
            message: '名称不能为空',
            position: 'center',
          })
          return false
        }
        if (_.isNull(this.form.projectId) || _.isUndefined(this.form.projectId)) {
          this.$q.notify({
            message: '所属项目不能为空',
            position: 'center',
          })
          return false
        }
        if (_.isNull(this.form.locationJson) || _.isUndefined(this.form.locationJson)) {
          if (_.isNull(this.form.location) || _.isUndefined(this.form.location)){
            this.$q.notify({
              message: '地址不能为空',
              position: 'center',
            })
            return false
          }          
        }
        return true
      },
      async nextStep () {
        if (!this.verifyForm()) {
          return false
        }
        
        let url = null
        if (this.type === plantType.DEVICE) {
          url = 'qrcode/equipment/save'
        } else if (this.type === plantType.OTHER) {
          url = '/qrcode/other/save'
        }
        if (_.isNull(url)) {
          this.qrCodeForm = this.form
          this.$root.$emit('next-step')
        } else {
          this.$q.loading.show()
          let params = this.getQrCodeFormParam(this.form)
          console.log("params.projectId: "+params.projectId)
          let resp = await request(url, 'put', params, 'json', true)
          this.$q.loading.hide()
          if (resp) {
            this.clearInfo()
            this.$root.$emit('next-step')
          }
        }
      },
      onConfirm (value, index) {
        console.log("value: "+value.id+"-"+value.text)
        if(this.form.projectId !== value.id){
          this.singleFrom
        }
        this.form.projectId = value.id    
        this.form.projectName = value.text
        
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
        this.qrCodeForm = this.form
        this.$router.push('/project/map?from=qrCode')
      },
      
      cancelUploadImage (index) {
        this.$q.loading.show()
        let img = this.form.pictures[index]
        deleteFiles(img.contentUrl, index)
      },
      openCamera () {
        this.qrCodeForm = this.form
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
     
      init () {
        console.log("project: "+this.form)
        if(!this.form.projectName){
          console.log("project: "+this.form.project)
          this.form.projectId = this.form.project.id    
          this.form.projectName = this.form.project.projectName
        }   
        
        switch (this.type) {
          case plantType.SINGLE:
            this.nameLabel = '植物名称'
            this.nameHolder = '请输入植物名称'
            break
          case plantType.AREA:
            this.nameLabel = '片区名称'
            this.nameHolder = '请输入片区名称'
            break
          case plantType.DEVICE:
            this.nameLabel = '设备名称'
            this.nameHolder = '请输入设备名称'
            this.pickArray = ['projectId', 'qrCodeId', 'alias', 'description', 'pictures', 'locationJson']
            break
          case plantType.OTHER:
            this.nameLabel = '名称'
            this.nameHolder = '请输入名称'
            this.pickArray = ['projectId', 'qrCodeId', 'alias', 'description', 'pictures', 'locationJson']
            break
          default:
            break
        }
       
      },
    },
    mounted () {
      this.form = this.getQrCodeFormParam(this.qrCodeForm)
      this.form.projectName = this.qrCodeForm.projectName
      this.form.project = this.qrCodeForm.project
      for(let i=0; i< this.qrCodeForm.pictures.length; i++){
        this.form.pictures.push(that.qrCodeForm.pictures[i])
      }   
      this.init()
      
      eventBus.$on('upload-success', resp => {
        this.$q.loading.hide()
        this.form.pictures.push(resp)
      })
      eventBus.$on('delete-success', (params) => {
        this.$q.loading.hide()
        let index = parseInt(params.idx)
        this.form.pictures.splice(index, 1)
        this.$q.dialog({
          title: '提示',
          message: params.msg,
        })
      })
      if (this.form && this.form.locationJson) {
        let location = JSON.parse(this.form.locationJson)
        this.positionName = location.formattedAddress
      }
      this.getProjectList()
    },
    beforeDestroy () {
      
      eventBus.$off('upload-success')
      eventBus.$off('delete-success')
      eventBus.$off('clear-info')
    },
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

    .img-close {
      margin-left: 70px;
      margin-top: -195px;
      font-size: 28px;
    }

  }
</style>
