import Q from 'q'

import http from '../utils/http'

import { ActionContext } from 'vuex'
import { EventsEntity, update } from '../entities/events';

export type EventsActionContext = ActionContext<EventsEntity, EventsEntity>

export const state = () => (new EventsEntity)

export const mutations = {
  save (state: EventsEntity, rows: any) {
    update(state, rows)
  }
}

export const actions = {
  fetch ({ commit }: EventsActionContext) {
    return http.get('/api/events')
      .then(({ data }: { data: any }) => {
        commit('save', data)
      })
  },
  register ({ commit, dispatch }, data) {
    return http.post('/api/events', data)
      .then(({ data }) => {
        return dispatch('fetch')
          .then(() => ({ id: data.id }))
      })
  }
}
