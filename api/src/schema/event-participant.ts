import {
  INTEGER,
  STRING,
} from 'sequelize'
import db from '../infra/db'

import Event from './event'
import User  from './user'

const EventParticipant = db.define('event_participant', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: STRING,
  }
}, {
  timestamp: true,
  freezeTableName: true,
})

EventParticipant.belongsTo(User)
EventParticipant.belongsTo(Event)
Event.hasMany(EventParticipant)

export default EventParticipant
