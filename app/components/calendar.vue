<template lang="pug">
  div
    b-container
      b-row()
        b-col(style="font-size: 24px; text-align: right") {{target.format('YYYY-MM')}}
      b-row()
        b-col.calendar()
          b-row.header()
            b-col.date(v-for="week in weeks", :key="week") {{week}}
          b-row(v-for="(week, index) in dates", :key="index")
            b-col.date(
              v-for="(date, index) in week",
              :key="index",
              :class="date.classes",
              @click.prevent="selectDate(date.date)"
            )
              div.day {{date.day}}
              slot(:date="date.date", :data="date.data")
</template>

<script lang="ts">
import 'moment/locale/ja'
import moment from 'moment'
import { defaults, find, map, chain } from 'lodash'

export default {
  data () {
    moment.locale('ja')

    const rows  = 6
    const cells = 7

    const target = moment().startOf('month')
    const startOffset = target.isoWeekday()
    const firstday = target.clone().subtract(startOffset, 'day')

    const dates = chain(rows)
      .times()
      .map((row_index) => {
        return chain(cells)
          .times()
          .map((week) => {
            const date = firstday.clone().add((row_index * cells) + week, 'day')
            const disabled_fg = date.month() != target.month()
            const classes: Array<String> = []

            if (date.month() != target.month()) classes.push('is-external-month')
            if (date.isoWeekday() == 6) classes.push('is-saturday')
            if (date.isoWeekday() == 7) classes.push('is-sunday')

            return {
              date,
              key: date.format('YYYYMMDD'),
              day: date.date(),
              classes,
            }
          })
          .value()
      })
      .value()

    return {
      target,
      weeks: chain(cells).times()
        .map((index) => {
          return index
        })
        .value(),
      baseDates: dates,
    }
  },
  props: {
    locale: {
      type: String,
    },
    dateContents: {
      type: Array,
    }
  },
  computed: {
    dates () {
      return map(this.baseDates, (week) => {
        return map(week, (date) => {
          const target = find(this.dateContents, { key: date.key })
          if (target == null) {
            return defaults({
              classes: date.classes.concat('is-disabled')
            }, date)
          }
          return defaults({
            data: target.data,
          }, date)
        })
      })
    },
  },
  methods: {
    selectDate (date) {
      this.$emit('select', date)
    }
  }
}
</script>

<style scoped>

.calendar {
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
}

.calendar .header {
  font-weight: bold;
  text-align: center;
}

.calendar .date {
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.calendar .date.is-disabled {
  background: #efefef;
}

.calendar .date .day {
  text-align: right;
}

.calendar .date.is-saturday .day {
  color: blue;
}

.calendar .date.is-holiday .day,
.calendar .date.is-sunday .day {
  color: red;
}

.calendar .date.is-external-month .day {
  color: #ccc;
}


</style>
