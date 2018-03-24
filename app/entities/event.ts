import EventStateEntity from './event-state'

export class EventEntity {
  id: Number
  title: String
  state: EventStateEntity
  date: String|null
  place: String|null
  participants: Array<{screen_id: String, screen_name: String}>
  isFinished: Boolean
  isAccepting: Boolean
  constructor () {
  }
}

export function update (event: EventEntity, data: any) {
  [
    'id',
    'title',
    'description',
    'state',
    'date',
    'place',
    'participants',
    'candidate_dates',
  ].forEach((key) => {
    event[key] = key == 'state' ? new EventStateEntity(data[key]) : data[key]
  })
  event.isFinished = event.state.isFinished
  event.isAccepting = event.state.isAccepting
  return event
}
