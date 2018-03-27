<template lang="pug">
  el-dialog(
    :title = "user.screen_id + 'さんの権限'",
    :visible="true"
  )
    el-table(
      :data="permissions"
    )
      el-table-column(
        prop  = "name"
        label = "name"
      )
      el-table-column(
        label = "on/off"
      )
        template(slot-scope="scope")
          el-switch(
            v-model="inputPermission[scope.row.name]"
          )
    span 変更後は再ログインが必要です
    span.dialog-footer(slot="footer")
      el-button(@click="cancel") cancel
      el-button(type="primary", @click="save") save
</template>

<script lang="ts">
import { find } from 'lodash'

export default {
  fetch ({ store }) {
    return store.dispatch('permissions/fetch')
  },
  data () {
    return {
      inputPermission: {}
    }
  },
  computed: {
    permissions () {
      return this.$store.state.permissions.rows
    },
    user () {
      return find(this.$store.state.users.rows, { screen_id: this.$route.params.screen_id })
    }
  },
  methods: {
    back () {
      this.$router.push({
        name: 'user-username-user-management',
      })
    },
    cancel () {
      this.back()
    },
    save () {
      this.$store.dispatch('users/saveUserPermissions', {
        user:         this.user,
        permissions:  this.inputPermission,
      })
        .then(() => {
          this.back()
        })
    }
  },
  created () {
    if (!this.user) return
    if (!this.permissions || !this.permissions.length) return
    const permissions = {}
    this.permissions.forEach(({ name }) => {
      permissions[name] = !!find(this.user.permissions, { name })
    })
    this.inputPermission = permissions
  }
}
</script>

