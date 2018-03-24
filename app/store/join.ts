import Q from 'q'
import { ActionContext } from 'vuex'

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
    return Q.when({ data: { id: 1 } })
      .then(({ data }) => {
        commit('result', data)
      })
  }
}
