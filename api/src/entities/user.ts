import Permission from './permission'

export default class User {
  id: Number
  screen_id: String
  screen_name: String
  icon_url: String
  permissions: Array<Permission>
  constructor ({ id, screen_id, screen_name, icon_url, permissions }) {
    this.id           = id
    this.screen_id    = screen_id
    this.screen_name  = screen_name
    this.icon_url     = icon_url
    this.permissions  = permissions
  }
}
