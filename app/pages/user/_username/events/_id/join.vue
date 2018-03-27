<template lang="pug">
  div
    h4 参加登録

    el-form(ref="form" :model="form" label-width="120px")
      el-form-item(label="おなまえ")
        el-input(v-model="form.name")
      el-form-item(label="イケる日")
        p 参加できる日にチェック<i class="icon-check"></i>をいれてください。
        calendar(:dateContents="dateContents")
          template(
            slot-scope="scope",
          )
            div(
              v-if="scope.data",
              style="padding-bottom: 8px; font-size: 24px; text-align: center"
            )
              el-button(
                :type="scope.data.joinning ? 'success' : 'danger'"
                plain
                @click="toggleDate(scope.date)"
              )
                i.el-icon-check(v-if=" scope.data.joinning")
                i.el-icon-close(v-if="!scope.data.joinning")
      el-form-item
        el-button(type="primary" @click="onSubmit") 登録
        el-button(@click="onCancel") キャンセル
</template>

<script lang="ts">
import moment from 'moment'
import { chain, map } from 'lodash'

import Calendar from '~/components/calendar'

export default {
  components: {
    Calendar,
  },
  data () {
    return {
      form: {
        name: '',
        accept_dates: [],
      },
    }
  },
  computed: {
    self () {
      return this.$store.state.auth.user
    },
    event () {
      return this.$store.state.event
    },
    dateContents () {
      if (!this.event || !this.event.candidate_dates) return []
      return map(this.event.candidate_dates, (candidate_date) => {
        const date = moment(candidate_date)
        const data = {
          joinning: true,
        }
        return {
          key: date.format('YYYYMMDD'),
          date,
          data,
        }
      })
    },
  },
  methods: {
    toggleDate (date) {
      this.dateContents.forEach((content) => {
        if (content.key == date.format('YYYYMMDD')) {
          content.data.joinning = !content.data.joinning
        }
      })
      this.form.accept_dates = chain(this.dateContents)
        .filter((content) => {
          return content.data.joining
        })
        .map((content) => {
          return content.date.format('YYYY-MM-DD')
        })
        .value()
      this.$forceUpdate()
    },
    onSubmit () {
      this.$store.dispatch('join/exec', {
        event,
        data: this.form,
      })
        .then(() => {
          this.$router.push({
            name: 'user-username-events-id-information-schedule',
            params: {
              username: this.self.username,
              id: this.event.id,
            },
          })
        })
    },
    onCancel () {
      this.$router.push({
        name: 'user-username-events-id-information',
        params: {
          username: this.self.username,
          id: this.event.id
        },
      })
    }
  }
}
</script>
