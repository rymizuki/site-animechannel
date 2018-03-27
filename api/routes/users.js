const express = require('express');
const router = express.Router();

const { find, get, chain } = require('lodash')

const Q = require('q')
const Passport = require('../schema/passport')
const Permission = require('../schema/permission')
const User = require('../schema/user')
const UserPermission = require('../schema/user-permission')

// authorize
router.use(function (req, res, next) {
  const auth = get(req, 'user.authentication')
  if (auth == null) return res.status(401).end()
  if (find(auth.permissions, { name: 'user_management'} == null)) return res.status(401).end()
  return next()
})

router.get('/', function (req, res, next) {
  User.findAll({
    include: [
      { model: Passport },
      { model: UserPermission, include: [ Permission ], },
    ]
  })
    .then((users) => {
      // db -> entity
      return users.map((user) => {
        return {
          id:          user.id,
          screen_id:   user.passport.username,
          screen_name: user.passport.displayName,
          icon_url:    user.passport.photo,
          permissions: user.user_permissions.map((user_permission) => {
            return {
              name: user_permission.permission.name
            }
          })
        }
      })
    })
    .then((users) => {
      res.json(users)
    })
})

router.put('/:id/permissions', function (req, res, next) {
  const data = req.body

  Q.all([
    User.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: UserPermission
        },
      ]
    }),
    Permission.findAll()
  ])
    .then(([ user, permissions ]) => {
      const promises = chain(permissions)
        .map((permission) => {
          const enabled = data[permission.name]
          const userPermission = find(user.user_permissions, { permissionId: permission.id })

          return {
            permission,
            userPermission,
            enabled,
          }
        })
        .filter(({ permission, userPermission, enabled }) => {
          // 無効 & 未定義 → 更新しない
          if (!enabled && userPermission == null) return false

          // 無効 & 無効 → 更新しない
          if (!enabled && !userPermission.enabled) return false

          // 有効 & 有効 → 更新しない
          if (enabled == (userPermission && userPermission.enabled)) return false

          // 更新する
          return true
        })
        .map(({ permission, userPermission, enabled}) => {
          // なければ作る
          if (userPermission == null) {
            userPermission = UserPermission.build()
            userPermission.userId = user.id
            userPermission.permissionId = permission.id
          }
          // 更新
          userPermission.enabled = enabled
          console.log('save to', userPermission)
          // 保存
          return userPermission.save()
        })
        .value()
      return Q.all(promises)
    })
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
