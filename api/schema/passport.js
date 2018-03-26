const {
  INTEGER,
  STRING,
  ENUM,
} = require('sequelize')
const db = require('../dao/db')

const User = require('./user')

const Passport = db.define('passport', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  providerId: {
    type: INTEGER,
  },
  provider: {
    type: ENUM('twitter'),
  },
  username: {
    type: STRING,
  },
  displayName: {
    type: STRING,
  },
  photo: {
    type: STRING,
  }
}, {
  timestamp: true,
  freezeTableName: true,
  indexes: [
    {
      unique: true,
      fields: ['providerId', 'provider'],
    }
  ]
})

Passport.hasOne(User)

module.exports = Passport
