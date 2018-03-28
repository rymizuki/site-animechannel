import {
  INTEGER,
  STRING,
} from 'sequelize'
import db from '../infra/db'

const Permission = db.define('permission', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING,
  }
}, {
  timestamp: true,
  freezeTableName: true,
})

Permission.sync().then(() => {
  console.log('synced permission')
  Permission.bulkCreate([
    { id: 1, name: 'user_management' },
    { id: 2, name: 'event_management' },
    { id: 3, name: 'event_joinning' },
  ])
})

export default Permission
