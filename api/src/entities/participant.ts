import { Moment } from 'moment'
import UserEntity from './user'

import moment from 'moment'

export default class EventParticipantEntity {
  user: UserEntity
  name: String
  dates: Array<Moment>
  constructor ({ user, name, dates }) {
    this.user = user
    this.name = name
    this.dates = dates.map((date) => {
      return moment(date)
    })
  }
}
