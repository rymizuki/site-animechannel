import express from 'express';
const router = express.Router();

import { find, get } from 'lodash'

import Passport from '../schema/passport'
import Permission from '../schema/permission'
import User from '../schema/user'
import UserPermission from '../schema/user-permission'


router.get('/', function (req, res, next) {
  Permission.findAll()
    .then((permissions) => {
      return permissions.map(({ name }) => ({ name }))
    })
    .then((permissions) => {
      return res.json(permissions)
    })
})

export default router
