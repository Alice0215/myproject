import { request, uploadFiles } from '../common'
import { server} from '../const'
import _ from 'lodash'
import { ImagePreview } from 'vant'
import eventBus from '../eventBus'

const Picture = {
  computed: {
    thumbnails: function () {
      let arr = []
      _.forEach(this.pictures, v => {
        arr.push(server.THUMBNAIL_API + v)
      })
      return arr
    },
    previews: function () {
      let arr = []
      _.forEach(this.pictures, v => {
        arr.push(server.PREVIEW_API + v)
      })
      return arr
    }
  },
  data () {
    return {
      pictures: []
    }
  },
  methods: {
    openCamera () {
      if (navigator.camera) {
        navigator.camera.getPicture(imgData => {
          this.$q.loading.show()
          uploadFiles(imgData)
        }, errorMsg => {
          console.log(errorMsg);
        }, { destinationType: Camera.DestinationType.DATA_URL })
      }
    },

    cancelUploadImage (index) {
      this.pictures.splice(index, 1)
    },

    imagePreview (index) {     
      ImagePreview(previews, index)
    },

    buildPicture(list){
      if (list && list.length > 0) {
        let imageArray = []
        _.forEach(list, v => {
          imageArray.push(v.filePath)              
        })
        this.pictures = imageArray
      }
    },

    addUploadEvent(){
      eventBus.$on('upload-success', resp => {
        this.$q.loading.hide()
        this.pictures.push(resp.contentUrl)
      })
    },
    

  },
  mounted () {},
  
}

export default Picture
