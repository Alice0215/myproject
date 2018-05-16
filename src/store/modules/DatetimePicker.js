const state = {
  current: null,
  isStartData: false
}

const mutations = {
  setCurrent (state, o) {
    state.current = o
  },
  setIsStartData (state, o) {
    state.isStartData = o
  }
}

const getters = {
  getCurrent (state) {
    if (state.current) {
      return state.current
    }
  },
  getIsStartData (state) {
    return state.isStartData
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
