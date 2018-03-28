import {
  INTEGER,
  STRING,
} from 'sequelize'
import db from '../infra/db'

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

export default User
