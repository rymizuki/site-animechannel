import Q from 'q'
import { ActionContext } from 'vuex'

import { EventEntity, update } from '../entities/event'

export type EventActionContext = ActionContext<EventEntity, EventEntity>

export const state = () => (new EventEntity)

export const mutations = {
  save (state: EventEntity, event: any) {
    update(state, event)
  }
}

export const actions = {
  fetch ({ commit }: EventActionContext) {
    return Q.when({
      data: {
        id: 1,
        title: '2018冬春',
        description: 'はろー',
        state: {
          type: 'accepting',
          name: '受付中',
        },
        date: null,
        place: null,
        participants: [
          {
            screen_id: 'mizuki_r',
            screen_name: 'みずき',
            accept_dates: [
              '2018-03-01',
              '2018-03-03',
            ]
          },
          {
            screen_id: 'mizuki_r',
            screen_name: 'みずき',
          },
        ],
        candidate_dates: [
          '2018-03-01',
          '2018-03-02',
          '2018-03-03',
        ],
      },
    })
      .then(({ data }: { data: any }) => {
        commit('save', data)
      })
  }
}
