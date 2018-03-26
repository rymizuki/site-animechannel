const {
  INTEGER,
  STRING,
} = require('sequelize')
const db = require('../dao/db')

const User = require('./user')
const Permission = require('./permission')

const UserPermission = db.define('user_permission', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  timestamp: true,
  freezeTableName: true,
})

UserPermission.belongsTo(Permission)
UserPermission.belongsTo(User)
User.hasMany(UserPermission)

module.exports = UserPermission
