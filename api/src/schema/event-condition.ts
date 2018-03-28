import {
  INTEGER,
  DATE,
  BOOLEAN,
} from 'sequelize'
import db from '../infra/db'

import Event from './event'

const Condition = db.define('event_condition', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  from: {
    type: DATE,
  },
  to: {
    type: DATE,
  },
  holiday: {
    type: BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamp: true,
  freezeTableName: true,
})

Condition.belongsTo(Event)
Event.hasOne(Condition)

export default Condition
