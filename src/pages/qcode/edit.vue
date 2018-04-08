<template>
  <q-layout id="qcode-page">
    <q-toolbar class='header'>
      <q-toolbar class='fix'>
        <a @click="goBack">
          <q-item-side left icon='keyboard arrow left' class='reback'/>
          返回</a>
        <q-toolbar-title class='header-title'>
          二维码名称
        </q-toolbar-title>
        <a class="top-nav-right"></a>
      </q-toolbar>
    </q-toolbar>
    <div class='full-width card'>
      <div class="top-field">
        <p class='text-center'>
          <img src='statics/qr.png'/>
        </p>
        <p>

        </p>
      </div>
      <!--<div v-show="showType">-->
      <div>
        <span>类型</span>
        <q-btn outline :color="buttonsColor[0]" @click="topButtonsClicked(0)" label="单株植物" size="xs"/>
        <q-btn outline :color="buttonsColor[1]" @click="topButtonsClicked(1)" label="片区职务" size="xs"/>
        <q-btn outline :color="buttonsColor[2]" @click="topButtonsClicked(2)" label="设备" size="xs"/>
        <q-btn outline :color="buttonsColor[3]" @click="topButtonsClicked(3)" label="其他" size="xs"/>
      </div>
      <div class="qr-info">
        <q-input v-model="alias" placeholder="植物名称" class='login-input'>
          <q-autocomplete @search="searchTerm" @selected="selected"/>
        </q-input>
        <q-input
          v-model="projectName"
          placeholder='默认项目名称' class='login-input' readonly @click.native="chooseProject"
        />
        <div id="single-plant" v-show="singleShow">
          <q-select
            v-model="amount"
            placeholder='所属片区' class='login-input'
            :options="[{label: '1', value: '1'}, {label: '2', value: '2'}]"
          />
          <q-select
            v-model="form.category"
            placeholder='苗木分类选项' class='login-input mb-2'
            :options="plantCategoryArray"
          />
          <div class="row justify-between">
            <div class="col-5 row mt-4" v-for="v, i in singlePlantProperties" :key="i">
              <span class="col-3 lineHeight-32">{{v}}</span>
              <q-input type="number" class="col-6 border-1 ml-2 h-32 p-8" v-model="amount"></q-input>
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
              <span class="col-1 lineHeight-32">其他</span>
              <q-input v-model="form.otherFeature" class="col-10 ml-8 border-1 h-32 p-8"></q-input>
            </div>
          </div>
          <q-input v-model="form.source" placeholder="苗原地" class='login-input mt-10'></q-input>
          <q-input v-model="form.dealer" placeholder="苗木商名称" class='login-input'></q-input>
          <q-input v-model="form.other" placeholder="苗木其他信息" class='login-input'></q-input>
        </div>
        <div class="mt-10">
          <q-item-side left icon='place' class='inline newicon'></q-item-side>
          <q-item-tile sublabel lines='1' class='inline text-center' label>
            {{ form.locationJson }}
          </q-item-tile>
        </div>
        <q-input
          v-model="amount"
          placeholder="输入备注信息"
          type="textarea"
          hide-underline class="login-input mt-10"/>
        <div id="area-plant" v-show="areaShow">
          <q-item class="p-2">
            <q-item-side> 片区面积</q-item-side>
            <q-item-main class="area-input">
              <q-input type="number" v-model="amount"></q-input>
            </q-item-main>
            <q-item-main label="平方米"></q-item-main>
          </q-item>
          <q-list class="add-area">
            <q-list-header class="p-2 h-40">添加植物信息</q-list-header>
            <q-item>
              <q-item-side label>新增植物..</q-item-side>
              <q-item-main></q-item-main>
              <q-item-side right icon="keyboard_arrow_right"></q-item-side>
            </q-item>
            <q-item class="mt-8">
              <q-item-side label>槐树</q-item-side>
              <q-item-main></q-item-main>
              <q-item-side right>
                <span class="mr-6">数量: 3</span>
                <q-icon class="mt--5" name="fas fa-edit"></q-icon>
                <span class="mr-6"> 编辑</span>
              </q-item-side>
            </q-item>
          </q-list>
        </div>
        <div>
          <q-list class="mt-6 bg-white pb-8">
            <q-list-header>现场拍照</q-list-header>
            <div class="row">
              <div class="w-100 h-100 ml-10" v-for="v, i in imageArray" :key="i">
                <img class="full-height full-width" :src="v.previewUrl">
                <q-icon class="img-close" @click.native="cancelUploadImage(i)" color="grey" name="ion-close-circled"/>
              </div>
              <div class="w-100 h-100 ml-10">
                <q-btn icon="camera alt" size="35px" @click="openCamera" class="camera-button full-height full-width"/>
              </div>
            </div>
          </q-list>
        </div>
      </div>
      <q-btn class="full-width btn">保存</q-btn>
    </div>
  </q-layout>
</template>

<script>
  import { request, uploadFiles, deleteFiles } from '../../common'
  import { filter } from 'quasar'
  import _ from 'lodash'
  import eventBus from '../../eventBus'

  export default {
    data () {
      return {
        typeKey: null,
        showType: false,
        qrCodeId: '',
        form: {},
        projectId: 1,
        amount: '',
        contactNumber: '',
        contactPerson: '',
        singlePlantProperties: ['胸径', '高度', '地径', '冠幅', '篷径'],
        buttonsColor: ['black', 'black', 'black', 'black'],
        namePlaceholder: '植物名称',
        areaShow: false,
        singleShow: false,
        imageArray: [],
        plantCategoryArray: [],
        alias: '',
        aliasList: [],
        projectName: ''
      }
    },
    methods: {
      goBack () {
        if (!_.isNull(localStorage.getItem('choose-project'))) {
          localStorage.removeItem('choose-project')
        }
        this.$router.go(-1)
      },
      chooseProject () {
        this.$router.push('/choose/project')
      },
      searchTerm (alias, done) {
        request('data/term?type=PLANT&start=' + this.alias + '&top=10', 'get').then(response => {
          if (response.data.resultCode === 'SUCCESS') {
            console.log(response.data.resultMsg)
            let model = response.data.resultMsg.map(item => ({label: String(item['name']), value: item['name']}))
            setTimeout(() => {
              done(filter(alias, {field: 'value', list: model}))
            }, 1000)
          }
        })
      },
      selected (item) {
        this.$q.notify(`Selected suggestion "${item.label}"`)
      },
      async load () {
        this.$q.loading.show()
        let resp = await request('qrcode/detail?qrCodeId=' + this.qrCodeId, 'get', null, null, true)
        this.$q.loading.hide()
        if (resp) {
          this.form = resp
        }
      },
      openCamera () {
        if (navigator.camera) {
          navigator.camera.getPicture(imgData => {
            this.$q.loading.show()
            uploadFiles(imgData)
          }, errorMsg => {
            console.log(errorMsg)
          }, {destinationType: Camera.DestinationType.DATA_URL})
        }
      },
      cancelUploadImage (index) {
        this.$q.loading.show()
        let img = this.imageArray[index]
        deleteFiles(img.contentUrl, index)
      },
      topButtonsClicked (index) {
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
            this.namePlaceholder = '植物名称'
            break
          case 1:
            this.singleShow = false
            this.areaShow = true
            this.namePlaceholder = '输入片区名称'
            break
          case 2:
            this.singleShow = false
            this.areaShow = false
            this.namePlaceholder = '输入名称'
            break
          case 3:
            this.singleShow = false
            this.areaShow = false
            this.namePlaceholder = '输入名称'
            break
          default:
            break
        }
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
            v.value = v.id
          })
        }
      }
    },
    async mounted () {
      eventBus.$on('upload-success', resp => {
        console.log(resp)
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
      this.typeKey = this.$route.query.typeKey
      if (this.typeKey === 'null') {
        this.showType = true
      }
      let project = JSON.parse(localStorage.getItem('choose-project'))
      console.log(project)
      if (!_.isNull(project)) {
        this.form.project = project
        this.projectName = project.projectName
      }
      this.load()
      this.getPlantCategory()
      this.$nextTick(() => {
        this.topButtonsClicked(0)
      })
    },
    beforeDestroy () {
      eventBus.$off('upload-success')
      eventBus.$off('delete-success')
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

    .reback {
      min-width: auto !important;
    }

    .underline {
      border-bottom: 1px solid #cccccc;
      margin-top: 20px;
    }

    .card {
      margin-bottom: 0px;
      padding: 30px 15px;
      min-height: 160px;
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
  }
</style>
