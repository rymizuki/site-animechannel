import http from '../utils/http'

export const state = () => ({
  rows: []
})

export const mutations = {
  save (state, users) {
    state.rows = users
  }
}

export const actions = {
  fetch ({ commit }) {
    return http.get('/api/users/')
      .then(({ data }) => {
        return commit('save', data)
      })
  },
  saveUserPermissions ({ dispatch }, { user, permissions }) {
    return http.put(`/api/users/${ user.id }/permissions`, permissions)
      .then(() => {
        return dispatch('fetch')
      })
  }
}
