import {
  INTEGER,
  STRING,
  TEXT,
  DATE,
  ENUM
} from 'sequelize'
import db from '../infra/db'

const Event = db.define('event', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: STRING,
  },
  description: {
    type: TEXT,
  },
  status: {
    type: ENUM('accepting', 'hold', 'finished'),
  },
  place: {
    type: STRING,
    defaultValue: null,
  },
  data: {
    type: DATE,
    defaultValue: null,
  },
}, {
  timestamp: true,
  freezeTableName: true,
})

export default Event
