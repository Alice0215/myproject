<template>
  <div id="map-page">
    <iframe src="https://m.amap.com/picker/?key=d18fb1ffb12982910e0ab4c6ffd7ee6e" id="map_frame">
    </iframe>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    data () {
      return {
        loading: false
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
        let locationArray = location.split(',')
        let geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
        geocoder.getAddress(locationArray, (status, result) => {
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
        console.log(data)
        if (data.info === 'OK') {
          console.log('地址是: ' + data.regeocode.formattedAddress)
        }
      },
      async getGeolocation () {
        let mapObj = new AMap.Map('iCenter')
        mapObj.plugin('AMap.Geolocation', function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,// 是否使用高精度定位，默认:true
            timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           // 定位结果缓存0毫秒，默认：0
            convert: true,           // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        // 显示定位按钮，默认：true
            buttonPosition: 'LB',    // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),// 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          })
          mapObj.addControl(geolocation)
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', (d) => {
            console.log(d)
          }) // 返回定位信息
          AMap.event.addListener(geolocation, 'error', (error) => {
            console.log(error)
          })     // 返回定位出错信息
        })
      }
    },
    async mounted () {
// this.getGeolocation()
      this.$nextTick(() => {
        document.getElementById('map_frame').style.height = document.documentElement.clientHeight + 'px'
        let iframe = document.getElementById('map_frame').contentWindow
        document.getElementById('map_frame').onload = function () {
          iframe.postMessage('hello', 'https://m.amap.com/picker/')
        }
        window.addEventListener('message', e => {
          console.log(e)
          let geocoder = e.data.location
          this.getAdressByGeocoder(geocoder)
        }, false)
      })
    }
  }
</script>

<style lang="scss">
  #map-page {
    #map_frame {
      width: 100%;
      height: 100%;
    }
  }

</style>
