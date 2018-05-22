<template>
  <div id="area-plant-info" class="bg-color">
    <van-cell-group :border="false">
      <div class="van-hairline--bottom font-16 pl-15 area-input-class row">
        <label class="w-64">片区面积</label>
        <q-input placeholder="输入片区所占面积" class="no-margin" v-model="aForm.acreage" type="number"></q-input>
        <label class="uom-class border-left">
          平方米
        </label>
      </div>
      <div class="bg-color font-16 pl-15 pr-15 pt-16 pb-20">
        <label class="h-44">片区植物</label>
        <label class="h-44 float-right primary-color" @click="createPlant">新增植物</label>
        <div class="mt-6" v-for="v, i in aForm.singles" :key="i">
          <div class="row bg-white plant-list justify-between full-width">
            <label class="ml-10">{{v.alias}}</label>
            <label class="text-color">数量{{ v.amount }}</label>
            <div class="mr-18">
              <i class="iconfont holder-color font-18" @click="deleteAddPlant(i)">&#xe61e;</i>
              <i class="iconfont ml-10 primary-color font-18" @click="editPlant(i)">&#xe69b;</i>
            </div>
          </div>
        </div>
      </div>
    </van-cell-group>
    <div class="bottom-button-div bg-color mt-40">
      <q-btn color="white" text-color="black" class="border-1 float-left ml-16" label="上一步" size="md" @click="preStep"/>
      <q-btn color="white" text-color="black" class="border-1 float-right mr-16" label="完成" size="md"
             @click="nextStep"/>
    </div>
    <q-modal v-model="createPageShow">
      <create-plant></create-plant>
    </q-modal>
  </div>
</template>

<script>
  import addPlantMixin from '../../../mixin/addPlantMixin'
  import createPlant from './createPlant'
  import _ from 'lodash'
  import {request} from '../../../common'

  export default {
    mixins: [
      addPlantMixin,
    ],
    components: {
      createPlant,
    },
    data () {
      return {
        aForm: {singles: []},
        createPageShow: false,
        isNew: false,
        idx: null
      }
    },
    methods: {
      editPlant (index) {
        this.isNew = false
        let idx = parseInt(index)
        this.idx = idx
        this.$root.$emit('edit-plant', this.aForm.singles[idx], idx)
        this.createPageShow = true
      },
      deleteAddPlant (index) {
        console.log(index)
        this.$store.commit('plantInfo/removeSinglesFromArea', index)
      },
      setForm () {
        this.areaForm = this.aForm
        let qFrom = Object.assign({}, this.qrCodeForm)
        this.$store.commit('plantInfo/setQRCodeFormToArea', qFrom)
      },
      getForm () {
        this.aForm = Object.assign({}, this.areaForm)
      },
      createPlant () {
        this.isNew = true
        this.createPageShow = true
      },
     async nextStep () {
        this.setForm()
        this.$q.loading.show()
        let resp = await request('qrcode/area/save', 'put', this.areaForm, 'json', true)
        this.$q.loading.hide()
        if (resp) {
          this.aForm = {singles: {}}
          this.$root.$emit('next-step')
        }
      },
      preStep () {
        this.$root.$emit('pre-step')
      },
    },
    mounted () {
      this.navTitle = '片区名称'
      this.$root.$on('add-plant-close', () => {
        this.createPageShow = false
      })
      this.$root.$on('add-plant-done', (newPlantForm) => {
        this.createPageShow = false
//        if (this.isNew) {
//          console.log(this.aForm.singles)
//          debugger
//        this.aForm.singles.push(newPlantForm)
//        } else {
//          this.aForm.singles.splice(this.idx, 1, newPlantForm)
//        }
      })
      this.getForm()
      console.log(this.aForm)
    },
    beforeDestroy () {
      this.$root.$off('add-plant-close')
      this.$root.$off('add-plant-done')
      this.setForm()
    },
  }
</script>

<style lang="scss">
  #area-plant-info {
    .area-input-class {
      height: 44px;

      .q-input {
        margin-left: 20px !important;
        width: calc(100% - 64px - 15px - 20px - 76px);
        padding: 0 !important;
        height: 44px;

        .q-if-inner {
          height: 100%;
        }
      }

      .uom-class {
        width: 76px;
        text-align: center;
      }

      label {
        line-height: 44px;
      }
    }

    .plant-list {
      height: 54px;
      label {
        line-height: 54px;
      }

      i {
        line-height: 54px;
      }
    }

    .bottom-button-div {
      button {
        width: 45%;
      }
    }
  }
</style>
