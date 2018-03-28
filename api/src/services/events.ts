import moment from 'moment'

import { get, find, chain } from 'lodash'

import Event from '../schema/event'
import EventCondition from '../schema/event-condition'

function candidateDates (condition) {
  const from = moment(condition.from)
  const to   = moment(condition.to)
  const diff = Math.ceil(to.diff(from, 'day', true))
  return chain(diff)
    .times()
    .map((index) => from.clone().add(index, 'days'))
    .filter((date) => {
      if (condition.holiday) return true // 休日を含むなら常にtrue
      if (date.isoWeekday() == 6) return false // 土曜日はfalse
      if (date.isoWeekday() == 7) return false // 日曜日はfalse
      return true // FIXME: 祝日
    })
    .map((date) => date.format('YYYY-MM-DD'))
    .value()
}

const label = {
  accepting: '受付中',
  hold: '開催待ち',
  fnished: '終了',
}

function buildEntity (event) {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    state: {
      type: event.status,
      name: label[event.status],
    },
    candidate_dates: candidateDates(event.event_condition),
    participants: [] // TODO,
  }
}

export default {
  list () {
    return Event.findAll({
      order: [
        ['id', 'DESC'],
      ],
      include: [
        EventCondition,
      ],
    })
      .then((events) => {
        return events.map((event) => buildEntity(event))
      })
  },
  find (id) {
    return Event.findOne({
      where: { id },
      include: [
        EventCondition,
      ]
    })
      .then((event) => buildEntity(event))
  },
  add (data) {
    // TODO: transaction
    const event = Event.build()
    event.title       = data.title
    event.description = data.description
    event.place       = data.place
    event.status      = 'accepting'

    return event.save()
      .then((event) => {
        const condition = EventCondition.build()
        condition.eventId = event.id
        condition.from    = moment(data.candidate.from).format('YYYY-MM-DD')
        condition.to      = moment(data.candidate.to).add(1, 'days').subtract(1, 'seconds').format('YYYY-MM-DD HH:mm:ss')
        condition.holiday = data.holiday
        return condition.save()
          .then(() => event)
      })
  }
}
