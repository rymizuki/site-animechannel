<template lang="pug">
  div
    h3 イベント管理
    b-row
      b-col(cols="2")
        el-menu(
          :default-active="currentIndex"
        )
          el-menu-item(
            index="user-username-event-management"
            @click="show('user-username-event-management')"
          )
            i.el-icon-date
            span 一覧
          el-menu-item(
            index="user-username-event-management-new"
            @click="show('user-username-event-management-new')"
          )
            i.el-icon-plus
            span 作成
      b-col()
        nuxt-child
</template>

<script lang="ts">
export default {
  fetch ({ store }) {
    return store.dispatch('events/fetch')
  },
  computed: {
    currentIndex () {
      return this.$route.name
    },
    self () {
      return this.$store.state.auth.user
    },
    events () {
      return this.$store.state.events.rows
    }
  },
  methods: {
    show (name) {
      this.$router.push({
        name,
        params: {
          username: this.self.username,
        }
      })
    }
  }
}
</script>

