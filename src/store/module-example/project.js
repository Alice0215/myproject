import * as _ from 'lodash'
import { request } from '../../common'
import eventBus from '../../eventBus'

const state = {
  current: null,
  module: null,
  // 有权限的模块
  moduleIds: null
}

const mutations = {
  setCurrent (state, o) {
    state.current = o
    if (o) {
      if (o.id && !o.projectId) {
        state.current.projectId = o.id
      }
      if (o.projectId && !o.id) {
        state.current.id = o.projectId
      }
    }
  },
  setModule (state, o) {
    state.module = o
  },
  setTopic (state, o) {
    state.current.topic = o
  },
  setModuleIds (state, o) {
    state.moduleIds = o
  }
}

const getters = {
  moduleIds (state) {
    return state.moduleIds
  },
  projectId (state) {
    if (state.current) {
      return state.current.id
    }
  }
}

const actions = {
  async init ({ commit }, projectId) {
    const resp = await request(`project/detail?projectId=${projectId}`)
    if (resp) {
      commit('setCurrent', resp)
      commit('setModuleIds', resp.moduleIds)
      eventBus.$emit('refresh-project-detail')
      eventBus.$emit('refresh-tabs')
      eventBus.$emit('project-moduleIds')
      eventBus.$emit('refresh-project-page')
      eventBus.$emit('refresh-topic')
      eventBus.$emit('refresh-file')
      eventBus.$emit('refresh-admin')
      eventBus.$emit('refresh-children')
      eventBus.$emit('refresh-authority')
      eventBus.$emit('refresh-calendar')
    }
  },
  async setProject ({ commit }, projectId) {
    const resp = await request(`project/detail?projectId=${projectId}`)
    if (resp) {
      commit('setCurrent', resp)
      commit('setModuleIds', resp.moduleIds)
      eventBus.$emit('refresh-calendar')
    }
  },
  setModule ({ commit, rootState }, module) {
    if (!module) {
      module = _.find(rootState.Module.items, { id: 'my-project' })
    }
    commit('setModule', module)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
