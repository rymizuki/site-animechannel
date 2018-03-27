const {
  INTEGER,
  STRING,
  TEXT,
  DATE,
  ENUM
} = require('sequelize')
const db = require('../dao/db')

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

module.exports = Event
