import UserRepository  from '../repositories/user'
import EventRepository from '../repositories/event'

import EventEntity        from '../entities/event'
import ParticipantEntity  from '../entities/participant'

// eventに参加する
export default class EventParticipation {
  private userRepository: UserRepository
  private event: EventEntity
  constructor (userRepository: UserRepository, event: EventEntity) {
    this.userRepository = userRepository
    this.event = event
  }
  async exec (name, accept_dates) {
    const user  = await this.userRepository.fetch()

    // ユーザが受理
    return this.event.accepted(new ParticipantEntity({
      user,
      name,
      dates: accept_dates
    }))
  }
}
