import EventStateEntity           from './event-state'
import EventParticipantEntity    from './event-participant'
import ParticipantEntity          from './participant'

export default class EventEntity {
  id: Number
  title: String
  description: String
  state: EventStateEntity
  candidate_dates: Array<string>
  participants: Array<EventParticipantEntity>
  constructor ({ id, title, description, state, candidate_dates, participants }) {
    this.id               = id
    this.title            = title
    this.description      = description
    this.state            = state
    this.candidate_dates  = candidate_dates
    this.participants     = participants
  }
}
