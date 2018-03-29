import UserEntity from './user'

export default class EventParticipantEntity {
  user: UserEntity
  name: String
  accept_dates: Array<String>
  constructor ({ name, accept_dates, user }) {
    this.user = user
    this.name = name
    this.accept_dates = accept_dates
  }
}
