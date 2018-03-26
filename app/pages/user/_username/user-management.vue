<template lang="pug">
  div
    h3 ユーザ管理
</template>

<script lang="ts">
export default {
  fetch ({ store }) {
    return store.dispatch('users/fetch')
  },
  computed: {
    users () {
      return this.$store.state.users.rows
    }
  }
}
</script>

