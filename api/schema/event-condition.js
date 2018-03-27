const {
  INTEGER,
  DATE,
  BOOLEAN,
} = require('sequelize')
const db = require('../dao/db')

const Event = require('./event')

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

module.exports = Condition

