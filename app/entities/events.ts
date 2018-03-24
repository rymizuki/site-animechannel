import { find } from 'lodash'
import * as Event from './event'

export class EventsEntity {
  rows: Array<Event.EventEntity>
  constructor () {
    this.rows = []
  }
}

export function update (events: EventsEntity, rows: Array<any>) {
  events.rows = rows.map((row) => {
    return Event.update(new Event.EventEntity, row)
  })
  return events
}
