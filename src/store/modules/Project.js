const state = {
  projectid: null,
  current: null,
  editData: null
}

const mutations = {
  setCurrent (state, o) {
    state.current = o
  },
  setProject (state, o) {
    state.projectid = o
  },
  setEditData (state, o) {
    state.editData = o
  }
}

const getters = {
  getCurrent (state) {
    if (state.current) {
      return state.current
    }
  },
  getEditData (state) {
    if (state.editData) {
      return state.editData
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
