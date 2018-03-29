import * as UserRepository  from '../repositories/user'
import * as EventRepository from '../repositories/event'

import UserEntity         from '../entities/user'
import EventEntity        from '../entities/event'
import ParticipantEntity  from '../entities/participant'

// eventに参加する
export default class EventParticipation {
  private user: UserEntity
  private event: EventEntity
  constructor (user: UserEntity, event: EventEntity) {
    this.user  = user
    this.event = event
  }
  async exec (name, accept_dates) {
    const user  = this.user
    const event = this.event

    const participant = new ParticipantEntity({
      user,
      name,
      dates: accept_dates
    })

    return EventRepository.addParticipante(event, participant)
  }
}
