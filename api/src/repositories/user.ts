import PassportSchema       from '../schema/passport'
import PermissionSchema     from '../schema/permission'
import UserSchema           from '../schema/user'
import UserPermissionSchema from '../schema/user-permission'

import UserEntity       from '../entities/user'
import PermissionEntity from '../entities/permission'

export default class UserRepository {
  private id: Number
  constructor (id) {
    this.id = id
  }
  fetch (): Promise<UserEntity> {
    return UserSchema.findOne({
      where: { id: this.id },
      include: [
        PassportSchema,
        {
          model: UserPermissionSchema,
          include: [
            PermissionSchema
          ]
        }
      ],
    })
      .then((user) => {
        return new UserEntity({
          id: user.id,
          screen_id: user.passport.username,
          screen_name: user.passport.displayName,
          icon_url: user.passport.photo,
          permissions: user.user_permissions.map((user_permission) => {
            return new PermissionEntity({ name: user_permission.permission.name })
          }),
        })
      })
  }
}
