<template lang="pug">
  div(v-if="self && events")
    el-table(
      :data="events"
    )
      el-table-column(
        label = "id",
        prop = "id",
      )
      el-table-column(
        label = "title",
        prop = "title",
      )
      el-table-column(
        label = "state"
        prop = "state.name"
      )
      el-table-column(
        label = ""
      )
        template(slot-scope="scope")
          el-button(type="text") 編集
</template>

<script lang="ts">
import { get } from 'lodash'

export default {
  computed: {
    self () {
      return get(this.$store.state, 'auth.user')
    },
    events () {
      return get(this.$store.state, 'events.rows')
    }
  }
}
</script>
