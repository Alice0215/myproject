import _ from 'lodash'
import moment from 'moment'

const WorkLoadMixin = {
  data () {
    return {
      search: null,
      users: []
    }
  },
  watch: {
    search (value) {
      _.forEach(this.users, v => {
        let string = v.fullname
        v.show = true
        if (_.lowerCase(string).indexOf(value) === -1) {
          v.show = false
        }
      })
    }
  },
  methods: {
    chooseToWorkLoad (item) {
      let data = null
      if (item.workOrder) {
        data = item.workOrder
        data.startDay = moment(item.startTime).format('M月D日')
        data.endDay = moment(item.endTime).format('M月D日')
        data.workUser = {}
        data.workUser.user = item.workUser
        data.loadDate = item.workDate
      } else {
        data = item
      }
      this.$store.commit('WorkLoadOrder/setCurrent', data)
      this.$router.push('/workload/submit-work')
    }
  },
  async mounted () {
  }
}

export default WorkLoadMixin
