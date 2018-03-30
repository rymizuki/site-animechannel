import moment from 'moment'

import EventSchema                from '../schema/event'
import EventConditionSchema       from '../schema/event-condition'
import EventParticipantSchema     from '../schema/event-participant'
import EventParticipantDateSchema from '../schema/event-participant-date'
import UserSchema                 from '../schema/user'
import PassportSchema             from '../schema/passport'

import * as EventRepository from './event'

import EventEntity from '../entities/event'

export function fetchRecently (): Promise<Array<EventEntity>> {
  return EventSchema.findAll({
    order: [
      ['id', 'DESC'],
    ],
    include: [
      EventConditionSchema,
      {
        model: EventParticipantSchema,
        include: [
          EventParticipantDateSchema,
          {
            // XXX: なんかこれ参照まとめらんないかな
            model: UserSchema,
            include: [
              PassportSchema,
            ]
          }
        ]
      }
    ],
  })
    .then((events) => {
      return events.map((event) => {
        return EventRepository.buildFromSchema(event)
      })
    })
}

export function add (data): Promise<EventEntity> {
  // TODO: txn
  const event = EventSchema.build()

  event.title       = data.title
  event.description = data.description
  event.place       = data.place
  event.status      = 'accepting'

  return event.save()
    .then((event) => {
      const condition = EventConditionSchema.build()

      condition.eventId = event.id
      condition.from    = moment(data.candidate.from).format('YYYY-MM-DD')
      condition.to      = moment(data.candidate.to).add(1, 'days').subtract(1, 'seconds').format('YYYY-MM-DD HH:mm:ss')
      condition.holiday = data.holiday

      return condition.save()
        .then(() => EventRepository.fetch(event.id))
    })
}
