<template>
  <div>
    <q-layout view="Hhh lpr Fff">
    <q-page-container>
      <q-page>
      <div id="home">
        <div class="top-log">
          <q-item-side left  icon="fullscreen" class="color-white scan absolute" @click.native="openScan"><span class="block font-12">扫一扫</span></q-item-side>
          <p class="log">
            <img src="statics/home/home-logo.png"/>
          </p>
          <p class="time">{{dataTime}}</p>
        </div>
        <div class="row card menu-field">
          <div class="col-6 nav border-bottom border-right" @click="iconClicked('jobGroup')">
            <img src="statics/home/1-1.png"/>
            <div>养护记录</div>
          </div>
          <div class="col-6 nav  border-bottom">
            <img class="opacity-disabled" src="statics/home/1-2.png"/>
            <div class="opacity-disabled">现场巡查记录</div>
          </div>
          <div class="col-6 nav border-bottom border-right">
            <img class="opacity-disabled" src="statics/home/2-1.png"/>
            <div class="opacity-disabled">苗木到场</div>
          </div>
          <div class="col-6 nav  border-bottom" @click="iconClicked('qrcode')">
            <img src="statics/home/2-2.png"/>
            <div>二维码编辑</div>
          </div>
          <div class="col-6 nav border-right" @click="$router.push('/project/list')">
            <img src="statics/home/3-1.png"/>
            <div>项目</div>
          </div>
          <!-- <div class="col-6 nav border-bottom">
            <img src="statics/home/3-2.png"/>
            <div>成员</div>
          </div> -->
           <div class="col-6 nav" v-if="admin" @click="$router.push('/admin')">
            <img src="statics/home/4-1.png"/>
            <div>管理</div>
          </div>
        </div>
      </div>
      </q-page>
      </q-page-container>
       <q-layout-footer>
      <q-tabs class="footer" v-model="model">
        <q-route-tab slot="title" icon="home" to="/" replace label="首页" class="menu" name="home"/>
        <q-route-tab slot="title" icon="notifications none" to="/"  disable replace label="消息" class="menu" />
        <q-route-tab slot="title" icon="person" to="/jobGroup/byUser" replace label="我的" class="menu" />
      </q-tabs>
    </q-layout-footer>
    </q-layout>
  </div>
</template>

<script>
  import { request } from '../../common'
  import _ from 'lodash'
  import { server, plantType } from '../../const'

  export default {
    data () {
      return {
        dataTime: '',
        admin: false,
        model: 'home',
        type: null,
      }
    },
    mounted () {
      this.admin = this.$store.getters['User/admin']
      this.getTime()
    },
    methods: {
      iconClicked (type) {
        this.type = type
        this.openScan()
      },
      getTime () {
        let myDate = new Date()
        let Week = ['日', '一', '二', '三', '四', '五', '六']
        this.dataTime = myDate.getFullYear() + '年' + (myDate.getMonth() + 1) + '月' + myDate.getDate() + '日 周' +
          Week[myDate.getDay()]
      },
      async handleScanResult (url) {
        this.$q.loading.show()
        let resp = await request(url, 'get', '', 'json', false, true)
        this.$q.loading.hide()
        let msg = resp.data.resultMsg
        let typeKey = null
        let code = msg
        if (msg.type) {
          typeKey = msg.type.key
          if ((typeKey === plantType.SINGLE || typeKey === plantType.AREA)) {
            code = msg.code
          }
        }
        let qrCodeId = code.id

        if (typeKey === null) {
          if (msg.editable) {
            this.$router.push('/qrcode/chooseType?id='+qrCodeId+'&identifier='+code.identifier)
          } else {
            this.$router.push('/qcode/detail?id=' + qrCodeId)
          }
        } else if (this.type === 'jobGroup') {
          if ((typeKey === plantType.SINGLE || typeKey === plantType.AREA)) {
            if (msg.maintainable) {
              this.$router.push('/project/maintenance?codeId=' + qrCodeId)
            } else {
              this.$q.notify({
                message: '您无权限添加养护记录',
                timeout: 3000,
                type: 'info',
              })
              this.$router.push('/qcode/detail?id=' + qrCodeId)
            }
          } else {
            // 设备类型或其他类型二维码，没有养护记录
            this.$router.push('/qcode/detail?id=' + qrCodeId)
          }
        } else if (this.type === 'qrcode') {
          if (msg.editable) {
            this.$router.push('/qrcode/stepper?id='+qrCodeId+'&type='+typeKey)
          } else {
            this.$q.notify({
              message: '您无权限编辑此二维码',
              timeout: 3000,
              type: 'info',
            })
            this.$router.push('/qcode/detail?id=' + qrCodeId)
          }
        } else {
          // 扫一扫，显示详情
          this.$router.push('/qcode/detail?id=' + qrCodeId)
        }
      },
      openScan () {
        if (cordova.plugins.barcodeScanner) {
          cordova.plugins.barcodeScanner.scan(
            (result) => {
              if (result.cancelled) {
                return false
              }
              this.handleScanResult(result.text)
            },
            (error) => {
              alert('Scanning failed: ' + error)
            },
            {
              preferFrontCamera: false, // iOS and Android
              showFlipCameraButton: false, // iOS and Android
              showTorchButton: false, // iOS and Android
              torchOn: false, // Android, launch with the torch switched on (if available)
              saveHistory: false, // Android, save scan history (default false)
              prompt: '在扫描区域内放置一个二维码', // Android
              resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
              formats: 'QR_CODE', // default: all but PDF_417 and RSS_EXPANDED
              orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
              disableAnimations: true, // iOS
              disableSuccessBeep: false, // iOS and Android
            })
        }
      },
    }
  }
</script>

<style lang='scss'>
  @import "../../assets/css/common";

  #home {
    .q-layout-page-container {
      padding-top: 50px;
    }
    .scan {
      left: 16px;
      .q-icon.material-icons {
        font-size: 34px;
      }
    }

    .opacity-disabled {
      opacity: 0.5;
    }
    .top-log {
      height: calc(42vh - 66px);
      background: -webkit-linear-gradient($primary, $nextprimary);
      background: -o-linear-gradient($primary, $nextprimary);
      background: -moz-linear-gradient($primary, $nextprimary);
      background: linear-gradient($primary, $nextprimary); /* 标准的语法 */
      color: white;
      text-align: center;
      font-size: 20px;
      padding-top: calc((40vh - 220px) / 2);
    }
      .log {
        text-align: center;
        img {
          width: 100px;
          height: 100px;
        }
      }
      .nav {
        height: calc(21vh - 22px);
        padding-top: calc((20vh - 100px) / 2);
        // padding-bottom: 15px;
        img {
          width: 60px;
        }
      }
      .menu-field {
        height: calc(64vh - 66px);
        margin-top: 15px;
        text-align: center;
      }
      .border-bottom {
        border-bottom: 1px solid #e8e8e8;
      }
      .border-right {
        border-right: 1px solid #e8e8e8;
      }
  }
</style>
