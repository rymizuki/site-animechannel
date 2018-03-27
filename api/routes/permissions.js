const express = require('express');
const router = express.Router();

const { find, get } = require('lodash')

const Passport = require('../schema/passport')
const Permission = require('../schema/permission')
const User = require('../schema/user')
const UserPermission = require('../schema/user-permission')


router.get('/', function (req, res, next) {
  Permission.findAll()
    .then((permissions) => {
      return permissions.map(({ name }) => ({ name }))
    })
    .then((permissions) => {
      return res.json(permissions)
    })
})

module.exports = router
