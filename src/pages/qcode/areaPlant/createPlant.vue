<template>
  <q-layout id="create-plant" view="lHr lpr lfr">
    <q-layout-header>
      <q-toolbar class="nav-header">
        <q-item-side @click.native="back" left icon="keyboard arrow left" class="back-left">
          <label>返回</label>
        </q-item-side>
        <q-toolbar-title class="header-title">
          新增植物
        </q-toolbar-title>
        <q-item-side class="no-info" right>
          <q-btn label="完成" @click="save" color="primary" size="xs"></q-btn>
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
          <q-select hide-underline v-model="uomId" @input="uomInput" :options="uomOptions"
                    class="no-margin border-left" placeholder='选择单位'/>
        </div>
        <van-cell title="苗木分类" is-link :value="category" required class="font-16" @click="chooseNursery"/>
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
          <div class="w-100 h-100" v-for="v, i in sForm.pictures" :key="i">
            <img :src="v.previewUrl" preview-title-enable="false" :key="i" @click="imagePreview(i)"
                 class="full-height full-width">
            <q-icon class="img-close" @click.native="cancelUploadImage(i)" color="grey" name="ion-close-circled"/>
          </div>
          <div class="w-100 h-100 camera-div">
            <q-btn icon="camera alt" size="20px" @click="openCamera" class="camera-button full-height full-width"/>
          </div>
        </div>
      </q-list>
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
    </q-page-container>
  </q-layout>
</template>

<script>
  import { uploadFiles, deleteFiles, request } from '../../../common'
  import { ImagePreview } from 'vant'
  import _ from 'lodash'
  import eventBus from '../../../eventBus'
  import { server } from '../../../const'

  export default {
    data () {
      return {
        sForm: {},
        category: '选择苗木分类',
        uomId: null,
        uomOptions: [],
        plantCategoryArray: [],
        showPlantCategory: false,
        branchShow: false,
        createShow: false,
        branchActions: [],
        newBranch: null,
        otherUomShow: false,
        otherUom: null,
        projectId: this.$store.state.plantInfo.projectId
      }
    },
    methods: {
      back() {
        this.$router.goBack()
      },
      imagePreview (index) {
        console.log(index)
        let previewArray = _.map(this.commonForm.pictures, (img) => {
          return server.PREVIEW_API + img.contentUrl
        })
        console.log(previewArray)
        ImagePreview(previewArray, index)
      },
      cancelUploadImage (index) {
        this.$q.loading.show()
        let img = this.commonForm.pictures[index]
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
      save () {
        console.log(this.sForm)
        this.setForm()
      },
      uomInput (val) {
        if (val === 'other') {
          this.otherUomShow = true
        } else {
          this.sForm.uomId = val
        }
      },
      async getWorkUomList () {
        let resp = await request('uom/all', 'get', null, true)
        if (resp) {
          _.forEach(resp.data.resultMsg, v => {
            v.label = v.name
            v.value = v.id
          })
          this.uomOptions = resp.data.resultMsg
          this.oldUomNames = _.map(this.uomOptions, 'label')
          if (!_.isUndefined(this.uomId) && !_.isUndefined(this.sForm.uomName) && !_.includes(this.oldUomNames, this.uomId)) {
            this.uomOptions.push({label: this.sForm.uomName, value: this.sForm.uomName})
            this.oldUomNames.push(this.sForm.uomName)
            this.uomId = this.sForm.uomName
          }
          this.uomOptions.push({label: '其他', value: 'other'})
        }
      },
      onPickerCancel () {
        this.showPlantCategory = false
      },
      onPickerConfirm (value, index) {
        this.sForm.category = value.category
        this.category = value.text
        this.showPlantCategory = false
      },
      async getPlantCategory () {
        let resp = await request('data/plantCategory')
        if (resp) {
          this.plantCategoryArray = resp.data.resultMsg
          _.forEach(this.plantCategoryArray, (v, key) => {
            v.text = v.name
            v.category = v.id.toString()
          })
          let cat = _.find(this.plantCategoryArray, (v) => {
            return v.category === this.sForm.category
          })
          if (cat) {
            this.category = cat.text
          }
        }
      },
      otherUomClose (action, done) {
        done()
        if (action === 'confirm') {
          if (!_.includes(this.oldUomNames, this.otherUom)) {
            this.sForm.uomName = this.otherUom
            this.sForm.uomId = null
            this.uomId = this.otherUom
            this.uomOptions.splice(this.uomOptions.length - 1, 0,
              {label: this.otherUom.toString(), value: this.otherUom.toString()})
            this.oldUomNames = _.map(this.uomOptions, 'label')
          } else {
            this.$q.notify('单位已存在')
            let uom = _.find(this.uomOptions, this.otherUom)
            if (uom) {
              this.sForm.uomId = uom.value
            }
            this.uomId = this.otherUom
          }
          this.otherUom = null
          this.otherUomShow = false
        } else {
          console.log('cancel')
          this.otherUom = null
          this.uomId = undefined
          this.otherUomShow = false
        }
      },
      createClose (action, done) {
        done()
        if (action === 'confirm') {
          if (!_.includes(this.branchActions, this.otherUom)) {
            this.sForm.position = this.newBranch
            this.position = this.newBranch
            this.sForm.areaId = undefined
          } else {
            this.$q.notify('单位已存在')
          }
          this.createShow = false
        } else {
          console.log('cancel')
          this.createShow = false
        }
      },
      branchItemClicked (item) {
        console.log(item)
        this.sForm.areaId = item.id
        this.position = item.name
        this.branchShow = false
      },
      createNewBranchItem () {
        this.branchShow = false
        this.createShow = true
      },
      async getAreaBranch () {
        this.areaBranches = []
        let resp = await request('qrcode/list?projectId=' + this.projectId + '&type=AREA', 'get', null, null, true)
        if (resp) {
          let branches = resp.data.resultMsg
          _.forEach(branches, v => {
            let branch = {}
            branch.name = v.alias + '-' + v.identifier
            branch.id = v.id.toString()
            branch.callback = this.branchItemClicked
            this.branchActions.push(branch)
          })
          let bid = !_.isUndefined(this.sForm.areaId) ? this.sForm.areaId.toString() : null
          let branch = _.find(this.branchActions, (v) => {
            return v.id === bid
          })
          if (branch) {
            this.position = branch.name
          }
          this.branchActions.push({
            name: '新建',
            callback: this.createNewBranchItem,
          })
        }
      },
      chooseArea () {
        this.branchShow = true
      },
      nextStep () {
        this.setForm()
        this.$root.$emit('next-step')
      },
      preStep () {
        this.$root.$emit('pre-step')
      },
      chooseNursery () {
        this.showPlantCategory = true
      },
      setForm () {
        this.$store.commit('plantInfo/setNewPlantFormToArea', this.sForm)
      }
    },
    mounted () {
      eventBus.$on('upload-success', resp => {
        this.$q.loading.hide()
        this.sForm.pictures.push(resp)
      })
      eventBus.$on('delete-success', (params) => {
        this.$q.loading.hide()
        let index = parseInt(params.idx)
        this.sForm.pictures.splice(index, 1)
        this.$q.dialog({
          title: '提示',
          message: params.msg,
        })
      })
      this.getAreaBranch()
      this.getPlantCategory()
      this.getWorkUomList()
    },
    beforeDestroy () {
      eventBus.$off('upload-success')
      eventBus.$off('delete-success')
    },
  }
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
      background-color: #EEEEEE;

      .q-icon {
        color: gray;
      }
    }
  }
</style>
