import http from '../utils/http'

export const state = () => ({
  result: { id: null }
})

export const mutations = {
  result (state, { id }) {
    state.result.id = id
  }
}

export const actions = {
  exec ({ commit }, { event, data }) {
    return http.post(`/api/events/${ event.id }`, data)
      .then(() => {
        commit('result', { id: event.id })
      })
  }
}
