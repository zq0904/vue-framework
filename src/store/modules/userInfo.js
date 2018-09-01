import { UPDATAUSERINFO } from '../mutation-types'
import _ from 'lodash'

const state = {
  name: '',
  status: '',
  avatar: '',
  token: ''
}

const mutations = {
  // 更新用户信息
  [UPDATAUSERINFO](state, obj) { // state 为 局部状态
    _.assign(state, obj)
  }
}

const actions = {
  // 更新用户信息
  updataUserInfo({ commit }, ...args) {
    commit(UPDATAUSERINFO, ...args)
  }
}

export default {
  state,
  mutations,
  actions
}
