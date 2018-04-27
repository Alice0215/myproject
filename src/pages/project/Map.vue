<template>
  <q-layout id="map-page">
    <a @click="$router.goBack()">
      <q-toolbar class="fix">
      </q-toolbar>
    </a>
    <iframe :src="src" id="map_frame">
    </iframe>
    <div id="map">
    </div>
  </q-layout>
</template>

<script>
  import _ from 'lodash'
  import eventBus from '../../eventBus'

  export default {
    data () {
      return {
        loading: false,
        src: '',
        position: {},
      }
    },
    methods: {
      /**
       * 获取逆地理信息
       * @param location
       */
      getAdressByGeocoder (location) {
        if (_.isUndefined(location)) {
          return
        }
        let geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all',
        })
        geocoder.getAddress(location, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            this.handleGeocoder(result)
          }
        })
      },
      /**
       * 处理逆向地理编码
       * @param data
       */
      handleGeocoder (data) {
        let geoInfo = _.omit(data.regeocode, ['pois', 'roads', 'crosses', 'aois'])
        geoInfo.position = this.position
        geoInfo = JSON.stringify(geoInfo)
        if (data.info === 'OK') {
          eventBus.$emit('user_location', geoInfo)
          localStorage.setItem('user_location', geoInfo)
          if (this.$route.query.from === 'qrCode') {
            this.$router.goBack()
            return
          }
          if (this.$route.query.projectId) {
            this.$router.goBack()
          } else {
            this.$router.goBack()
          }
        }
      },
      async getGeolocation () {
        // 定位获取经纬度
        let mapObj = new AMap.Map('map', {
          resizeEnable: true, // 自适应大小
          zoom: 13,// 初始视窗
        })
        mapObj.plugin('AMap.Geolocation', function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000, // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: false, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: false, // 显示定位按钮，默认：true
            buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: false, // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: false, // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: false, // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: false, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          })
          mapObj.addControl(geolocation)
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', (d) => {
            // console.log(d)
            console.log('定位成功')
            let getLng = d.position.getLng()
            let getLat = d.position.getLat()
            this.src = 'https://m.amap.com/picker/?center=' + getLng + ',' + getLat +
              '&radius=500&total=50&key=d18fb1ffb12982910e0ab4c6ffd7ee6e'
            // console.log(this.src)
            window.addEventListener('message', this.receivedMessage, false)
          }) // 返回定位信息
          AMap.event.addListener(geolocation, 'error', (error) => {
            console.log(error)
          }) // 返回定位出错信息
        }.bind(this))
      },
      receivedMessage (e) {
        if (_.isUndefined(e.data.location)) {
          return
        }
        let geocoder = e.data.location
        let lngLatArray = []
        lngLatArray = geocoder.split(',')
        if (lngLatArray.length > 1) {
          this.position.lng = lngLatArray[0]
          this.position.lat = lngLatArray[1]
        }
        this.getAdressByGeocoder(lngLatArray)
      },
      async getCurrentPosition () {
        if (!window.GaodeLocation) {
          return false
        }
        // todo 正式版需要更换appName
          let para = {
            appName: 'com.eyuanlin.dev.app',
            android: {
              // set some parameters
            },
            ios: {
              accuracy: 2,
              // set some parameters
            },
          }
        this.$q.loading.show()
        window.GaodeLocation.configLocation(para, function (successMsg) {
          console.log(successMsg)
        })
        await GaodeLocation.getLocation({retGeo: true}, (locationInfo) => {
          this.src = 'https://m.amap.com/picker/?center=' + locationInfo.longitude + ',' + locationInfo.latitude +
            '&radius=500&total=50&key=d18fb1ffb12982910e0ab4c6ffd7ee6e'
          window.addEventListener('message', this.receivedMessage, false)
          this.$q.loading.hide()
        }, (err) => {
          this.$q.loading.hide()
          console.log(err)
        })
      },
    },
    async mounted () {
      this.getCurrentPosition()
//      this.getGeolocation()
      this.$nextTick(() => {
        document.getElementById('map_frame').style.height = screen.height + 'px'
        let iframe = document.getElementById('map_frame').contentWindow
        document.getElementById('map_frame').onload = function () {
          iframe.postMessage('hello', 'https://m.amap.com/picker/')
        }
      })
    },
    beforeDestroy () {
      window.removeEventListener('message', this.receivedMessage)
    },
  }
</script>

<style lang='scss'>
  @import "../../assets/css/common";

  #map-page {
    #map_frame {
      width: 100%;
      height: 400px;
      border: 0;
    }
    #map {
      width: 100%;
      height: 100%;
      border: 0;
    }
    .fix {
      top: 0;
      z-index: 100;
      position: fixed;
      width: 48px;
      background: none !important;
      border-bottom: none;
    }
  }
</style>
