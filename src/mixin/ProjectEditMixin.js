import eventBus from '../eventBus'
import { request } from '../common'
import _ from 'lodash'
import { required } from 'vuelidate/lib/validators'
import { jobType } from '../const'

const ProjectEditMixin = {
  data () {
    return {
      isEdited: false,
      projectTypes: [],
      selectProjectType: null,
      jobType: null,
      users: [],
      selectProjectTypeOpen: false,
      opened: false,
      search: null,
      formData: {
        projectTypeId: '',
        projectName: '',
        projectDesc: '',
        location: '',
        selectedUsers: [],
        managerUsers: [],
        memberUsers: [],
        address: '',
        locationJson: '',
        geoInfo: null
      }
    }
  },
  computed: {
    // 仅读取
    count: function () {
      let i = 0
      _.forEach(this.users, v => {
        if (v.show !== false) {
          i++
        }
      })
      return i
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
  validations: {
    formData: {
      projectName: { required },
      managerUsers: { required },
      locationJson: { required },
      projectTypeId: { required }
    }
  },
  methods: {
    async getUsers () {
      this.$q.loading.show()
      const resp = await request('user/all', 'get', {}, true)
      this.$q.loading.hide()
      if (resp) {
        this.users = resp.data.resultMsg
        _.forEach(this.users, v => {
          v.checked = false
        })
      }
    },
    async getProjectType () {
      const resp = await request('projectType/all', 'get')
      if (resp) {
        this.projectTypes = resp.data.resultMsg
        _.forEach(this.projectTypes, v => {
          v.checked = false
          if (this.selectProjectType) {
            if (this.selectProjectType.id === v.id) {
              v.checked = true
            }
          }
        })
      }
    },
    chooseProjectType () {
      this.selectProjectTypeOpen = true
    },
    chooseType (type) {
      this.isEdited = true
      _.forEach(this.projectTypes, v => {
        v.checked = false
        if (type.id === v.id) {
          v.checked = true
          this.selectProjectType = v
          this.formData.projectTypeId = this.selectProjectType.id
        }
      })
      this.selectProjectTypeOpen = false
      this.$forceUpdate()
    },
    removeUser (u, index, arr) {
      this.isEdited = true
      u.checked = false
      if (arr === null) {
        this.formData.selectedUsers.splice(index, 1)
        _.forEach(this.users, v => {
          if (u.userId === v.userId) {
            v.checked = false
          }
        })
      } else {
        arr.splice(index, 1)
      }
    },
    choose (user) {
      this.isEdited = true
      if (!_.includes(_.map(this.formData.selectedUsers, v => v.userId), user.userId) && user.checked) {
        this.formData.selectedUsers.push(user)
      } else {
        this.formData.selectedUsers = _.remove(this.formData.selectedUsers, v => {
          return v.userId !== user.userId
        })
      }
    },
    completed () {
      this.isEdited = true
      if (this.jobType === jobType.TL) {
        this.formData.managerUsers = _.cloneDeep(this.formData.selectedUsers)
      } else {
        this.formData.memberUsers = _.cloneDeep(this.formData.selectedUsers)
      }
    },
    chooseUser (type) {
      this.opened = true
      this.jobType = type
      if (this.jobType === jobType.TL) {
        let currentUser = this.$store.state.User.current
        if (!_.includes(_.map(this.formData.managerUsers, v => v.userId), currentUser.userId)) {
          currentUser.checked = true
          this.formData.managerUsers.push(this.$store.state.User.current)
        }
        this.formData.selectedUsers = _.cloneDeep(this.formData.managerUsers)
      } else {
        this.formData.selectedUsers = _.cloneDeep(this.formData.memberUsers)
      }
      _.forEach(this.users, v => {
        v.checked = false
      })
      _.forEach(this.formData.selectedUsers, u => {
        _.forEach(this.users, v => {
          if (u.checked) {
            if (u.userId === v.userId) {
              v.checked = true
            }
          }
        })
      })
    },
    dealData () {
      let projectJobs = []
      _.forEach(this.formData.managerUsers, v => {
        v.jobType = 'TL'
        projectJobs.push(_.pick(v, ['userId', 'jobType']))
      })
      _.forEach(this.formData.memberUsers, v => {
        v.jobType = 'TM'
        projectJobs.push(_.pick(v, ['userId', 'jobType']))
      })
      return projectJobs
    }
  },
  async mounted () {
    this.getUsers()
    this.getProjectType()
    let formData = this.$store.getters['Project/getCurrent']
    let location = this.$store.getters['Location/getCurrent']
    if (!_.isUndefined(formData) && !_.isNull(formData)) {
      this.formData = formData
      if (!_.isUndefined(location) && !_.isNull(location)) {
        this.formData.geoInfo = location
        if (!_.isNull(location)) {
          this.formData.address = location.formattedAddress
          this.formData.locationJson = location
        }
      }
    }

    eventBus.$on('refresh-project-page', () => {
      this.load()
    })
  },
  beforeDestroy () {
    eventBus.$off('refresh-project-page')
  }
}

export default ProjectEditMixin
