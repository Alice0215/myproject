const state = {
  current: null
}

const mutations = {
  setCurrent (state, o) {
    state.current = o
  }
}

const getters = {
  getCurrent (state) {
    if (state.current) {
      return state.current
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
