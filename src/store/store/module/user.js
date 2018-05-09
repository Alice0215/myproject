
const state = {
  current: null
}

const mutations = {
  setCurrent (state, o) {
    state.current = o
    window.user = o
    localStorage.setItem('user', JSON.stringify(o))
  }
}

const getters = {
  token (state) {
    return state.current ? state.current.userToken : null
  },
  userId (state) {
    return state.current ? state.current.userId : null
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
