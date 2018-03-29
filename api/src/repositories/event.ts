import EventSchema                from '../schema/event'
import EventConditionSchema       from '../schema/event-condition'
import EventParticipantSchema     from '../schema/event-participant'
import EventParticipantDateSchema from '../schema/event-participant-date'
import UserSchema                 from '../schema/user'
import PassportSchema             from '../schema/passport'

import EventEntity                from '../entities/event'
import EventStateEntity           from '../entities/event-state'
import EventCandidateDatesEntity  from '../entities/event-candidate-dates'
import EventParticipantsEntity    from '../entities/event-participants'
import EventParticipantEntity     from '../entities/event-participant'

import UserEntity                 from '../entities/user'
import ParticipantEntity          from '../entities/participant'

export function fetch (id: Number): Promise<EventEntity> {
  return EventSchema.findById(id, {
    include: [
      EventConditionSchema,
      {
        model: EventParticipantSchema,
        include: [
          EventParticipantDateSchema,
          {
            // XXX: なんかこれ参照まとめらんないかな
            model: UserSchema,
            include: [
              PassportSchema,
            ]
          }
        ]
      }
    ]
  })
    .then((event) => {
      return new EventEntity({
        id:               event.id,
        title:            event.title,
        description:      event.description,
        state:            new EventStateEntity({ type: event.status }),
        candidate_dates:  new EventCandidateDatesEntity(
          event.event_condition.from,
          event.event_condition.to,
          event.event_condition.holiday,
        ),
        participants:     new EventParticipantsEntity(
          event.event_participants.map((event_participant) => {
            return new EventParticipantEntity({
              name: event_participant.name,
              accept_dates: event_participant.event_participant_dates.map((event_participant_date) => {
                return event_participant_date.date
              }),
              user: new UserEntity({
                id:           event_participant.user.id,
                screen_id:    event_participant.user.passport.username,
                screen_name:  event_participant.user.passport.displayName,
                icon_url:     event_participant.user.passport.photo,
                permissions:  [], // 使わない
              })
            })
          })
        ),
      })
    })
}

export function addParticipante (event: EventEntity, participant: ParticipantEntity) {
  return EventParticipantSchema.create({
    eventId:                  event.id,
    userId:                   participant.user.id,
    name:                     participant.name,
    event_participant_dates:  participant.dates.map((date) => {
      return { date: date.format('YYYY-MM-DD') }
    })
  }, {
    include: [
      EventParticipantDateSchema,
    ]
  })
    .then(() => {
      return this.fetch(event.id)
    })
}
