<template lang="pug">
  div
    el-table(
      :data = "events",
      :row-class-name="genRowClassName"
    )
      el-table-column(
        prop  = "title",
        label = "題名"
      )
      el-table-column(
        prop  = "state.name",
        label = "状態"
      )
      el-table-column(
        prop = "date"
        label = "開催日時"
      )
      el-table-column(
        prop  = "participants.length",
        label = "人数"
      )
      el-table-column(
        prop  = "place",
        label = "開催場所"
      )
      el-table-column(
        fixed = "right",
        label = "",
        width = "120",
      )
        template(slot-scope="scope")
          el-button(type="text", size="small", @click="show(scope.row)") 詳細
</template>

<script lang="ts">
export default {
  fetch ({ store }) {
    return store.dispatch('events/fetch')
  },
  computed: {
    self () {
      return this.$store.state.auth.user
    },
    events () {
      return this.$store.state.events.rows
    }
  },
  methods: {
    genRowClassName ({ row }) {
      return row && row.isFinished ? 'table-secondary' : ''
    },
    show (event) {
      this.$router.push({
        name: 'user-username-events-id-information',
        params: {
          username: this.self.username,
          id: event.id,
        }
      })
    }
  }
}
</script>

