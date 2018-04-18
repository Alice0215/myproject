<template>
  <q-layout id="qcode-page">
    <q-toolbar class='header'>
      <q-toolbar class='fix'>
        <a @click="goBack" class='back-a'>
          <q-item-side left icon='keyboard arrow left' class='back-left'/>
          返回</a>
        <q-toolbar-title class='header-title'>
          二维码名称
        </q-toolbar-title>
        <a class="top-nav-right no-info"></a>
      </q-toolbar>
    </q-toolbar>
    <div class='full-width card'>
      <div class="top-field">
        <p class='text-center'>
          <img src='statics/qr.png'/>
        </p>
      </div>
      <!--<div v-show="showType">-->
      <div v-show="showType">
        <span>类型</span>
        <q-btn outline :color="buttonsColor[0]" @click="topButtonsClicked(0)" label="单株植物" size="xs"/>
        <q-btn outline :color="buttonsColor[1]" @click="topButtonsClicked(1)" label="片区植物" size="xs"/>
        <q-btn outline :color="buttonsColor[2]" @click="topButtonsClicked(2)" label="设备" size="xs"/>
        <q-btn outline :color="buttonsColor[3]" @click="topButtonsClicked(3)" label="其他" size="xs"/>
      </div>
      <div class="qr-info">
         <q-field
         @blur="$v.form.alias.$touch"
        @keyup.enter="save"
        :error="$v.form.alias.$error"
         :error-label="namePlaceholder">
        <q-input v-model="form.alias" :placeholder="namePlaceholder" class='login-input'>
          <q-autocomplete @search="searchTerm"  @selected="selected"/>
        </q-input>
         </q-field>
        <q-input
          v-model="projectName"
          placeholder='默认项目名称' class='login-input' readonly @click.native="chooseProject" />
        <div id="single-plant" v-show="singleShow">
          <q-select
            v-model="form.areaId"
            placeholder='所属片区' class='login-input'
            :options="areaBranches"
          />
          <q-select
            v-model="scategory"
            placeholder='苗木分类选项' class='login-input mb-2'
            :options="plantCategoryArray"
          />
          <div class="row justify-between">
            <div class="col-5 row mt-4" v-for="v, i in singlePlantProperties" :key="i">
              <span class="col-3 lineHeight-32">{{v.name}}</span>
              <q-input type="number" class="col-6 border-1 ml-2 h-32 p-8" v-model="v.value"></q-input>
              <span class="col-2 lineHeight-32 ml-4">cm</span>
            </div>
            <div class="col-12 row mt-4 justify-between">
              <div class="col-5 row">
                <span class="col-5 lineHeight-32">分支数量</span>
                <q-input type="number" class="col-4 border-1 ml-2 h-32 p-8" v-model="form.branch"></q-input>
                <span class="col-2 lineHeight-32 ml-4">个</span>
              </div>
              <div class="col-5 row">
                <span class="col-4 lineHeight-32">几年生</span>
                <q-input class="col-7 border-1 ml-2 h-32 p-8" v-model="form.year"></q-input>
              </div>
            </div>
            <div class="row mt-8 col-12">
              <span class="col-2 lineHeight-32">其他</span>
              <q-input v-model="form.other" class="col-9 ml-8 border-1 h-32 p-8"></q-input>
            </div>
          </div>
          <q-input v-model="form.source" placeholder="苗原地" class='login-input mt-10'></q-input>
          <q-input v-model="form.dealer" placeholder="苗木商名称" class='login-input'></q-input>
          <q-input v-model="form.other" placeholder="苗木其他信息" class='login-input'></q-input>
        </div>
        <div class="mt-10" @click="openMap">
          <q-item-side left icon='place' class='inline newicon'></q-item-side>
          <q-item-main lines='1' class='inline text-center ml-0' label>
            {{ form.formattedAddress }}
          </q-item-main>
        </div>
        <q-input
          v-model="form.description"
          placeholder="输入备注信息"
          type="textarea"
          hide-underline class="login-input mt-10"/>
        <div id="area-plant" v-show="areaShow">
          <q-item class="p-2">
            <q-item-side> 片区面积</q-item-side>
            <q-item-main class="area-input">
              <q-input type="number" v-model="form.acreage"></q-input>
            </q-item-main>
            <q-item-main label="平方米"></q-item-main>
          </q-item>
          <q-list class="add-area">
            <q-list-header class="p-2 h-40">添加植物信息</q-list-header>
            <q-item @click.native="addPlant">
              <q-item-side label>新增植物..</q-item-side>
              <q-item-main></q-item-main>
            </q-item>
            <q-item class="mt-8" v-for="v, i in form.singles" :key="i">
              <q-item-side>{{v.alias}}</q-item-side>
              <q-item-main></q-item-main>
              <q-item-side right>
                <span class="mr-6">数量: {{v.amount}}</span>
                <q-icon class="mt--5" name="fas fa-edit"></q-icon>
                <span class="mr-6" @click="editPlant(i)"> 编辑</span>
              </q-item-side>
            </q-item>
          </q-list>
        </div>
        <div>
          <q-list class="mt-6 bg-white pb-8" id="camera-list">
            <q-list-header>现场拍照</q-list-header>
            <div class="row">
              <div class="w-100 h-100 ml-10" v-for="v, i in imageArray" :key="i">
                <img class="full-height full-width" :src="v.previewUrl" v-preview="previewApi + v.contentUrl">
                <q-icon class="img-close" @click.native="cancelUploadImage(i)" color="grey" name="ion-close-circled"/>
              </div>
              <div class="w-100 h-100 ml-10">
                <q-btn icon="camera alt" size="35px" @click="openCamera" class="camera-button full-height full-width"/>
              </div>
            </div>
          </q-list>
        </div>
      </div>
      <q-btn class="full-width btn" @click="save">保存</q-btn>
    </div>
    <q-alert
      type="positive"
      class="fixed-center"
      v-show="showAlert"
    >
      保存成功
    </q-alert>
  </q-layout>
</template>

<script>
import { request, uploadFiles, deleteFiles, removeLocalStory } from '../../common'
import { required, numeric } from 'vuelidate/lib/validators'
import { server, plantType } from '../../const'
import { filter } from 'quasar'
import _ from 'lodash'
import eventBus from '../../eventBus'

export default {
  data () {
    return {
      typeKey: null,
      category: '',
      scategory: '',
      areaId: '',
      showType: false,
      qrCodeId: '',
      form: { singles: [] },
      projectId: '',
      amount: '',
      contactNumber: '',
      contactPerson: '',
      singlePlantProperties: [{ 'name': '胸径', 'value': '', 'key': 'xiongJing' },
        { 'name': '高度', 'value': '', 'key': 'gaoDu' },
        { 'name': '地径', 'value': '', 'key': 'diJing' },
        { 'name': '冠幅', 'value': '', 'key': 'guanFu' },
        { 'name': '篷径', 'value': '', 'key': 'pengJing' }],
      buttonsColor: ['black', 'black', 'black', 'black'],
      namePlaceholder: '请输入植物名称',
      areaShow: false,
      singleShow: false,
      imageArray: [],
      plantCategoryArray: [],
      alias: '',
      aliasList: [],
      projectName: '',
      type: 'SINGLE',
      areaBranches: [],
      showAlert: false,
      topIndex: 0,
      previewApi: ''
    }
  },
  validations: {
    form: {
      alias: { required }
    }
  },
  methods: {
    async getAreaBranch () {
      this.areaBranches = []
      let resp = await request('qrcode/list?projectId=' + this.projectId + '&type=AREA', 'get', null, null, true)
      if (resp) {
        let branches = resp.data.resultMsg
        _.forEach(branches, v => {
          let branch = {}
          branch.label = v.alias + '-' + v.identifier
          branch.value = v.id
          this.areaBranches.push(branch)
        })
      }
    },
    openMap () {
      this.saveLocalData()
      this.$router.push('/project/map?from=qrCode')
    },
    saveLocalData () {
      localStorage.setItem('qrcode-form', JSON.stringify(this.form))
      localStorage.setItem('qrcode-image', JSON.stringify(this.imageArray))
      localStorage.setItem('qrcode-single-property', JSON.stringify(this.singlePlantProperties))
    },
    setSinglePropertyToForm () {
      _.forEach(this.singlePlantProperties, (v, k) => {
        if (v.value.toString().length > 0) {
          let propertyKey = v.key.toString()
          this.form[propertyKey] = v.value
        }
      })
    },
    setFormToSingleProperty () {
      _.forEach(this.form, (v, k) => {
        _.forEach(this.singlePlantProperties, (plant, index) => {
          if (plant.key === k) {
            plant.value = v
          }
        })
      })
    },
    async save () {
      this.$v.$touch()
      if (this.$v.$error) {
        return false
      }

      let form = {}
      let url = ''
      this.setSinglePropertyToForm()
      let qrCodeForm = {}
      qrCodeForm.projectId = this.form.project.id
      qrCodeForm.qrCodeId = this.qrCodeId
      qrCodeForm.alias = this.form.alias
      qrCodeForm.areaId = this.form.areaId
      qrCodeForm.description = this.form.description
      if (this.imageArray.length > 0) {
        qrCodeForm.pictures = _.map(this.imageArray, 'contentUrl')
      }
      qrCodeForm.locationJson = this.form.locationJson
      form.qrCodeForm = qrCodeForm
      console.log(this.type)
      if (this.type === plantType.SINGLE) {
        console.log(this.scategory)
        if (this.scategory === '') {
          this.$q.dialog({
            title: '提示',
            message: '请先选择苗木分类'
          })
          return false
        }
        url = 'qrcode/single/save'
        form.category = this.scategory
        form.xiongJing = this.form.xiongJing
        form.diJing = this.form.diJing
        form.gaoDu = this.form.gaoDu
        form.guanFu = this.form.guanFu
        form.pengJing = this.form.pengJing
        form.branch = this.form.branch
        form.year = this.form.year
        form.otherFeature = this.form.otherFeature
        form.source = this.form.source
        form.dealer = this.form.dealer
        form.other = this.form.other
        form.singleId = this.form.singleId
      } else if (this.type === plantType.AREA) {
        url = 'qrcode/area/save'
        form.areaId = this.form.areaId
        form.acreage = this.form.acreage
        form.singles = this.form.singles
      } else if (this.type === plantType.DEVICE) {
        url = 'qrcode/equipment/save'
        form = qrCodeForm
      } else if (this.type === plantType.OTHER) {
        url = 'qrcode/other/save'
        form = qrCodeForm
      }
      let resp = await request(url, 'put', form, 'json', true)
      if (resp && resp.data.resultCode === 'SUCCESS') {
        this.showAlert = true
        setTimeout(() => {
          this.showAlert = false
          this.goBack()
        }, 1000)
      }
    },
    goBack () {
      removeLocalStory('choose-project')
      removeLocalStory('qrcode-image')
      removeLocalStory('qrcode-form')
      removeLocalStory('qrcode-single-property')
      this.$router.goBack()
    },
    chooseProject () {
      this.setSinglePropertyToForm()
      this.saveLocalData()
      this.$router.push('/choose/project')
    },
    addPlant () {
      this.setSinglePropertyToForm()
      this.saveLocalData()
      this.$router.push('addPlant?id=' + this.qrCodeId + '&typeKey=' + this.typeKey)
    },
    editPlant (i) {
      this.setSinglePropertyToForm()
      this.saveLocalData()
      localStorage.setItem('editIndex', i + 1)
      this.$router.push('addPlant?id=' + this.qrCodeId + '&typeKey=' + this.typeKey + '&index=' + i)
    },
    searchTerm (alias, done) {
      request('data/term?type=PLANT&start=' + this.form.alias + '&top=10', 'get').then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          console.log(response.data.resultMsg)
          let model = response.data.resultMsg.map(item => ({ label: String(item['name']), value: String(item['id']) }))
          setTimeout(() => {
            done(filter(alias, { field: 'label', list: model }))
          }, 1000)
        }
      })
    },
    selected (item) {
      console.log(item.label)
      this.form.alias = item.label
      console.log(this.form.alias)
    },
    async load () {
      this.$q.loading.show()
      let resp = await request('qrcode/detail?qrCodeId=' + this.qrCodeId, 'get', null, null, true)
      this.$q.loading.hide()
      if (resp) {
        let form = {}
        form = resp.data.resultMsg
        if (form.code) {
          form.project = form.code.project
        }
        if (form.singles) {
          for (let key in form.singles) {
            form.singles[key].category = form.singles[key].category.id
            form.singles[key].singleId = form.singles[key].id
          }
        }
        if (form.project) {
          this.projectName = form.project.projectName
          this.projectId = form.project.id.toString()
          form.project = form.project
        }
        if (form.area && form.area.code) {
          form.areaId = form.area.code.id.toString()
        }
        if (form.code) {
          form.alias = form.code.alias
          form.description = form.code.description
          form.location = form.code.location
          if (form.code.project) {
            this.projectName = form.code.project.projectName
            this.projectId = form.code.project.id.toString()
            form.project = form.code.project
          }
        }
        if (form.category) {
          this.category = form.category.id.toString()
          this.scategory = form.category.id.toString()
        }
        if (form.location) {
          form.formattedAddress = form.location.formattedAddress
        }
        let imageArray = []
        let formPictures = []
        if (form.pictures && form.pictures.length > 0) {
          formPictures = form.pictures
        } else if (form.code && form.code.pictures.length > 0) {
          formPictures = form.code.pictures
        }
        if (formPictures.length > 0) {
          _.forEach(formPictures, v => {
            let previewUrl = server.THUMBNAIL_API + v.filePath
            imageArray.push({
              'previewUrl': previewUrl,
              'contentUrl': v.filePath
            })
          })
          this.imageArray = imageArray
        }
        this.form = form
      }
      this.setFormToSingleProperty()
    },
    openCamera () {
      if (navigator.camera) {
        navigator.camera.getPicture(imgData => {
          this.$q.loading.show()
          uploadFiles(imgData)
        }, errorMsg => {
          console.log(errorMsg)
        }, { destinationType: Camera.DestinationType.DATA_URL })
      }
    },
    cancelUploadImage (index) {
      this.$q.loading.show()
      let img = this.imageArray[index]
      deleteFiles(img.contentUrl, index)
    },
    topButtonsClicked (index) {
      localStorage.setItem('top-index', index)
      _.forEach(this.buttonsColor, (v, k) => {
        if (k === index) {
          this.$set(this.buttonsColor, k, 'green')
        } else {
          this.$set(this.buttonsColor, k, 'black')
        }
      })
      switch (index) {
        case 0:
          this.singleShow = true
          this.areaShow = false
          this.type = plantType.SINGLE
          this.namePlaceholder = '植物名称'
          this.getAreaBranch()
          break
        case 1:
          this.singleShow = false
          this.areaShow = true
          this.type = plantType.AREA
          this.namePlaceholder = '输入片区名称'
          break
        case 2:
          this.singleShow = false
          this.areaShow = false
          this.type = plantType.DEVICE
          this.namePlaceholder = '输入名称'
          break
        case 3:
          this.singleShow = false
          this.areaShow = false
          this.type = plantType.OTHER
          this.namePlaceholder = '输入名称'
          break
        default:
          break
      }
      // localStorage.setItem('typeKey', this.type)
    },
    add () {
      let data = {
        projectId: this.projectId,
        amount: this.amount,
        contactNumber: this.contactNumber,
        contactPerson: this.contactPerson
      }
      request('qrcode/batch', 'post', data, 'json', true).then(response => {
        console.log(response)
        if (response.data.resultCode === 'SUCCESS') {
          this.$q.dialog({
            title: '提示',
            message: '保存成功！'
          })
        } else {
          if (response.data.resultCode === 'ERROR') {
            this.$q.dialog({
              title: '提示',
              message: response.data.resultMsg.hint
            })
          } else {
            this.$q.dialog({
              title: '提示',
              message: response.data.resultMsg
            })
          }
        }
      }
      )
    },
    chooseUser (jobType) {
      this.formData.jobType = jobType
      this.$router.push('allUser')
    },
    async getPlantCategory () {
      let resp = await request('data/plantCategory')
      if (resp) {
        this.plantCategoryArray = resp.data.resultMsg
        _.forEach(this.plantCategoryArray, (v, key) => {
          v.label = v.name
          v.value = v.id.toString()
        })
      }
    }
  },
  async mounted () {
    this.previewApi = server.PREVIEW_API
    eventBus.$on('upload-success', resp => {
      this.$q.loading.hide()
      this.imageArray.push(resp)
    })
    eventBus.$on('delete-success', (params) => {
      this.$q.loading.hide()
      let index = parseInt(params.idx)
      this.imageArray.splice(index, 1)
      this.$q.dialog({
        title: '提示',
        message: params.msg
      })
    })
    this.qrCodeId = this.$route.query.id

    if (this.$route.query.typeKey) {
      this.typeKey = this.$route.query.typeKey
    }
    // this.qrCodeId = localStorage.getItem('qrCodeId')
    // let type = localStorage.getItem('typeKey')
    // if (_.isNull(type)) {
    //   this.typeKey = type
    // }
    if (this.typeKey === null || _.isNull(this.typeKey) || this.typeKey === 'null') {
      this.showType = true
    }
    let index = 0
    let topIndex = localStorage.getItem('top-index')
    if (_.isNull(topIndex)) {
      let keyArray = [plantType.SINGLE, plantType.AREA, plantType.DEVICE, plantType.OTHER]
      index = _.indexOf(keyArray, this.typeKey) > -1 ? _.indexOf(keyArray, this.typeKey) : 0
      localStorage.removeItem('top-index')
    } else {
      index = parseInt(topIndex)
    }
    if (!this.showType) {
      await this.load()
    }
    let project = JSON.parse(localStorage.getItem('choose-project'))
    let form = JSON.parse(localStorage.getItem('qrcode-form'))
    let imageArray = JSON.parse(localStorage.getItem('qrcode-image'))
    let singleProperty = JSON.parse(localStorage.getItem('qrcode-single-property'))
    let position = JSON.parse(localStorage.getItem('user_location'))
    let singles = JSON.parse(localStorage.getItem('singles'))
    let editIndex = JSON.parse(localStorage.getItem('editIndex'))
    if (!_.isNull(form)) {
      this.form = form
    }
    if (!_.isNull(imageArray)) {
      this.imageArray = imageArray
    }
    if (!_.isNull(project)) {
      this.form.project = project
      this.projectId = project.id
      this.projectName = project.projectName
    }
    if (!_.isNull(singleProperty)) {
      this.singlePlantProperties = singleProperty
    }
    if (_.isNull(form) && _.isNull(imageArray) && _.isNull(project)) {
      this.load()
    }
    if (!_.isNull(position)) {
      this.form.formattedAddress = position.formattedAddress
      localStorage.removeItem('user_location')
      this.form.locationJson = JSON.stringify(position)
    }
    if (localStorage.getItem('singles') && !_.isNull(singles) && (this.typeKey === 'AREA' || index === 1)) {
      if (localStorage.getItem('editIndex') && !_.isNull(editIndex)) {
        let index = editIndex - 1
        this.form.singles[index] = singles
        localStorage.removeItem('editIndex')
      } else {
        if (this.form.singles) {
          this.form.singles.push(singles)
        }
      }
      localStorage.removeItem('singles')
    }
    this.$nextTick(() => {
      this.topButtonsClicked(index)
    })
    this.getPlantCategory()
  },
  beforeDestroy () {
    eventBus.$off('upload-success')
    eventBus.$off('delete-success')
    // removeLocalStory('top-index')
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";

#qcode-page {
  .lineHeight-32 {
    line-height: 32px;
  }

  #single-plant {
    .row {
      .q-input {
        .q-no-input-spinner {
          margin-top: 16px;
        }
      }
    }
  }

  .add-area {
    border: 0;

    .q-item {
      border-style: solid;
      border-width: 1px;
      border-color: lightgray;
      border-radius: 8px;
    }
  }

  .area-input {
    border-style: solid;
    border-width: 1px;
    border-color: lightgray;
    border-radius: 8px;
    width: 100px;
  }
  .underline {
    border-bottom: 1px solid #cccccc;
    margin-top: 20px;
  }
  input:not(.no-style):hover {
    border-bottom: none;
  }

  .q-if-inner {
    min-height: 30px !important;
    padding-bottom: 10px;
  }

  .q-if-control.q-icon {
    padding-bottom: 6px;
  }

  .top-field p {
    margin-bottom: 10px;
    margin-top: 20px;
  }

  .qr-info {
    margin-top: 30px;
    font-size: 14px;
    color: #333333;
    margin-bottom: 30px;
    p {
      margin-bottom: 5px;
    }
  }

  .img-close {
    margin-left: 80px;
    margin-top: -190px;
  }

  .camera-button {
    border-style: solid;
    border-width: 1px;
    border-color: lightgray;
    border-radius: 1px;
    box-shadow: none !important;
  }

  #camera-list {
    border: 0;
  }
}
</style>
