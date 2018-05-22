<template>
  <div id="single-plant-info">
    <van-cell-group :border="false">
      <van-cell title="所属片区" is-link :value="areaName" class="font-16" @click="chooseArea"/>
      <van-field class="font-16" v-model="sForm.position" label="相对位置" placeholder="请输入相对位置" />
      <van-cell title="苗木分类" is-link :value="category" required class="font-16" @click="chooseNursery"/>
      <div class="van-hairline--bottom font-16 ml-15 area-input-class row">
        <label class="w-64">苗木面积</label>
        <q-input placeholder="输入片值苗木面积" class="no-margin" v-model="sForm.amount" type="number"></q-input>
        <q-select v-model='uomId' @input="uomInput" :options='uomOptions'
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
      v-model="createShow"
      show-cancel-button
      :before-close="createClose">
      <van-field
        v-model="newBranch"
        label="自定义区域"
        placeholder="请输入区域"
      />
    </van-dialog>
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
  import addPlantMixin from '../../../mixin/addPlantMixin'
  import _ from 'lodash'
  import { request } from '../../../common'

  export default {
    mixins: [
      addPlantMixin,
    ],
    data () {
      return {
        areaBranches: [],
        branchShow: false,
        createShow: false,
        branchActions: [],
        newBranch: null,
        sForm: {},
        plantCategoryArray: [],
        showPlantCategory: false,
        position: null,
        category: '选择苗木分类',
        uomOptions: [],
        oldUomNames: [],
        otherUomShow: false,
        otherUom: null,
        uomId: null,
        areaName: '选择片区内容'
      }
    },
    methods: {
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
          if (!_.isUndefined(this.uomId) && !_.includes(this.oldUomNames, this.uomId)) {
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
        this.areaName = item.name
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
            this.areaName = branch.name
          }
//          this.branchActions.push({
//            name: '新建',
//            callback: this.createNewBranchItem,
//          })
        }
      },
      chooseArea () {
        this.branchShow = true
      },
      verifyForm () {
        if (_.isNull(this.sForm.category) || _.isUndefined(this.sForm.category)) {
          this.$q.notify({
            message: '分类不能为空',
            position: 'center'
          })
          return false
        }
        return true
      },
      async nextStep () {
        if (!this.verifyForm()) {
          return false
        }
        this.setForm()
        this.$q.loading.show()
        let resp = await request('qrcode/single/save', 'put', this.singleForm, 'json', true)
        this.$q.loading.hide()
        if (resp) {
          this.sForm = {}
          this.$root.$emit('next-step')
        }
      },
      preStep () {
        this.$root.$emit('pre-step')
      },
      chooseNursery () {
        this.showPlantCategory = true
      },
      setForm () {
        this.singleForm = this.sForm
        let qFrom = Object.assign({}, this.qrCodeForm)
        this.$store.commit('plantInfo/setQRCodeFormToSingle', qFrom)
      },
      getForm () {
        this.sForm = Object.assign({}, this.singleForm)
        if (!_.isNull(this.sForm.uomName)) {
          this.uomId = this.sForm.uomName
        } else {
          this.uomId = this.sForm.uomId
        }
        if (!_.isUndefined(this.sForm.position)) {
          this.position = this.sForm.position
        }
      },
    },
    mounted () {
      this.navTitle = '植物名称'
      this.getForm()
      this.getAreaBranch()
      this.getPlantCategory()
      this.getWorkUomList()
    },
    beforeDestroy () {
      this.setForm()
    },
  }
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
