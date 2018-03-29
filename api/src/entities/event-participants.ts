import EventParticipantEntity from './event-participant'

export default class EventParticipantsEntity {
  private rows: Array<EventParticipantEntity>
  constructor (rows) {
    this.rows = rows
  }
}
