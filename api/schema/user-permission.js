const {
  INTEGER,
  STRING,
  BOOLEAN,
} = require('sequelize')
const db = require('../infra/db')

const User = require('./user')
const Permission = require('./permission')

const UserPermission = db.define('user_permission', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  enabled: {
    type: BOOLEAN,
    defaultValue: 0,
  },
}, {
  timestamp: true,
  freezeTableName: true,
})

UserPermission.belongsTo(Permission)
UserPermission.belongsTo(User)
User.hasMany(UserPermission)

module.exports = UserPermission
