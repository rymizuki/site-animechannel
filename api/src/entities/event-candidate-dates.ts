import { Moment } from 'moment'
import moment from 'moment'
import { chain } from 'lodash'

export default class EventCandidateDates {
  from: Moment
  to: Moment
  holiday: Boolean
  rows: Array<Moment>
  constructor (from, to, holiday) {
    this.from = moment(from)
    this.to   = moment(to)
    this.holiday = holiday
    this.rows = this.build()

  }
  private build (): Array<Moment> {
    const from    = this.from
    const to      = this.to
    const holiday = this.holiday

    const diff = Math.ceil(to.diff(from, 'day', true))

    return chain(diff)
      .times()
      .map((index) => from.clone().add(index, 'days'))
      .filter((date) => {
        if (holiday)                return true // 休日を含むなら常にtrue
        if (date.isoWeekday() == 6) return false // 土曜日はfalse
        if (date.isoWeekday() == 7) return false // 日曜日はfalse
        return true // FIXME: 祝日
      })
      .map((date) => date)
      .value()
  }
}
