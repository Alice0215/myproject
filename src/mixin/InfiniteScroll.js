/*
* 参数：
  hasLoadAll: 表示数据是否全部加载，控制spinner
  list: 数据列表
  apiUrl: 数据api地址，会被拼接url参数。例如：'project/list?' or 'jobGroup/list/byProject?projectId=' + this.projectId
  scroll: q-infinite-scroll component
  infiniteScrollCallback: 每次api请求后的回调函数
*/
import { request } from '../common'
import eventBus from '../eventBus'
import { global } from '../const'
import _ from "lodash";

const InfiniteScroll = {
  data() {
    return {
      hasLoadAll: false,
      list: [],
      apiUrl: "",
      pageNo: 1,
      scroll: {},
      infiniteScrollCallback: {}
    }
  },

  methods: {
    load(index, done) {
      console.log("refresher")

      let that = this
      if (that.hasLoadAll) {
        done()
        this.scroll.stop()
        return
      }
     
      setTimeout(() => {
        that.getList(done)
      }, 200)
    },

    async getList(done) {
      let that = this     
      let url = that.apiUrl + "&pageNo=" + that.pageNo + "&pageSize=" + global.pageSize
      console.log("request:"+url)
      let response = await request(url, "get", "", "json", true)

      if (response) {
        let list = response.data.resultMsg
        if(_.isArray(list)){
          console.log(list.length)
          if (list.length < global.pageSize) {
            that.hasLoadAll = true            
          } else {
            that.pageNo++
          }
          that.list = that.list.concat(list)
        }
        if(_.isFunction(this.infiniteScrollCallback)){
          this.infiniteScrollCallback()
        }        
      }
      done()
    }
  }
}

export default InfiniteScroll
