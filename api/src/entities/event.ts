import EventStateEntity           from './event-state'
import EventCandidateDatesEntity  from './event-candidate-dates'
import EventParticipantsEntity    from './event-participants'
import ParticipantEntity          from './participant'

export default class EventEntity {
  id: Number
  title: String
  description: String
  state: EventStateEntity
  candidate_dates: EventCandidateDatesEntity
  participants: EventParticipantsEntity
  constructor ({ id, title, description, state, candidate_dates, participants }) {
    this.id               = id
    this.title            = title
    this.description      = description
    this.state            = state
    this.candidate_dates  = candidate_dates
    this.participants     = participants
  }
}
