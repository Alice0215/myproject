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
  },
  username (state) {
    return state.current ? state.current.fullname : null
  },
  partyId (state) {
    return state.current ? state.current.partyId : null
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
