import Q from 'q'

export const state = () => ({
  rows: []
})

export const mutations = {
  save (state, rows) {
    state.rows = rows
  }
}

export const actions = {
  fetch ({ commit }) {
    return Q.when({
      data: [
        {
          id: 1,
          title: '2018冬春',
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
            },
            {
              screen_id: 'mizuki_r',
              screen_name: 'みずき',
            },
          ]
        },
        {
          id: 2,
          title: '2018新年会',
          state: {
            type: 'finished',
            name: '終了',
          },
          date: '2018-01-01 19:30',
          place: 'あなぐら',
          participants: [
            {
              screen_id: 'mizuki_r',
              screen_name: 'みずき',
            },
            {
              screen_id: 'mizuki_r',
              screen_name: 'みずき',
            },
          ]
        }
      ]
    })
      .then(({ data }) => {
        commit('save', data)
      })
  }
}
