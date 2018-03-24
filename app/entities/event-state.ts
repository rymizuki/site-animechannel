export default class EventStateEntity {
  type: String
  name: String
  isFinished: Boolean
  isAccepting: Boolean
  constructor ({ type, name }) {
    this.type = type
    this.name = name
    this.isFinished = this.type == 'finished'
    this.isAccepting = this.type == 'accepting'
  }
}
