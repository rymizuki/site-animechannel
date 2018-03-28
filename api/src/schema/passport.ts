import {
  INTEGER,
  STRING,
  ENUM,
} from 'sequelize'
import db from '../infra/db'

import User from './user'

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
User.belongsTo(Passport)

export default Passport
