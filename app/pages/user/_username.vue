<template lang="pug">
  nuxt-child
</template>

<script lang="ts">
import { get } from 'lodash'
export default {
  fetch ({ store, redirect }) {
    return store.dispatch('login')
      .then(() => {
        if (!get(store.state, 'auth.user.username')) {
          redirect('/')
        }
      })
  }
}
</script>
