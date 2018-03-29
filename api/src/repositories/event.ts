import EventSchema                from '../schema/event'
import EventConditionSchema       from '../schema/event-condition'
import EventParticipantSchema     from '../schema/event-participant'
import EventParticipantDateSchema from '../schema/event-participant-date'

import EventEntity                from '../entities/event'
import EventStateEntity           from '../entities/event-state'
import EventCandidateDatesEntity  from '../entities/event-candidate-dates'
import EventParticipants          from '../entities/event-participants'

import Participant                from '../entities/participant'

export default class EventRepository {
  private id: Number
  constructor (id: Number) {
    this.id = id
  }
  fetch () {
    return EventSchema.findById(this.id, {
      include: [
        EventConditionSchema,
      ]
    })
      .then((event) => {
        return {
          title:            event.title,
          description:      event.description,
          state:            new EventStateEntity({ type: event.status }),
          candidate_dates:  new EventCandidateDatesEntity(
            event.event_condition.from,
            event.event_condition.to,
            event.event_condition.holiday,
          ),
          participants:     new EventParticipants(),
        }
      })
  }
  add (participant: Participant) {
    return EventParticipantSchema.create({
      eventId: this.id,
      userId: participant.user.id,
      name: participant.name,
      event_participant_dates: participant.dates.map((date) => {
        return { date: date.format('YYYY-MM-DD') }
      })
    }, {
      include: [
        EventParticipantDateSchema,
      ]
    })
      .then(() => {
        return this.fetch()
      })
  }
}
