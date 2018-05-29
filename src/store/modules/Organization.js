const state = {
  items: [],
  current: null
}

const mutations = {
  setItems (state, o) {
    state.items = o
  },
  setCurrent (state, o) {
    state.current = o
  }
}

const getters = {
  id (state) {
    return state.current ? state.current.id : null
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
