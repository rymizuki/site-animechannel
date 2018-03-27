const Passport        = require('../schema/passport')
const Permission      = require('../schema/permission')
const User            = require('../schema/user')
const UserPermission  = require('../schema/user-permission')

exports.authenticate = function ({ provider, id, username, displayName, photos }) {
  return Passport.findOne({ where: {
    provider:    provider,
    providerId:  id
  } })
    .then((_passport) => {
      const passport = _passport || Passport.build()

      // update attributes
      passport.providerId   = id
      passport.provider     = provider
      passport.username     = username
      passport.displayName  = displayName
      passport.photo        = photos[0].value

      // save
      return passport.save()
    })
    .then((passport) => {
      // authenticate user
      return User.findOne({
        where: { passportId: passport.id },
        include: [
          {
            model: UserPermission,
            include: [ Permission ],
          },
        ]
      })
        .then((user) => {
          // authorized user
          if (user != null) return user

          // unauthorized user
          if (user == null) {
            user = User.build()
            user.passportId = passport.id

            // save user
            return user.save()
          }
        })
        .then((user) => {
          // db -> authentication entity
          return {
            user: {
              username:    passport.username,
              displayName: passport.displayName,
              icon_url:    passport.photo,
            },
            permissions: user.user_permissions ? user.user_permissions
              .filter((user_permission) => {
                return user_permission.enabled
              })
              .map((user_permission) => {
                return {
                  name: user_permission.permission.name
                }
              }) : [],
          }
        })
    })
}
