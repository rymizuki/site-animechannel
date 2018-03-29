import {
  INTEGER,
  DATE,
} from 'sequelize'
import db from '../infra/db'

import EventParticipant from './event-participant';

const EventParticipantDate = db.define('event_participant_date', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DATE,
  }
}, {
  timestamp: true,
  freezeTableName: true,
})

EventParticipantDate.belongsTo(EventParticipant)
EventParticipant.hasMany(EventParticipantDate)

export default EventParticipantDate
