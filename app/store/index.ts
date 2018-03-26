import http from '../utils/http'

export const state = () => ({
  auth: null
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
  login ({ commit }) {
    return http.get('/api/authentication')
      .then(({ data }) => {
        commit('auth', data)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  logout ({ commit }) {
    commit('logout')
  }
}
