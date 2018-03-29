const label = {
  accepting:  '受付中',
  hold:       '開催待ち',
  fnished:    '終了',
}

export default class EventStateEntity {
  type: String
  name: String
  constructor ({ type }) {
    this.type = type
    this.name = label[type]
  }
}
