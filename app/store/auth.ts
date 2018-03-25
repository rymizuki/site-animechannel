import http from '../utils/http'

export const state = () => ({})

export const mutations = {
}

export const actions = {
  signup ({ commit }) {
    return http.post('/api/actions/auth/signup')
  }
}
