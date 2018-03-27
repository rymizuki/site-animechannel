<template lang="pug">
  div
    h3 ユーザ管理
    div(v-if="users")
      el-table(
        :data="users"
      )
        el-table-column(
          prop  = "screen_id"
          label = "ID"
        )
        el-table-column(
          prop  = "screen_name"
          label = "表示名"
        )
        el-table-column(
          label = "状態"
        )
          template(slot-scope="scope")
            b-badge(v-if="!scope.row.permissions.length", variant="danger") 未登録
            b-badge(v-if=" scope.row.permissions.length", variant="success") 登録済
        el-table-column(
          label = "権限"
        )
          template(slot-scope="scope")
            el-button(
              type="text",
              size="small",
              @click="showPermissions(scope.row)"
            ) 表示
    nuxt-child
</template>

<script lang="ts">
export default {
  fetch ({ store }) {
    return store.dispatch('users/fetch')
  },
  computed: {
    self ()  {
      return this.$store.state.auth.user
    },
    users () {
      return this.$store.state.users.rows
    }
  },
  methods: {
    showPermissions (user) {
      console.log(user)
      this.$router.push({
        name: 'user-username-user-management-screen_id-permissions',
        params: {
          username: this.self.username,
          screen_id: user.screen_id,
        }
      })
    }
  }
}
</script>

