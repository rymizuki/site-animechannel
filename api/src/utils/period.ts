import { Moment } from 'moment'
import moment from 'moment'
import { chain } from 'lodash'

export function periodToDateList (fromStr: string, toStr: string, { holiday }: { holiday: Boolean }) {
  const from: Moment  = moment(fromStr)
  const to:   Moment  = moment(toStr)

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
