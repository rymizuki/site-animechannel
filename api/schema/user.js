const {
  INTEGER,
  STRING,
} = require('sequelize')
const db = require('../infra/db')

const User = db.define('user', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  timestamp: true,
  freezeTableName: true,
})

module.exports = User
