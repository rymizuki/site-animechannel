import http from '../utils/http'
import { chain } from 'lodash'

export const state = () => ({
  result: { id: null }
})

export const mutations = {
  result (state, { id }) {
    state.result.id = id
  }
}

export const actions = {
  exec ({ commit }, { event, data, dates }) {
    return http.post(`/api/events/${ event.id }/participants`, {
      name: data.name,
      accept_dates: chain(dates)
        .filter((row) => row.data.joinning)
        .map((row) => row.date.format('YYYY-MM-DD'))
        .value()
    })
      .then(() => {
        commit('result', { id: event.id })
      })
  }
}
