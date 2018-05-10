const state = {
  projectid: null,
  current: null
}

const mutations = {
  setCurrent (state, o) {
    state.current = o
  },
  setProject (state, o) {
    state.projectid = o
  }
}

const getters = {
  getCurrent (state) {
    if (state.current) {
      return state.current
    }
  },
  getProjectId (state) {
    if (state.projectid) {
      return state.projectid
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
