const state = {
  current: null,
  jobGroup: null
}

const mutations = {
  setCurrent (state, o) {
    state.current = o
  },
  setJobGroup (state, o) {
    state.jobGroup = o
  }
}

const getters = {
  getCurrent (state) {
    if (state.current) {
      return state.current
    }
  },
  JobGroupId (state) {
    return state.current ? state.current.jobGroupId : null
  },
  getJobGroup (state) {
    if (state.jobGroup) {
      return state.jobGroup
    }
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
