<template>
  <q-layout id="qcode-page-add">
    <q-toolbar class='header'>
      <q-toolbar class='fix'>
        <a @click="$router.goBack()" class="back-a">
          <q-item-side left icon='keyboard arrow left' class='back-left'/>返回</a>
        <q-toolbar-title class='header-title'>
          添加植物
        </q-toolbar-title>
         <q-item-side right/>
      </q-toolbar>
    </q-toolbar>
    <div class='full-width card qr-info'>
        <div class="col-12 row mt-6 justify-between">
          <div class="col-7 row">
            <q-field
         @blur="$v.formData.alias.$touch"
        @keyup.enter="save"
        :error="$v.formData.alias.$error"
         error-label="请添加植物名称">
              <q-input
                v-model="formData.alias"
                placeholder="植物名称" class='col-12 border-1 ml-2 h-35 p-8'>
              <q-autocomplete @search="searchTerm"/>
              </q-input>
            </q-field>
          </div>
          <div class="col-4 row">
              <span class="col-4 lineHeight-32">数量</span>
              <q-input type="number" class="col-7 border-1 ml-2 h-35  p-8" v-model="formData.amount"></q-input>
          </div>
        </div>
        <q-select
          v-model="formData.category"
          placeholder='苗木分类选项' class='full-width h-35 p-8 border-1'
          :options="plantCategory"
        />
        <div id="single-plant" >
          <div class="row justify-between">
            <div class="col-6 row mt-4">
              <span class="col-3 lineHeight-30">胸径</span>
              <q-input type="number" class="col-6 border-1 ml-2 h-35  p-8" v-model="formData.xiongJing"></q-input>
              <span class="col-1 lineHeight-32 ml-4">cm</span>
            </div>
            <div class="col-6 row mt-4">
              <span class="col-3 lineHeight-30">高度</span>
              <q-input type="number" class="col-6 border-1 ml-2 h-35  p-8" v-model="formData.gaoDu"></q-input>
              <span class="col-1 lineHeight-32 ml-4">cm</span>
            </div>
            <div class="col-6 row mt-4">
              <span class="col-3 lineHeight-30">地径</span>
              <q-input type="number" class="col-6 border-1 ml-2 h-35  p-8" v-model="formData.diJing"></q-input>
              <span class="col-1 lineHeight-32 ml-4">cm</span>
            </div>
            <div class="col-6 row mt-4">
              <span class="col-3 lineHeight-30">冠幅</span>
              <q-input type="number" class="col-6 border-1 ml-2 h-35  p-8" v-model="formData.guanFu"></q-input>
              <span class="col-1 lineHeight-32 ml-4">cm</span>
            </div>
            <div class="col-6 row mt-4">
              <span class="col-3 lineHeight-30">蓬径</span>
              <q-input type="number" class="col-6 border-1 ml-2 h-35  p-8" v-model="formData.pengJing"></q-input>
              <span class="col-1 lineHeight-32 ml-4">cm</span>
            </div>

            <div class="col-12 row mt-4 justify-between">
              <div class="col-5 row">
                <span class="col-5 lineHeight-32">分支数量</span>
                <q-input type="number" class="col-5 border-1 ml-2 h-35  p-8" v-model="formData.branch"></q-input>
                <span class="col-1 lineHeight-32 ml-4">个</span>
              </div>
              <div class="col-5 row">
                <span class="col-4 lineHeight-32">几年生</span>
                <q-input class="col-7 border-1 ml-2 h-30  p-8" v-model="formData.year"></q-input>
              </div>
            </div>
            <div class="row mt-8 col-12">
              <span class="col-1 lineHeight-32">其他</span>
              <q-input v-model="formData.other" class="col-10 ml-8 border-1 h-35  p-8"></q-input>
            </div>
          </div>
          <q-input v-model="formData.source" placeholder="苗原地" class='login-input mt-10'></q-input>
          <q-input v-model="formData.dealer" placeholder="苗木商名称" class='login-input'></q-input>
          <q-input v-model="formData.otherFeature" placeholder="苗木其他信息" class='login-input'></q-input>
        </div>
        <div class="mt-10">
          <q-item-tile sublabel lines='1' class='inline text-center' @click.native="openMap">
            <q-search icon="place"  v-model="address" placeholder="获取当前位置" class='login-input mt-10' disable />
          </q-item-tile>
        </div>
        <q-input
          v-model="formData.description"
          placeholder="输入备注信息"
          type="textarea"
          hide-underline class="login-input mt-10"/>
          <div class="mt-6 bg-white pb-8">
            <q-list-header>现场拍照</q-list-header>
            <div class="row">
              <div class="w-100 h-100 ml-10" v-for="v, i in imageArray" :key="i">
                <img class="full-height full-width" :src="v.previewUrl" v-preview="previewApi + v.previewUrl">
                <q-icon class="img-close" @click.native="cancelUploadImage(i)" color="grey" name="ion-close-circled"/>
              </div>
              <div class="w-100 h-100 ml-10">
                <q-btn icon="camera alt" size="35px" @click="openCamera" class="camera-button full-height full-width"/>
              </div>
            </div>
          </div>
        </div>
      <q-btn class="full-width btn" @click='add()'>添加</q-btn>
  </q-layout>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { filter } from 'quasar'
import { server } from '../../const'
import { request, uploadFiles, deleteFiles, removeLocalStory } from '../../common'
import eventBus from '../../eventBus'
import _ from 'lodash'

export default {
  data () {
    return {
      formData: {
      },
      plantCategory: [],
      imageArray: [],
      address: '',
      previewApi: ''
    }
  },
  validations: {
    formData: {
      alias: { required }
    }
  },
  methods: {
    add () {
      this.$v.$touch()
      if (this.$v.$error) {
        return false
      }
      localStorage.setItem('singles', JSON.stringify(this.formData))
      this.$router.goBack()
    },
    searchTerm (alias, done) {
      request('data/term?type=PLANT&start=' + this.formData.alias + '&top=10', 'get').then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          console.log(response.data.resultMsg)
          let model = response.data.resultMsg.map(item => ({ label: String(item['name']), value: item['name'] }))
          setTimeout(() => {
            done(filter(alias, { field: 'value', list: model }))
          }, 1000)
        }
      })
    },
    openMap () {
      this.saveLocalData()
      this.$router.push('/project/map?from=qrCode')
    },
    saveLocalData () {
      localStorage.setItem('qrcode-form-add', JSON.stringify(this.formData))
      localStorage.setItem('qrcode-image-add', JSON.stringify(this.imageArray))
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
    getPlantCategory () {
      request('data/plantCategory', 'get').then(response => {
        if (response.data.resultCode === 'SUCCESS') {
          for (var key in response.data.resultMsg) {
            this.plantCategory.push({
              label: response.data.resultMsg[key]['name'],
              value: parseInt(response.data.resultMsg[key]['id'])
            })
          }
        } else {
          console.log(response.data.resultMsg)
        }
      })
    }
  },
  async mounted () {
    this.previewApi = server.PREVIEW_API
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
    let i = _.isUndefined(this.$route.query.index) ? '0' : this.$route.query.index
    let oldData = JSON.parse(localStorage.getItem('qrcode-form'))
    if (!_.isNull(oldData)) {
      let single = oldData['singles'][i]
      if (_.isUndefined(single)) {
        single = {'alias': ''}
      }
      if (_.isNull(single.alias)) {
        single.alias = ''
      }
      this.formData = single
    }
    let formData = JSON.parse(localStorage.getItem('qrcode-form-add'))
    if (!_.isNull(formData)) {
      this.formData = formData
      localStorage.removeItem('qrcode-form-add')
    }
    this.getPlantCategory()
    let geoInfo = JSON.parse(localStorage.getItem('user_location'))
    let imageArray = JSON.parse(localStorage.getItem('qrcode-image-add'))
    if (!_.isNull(imageArray)) {
      this.imageArray = imageArray
      localStorage.removeItem('qrcode-image-add')
    }
    if (!_.isNull(geoInfo)) {
      this.address = geoInfo.formattedAddress
      this.formData.locationJson = JSON.stringify(geoInfo)
      localStorage.removeItem('user_location')
    }
  },
  beforeDestroy () {
    eventBus.$off('upload-success')
    eventBus.$off('delete-success')
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
#qcode-page-add {
  .lineHeight-32 {
    line-height: 32px;
  }
  .h-35 {
    height: 35px;
    margin-top: 10px;
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
  input:not(.no-style):hover {
    border-bottom: none;
  }
  .top-field p {
    margin-bottom: 10px;
  }

  .qr-info {
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
