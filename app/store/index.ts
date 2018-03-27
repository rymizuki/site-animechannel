import http from '../utils/http'
import Q from 'q'

import { get } from 'lodash'

export const state = () => ({
  auth: null,
})

export const mutations = {
  auth (state, auth) {
    state.auth = auth
  },
  logout (state) {
    state.auth = null
  }
}

export const actions = {
  login ({ commit }, route) {
    return http.get('/api/authentication')
      .then(({ data }) => {
        if (get(data, 'user.username') == null) {
          return Q.reject()
        } else {
          return Q.resolve(data)
        }
      })
      .then((data) => {
        commit('auth', data)
      })
  },
  logout ({ commit }) {
    commit('logout')
  }
}
