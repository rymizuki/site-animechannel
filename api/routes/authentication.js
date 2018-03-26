const express = require('express');
const router = express.Router();

const User            = require('../schema/user')
const UserPermission  = require('../schema/user-permission')
const Permission      = require('../schema/permission')

router.get('/', function (req, res, next) {
  const passport = req.user

  if (!passport) return res.json({})

  const user = User.findOne({
    where: {passportId: passport.id},
    include: [
      {
        model: UserPermission,
        include: [ Permission ],
      },
    ]
  })
    .then((user) => {
      console.log('user', user)
      return {
        user: {
          username:    passport.username,
          displayName: passport.displayName,
        },
        permissions: user.user_permissions.map((user_permission) => {
          return {
            name: user_permission.permission.name
          }
        }),
      }
    })
    .then((authenticate) => {
      return res.json(authenticate)
    })
})

module.exports = router
