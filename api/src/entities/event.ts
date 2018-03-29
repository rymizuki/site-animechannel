import EventStateEntity           from './event-state'
import EventCandidateDatesEntity  from './event-candidate-dates'
import EventParticipantsEntity    from './event-participants'
import ParticipantEntity          from './participant'

import EventRepository from '../repositories/event'

export default class EventEntity {
  private repository: EventRepository
  private data: any
  public id: Number
  constructor (id) {
    this.repository       = new EventRepository(id)
    this.id               = id
    this.fetch()
  }
  accepted (participant: ParticipantEntity) {
    // TODO: validation fro dates
    return this.repository.add(participant)
      .then((data) => this.save(data))
  }
  private fetch () {
    return this.repository.fetch()
      .then((data) => this.save(data))
  }
  private save (data) {
    this.data = data
  }
  get title (): String {
    return this.data.title
  }
  get description (): String {
    return this.data.description
  }
  get state (): EventStateEntity {
    return this.data.state
  }
  get candidate_dates (): EventCandidateDatesEntity {
    return this.data.candidate_dates
  }
  get participants (): EventParticipantsEntity {
    return this.data.candidate_dates
  }
}
