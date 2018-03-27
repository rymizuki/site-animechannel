import http from '../utils/http'

export const state = () => ({
  rows: []
})

export const mutations = {
  save (state, permissions) {
    state.rows = permissions
  }
}

export const actions = {
  fetch ({ commit }) {
    return http.get('/api/permissions/')
      .then(({ data }) => {
        return commit('save', data)
      })
  }
}
