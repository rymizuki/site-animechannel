import {
  INTEGER,
  STRING,
  BOOLEAN,
} from 'sequelize'
import db from '../infra/db'

import User from './user'
import Permission from './permission'

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

export default UserPermission
