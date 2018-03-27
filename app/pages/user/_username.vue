<template lang="pug">
  nuxt-child
</template>

<script lang="ts">
import { get } from 'lodash'
export default {
  fetch ({ store, redirect, route }) {
    return store.dispatch('login')
      .then(() => {
        const previous = window.sessionStorage && window.sessionStorage.getItem('previousPath')
        if (previous) {
          window.sessionStorage.removeItem('previousPath')
          return redirect(previous)
        }
      })
      .catch(() => {
        if (window.sessionStorage) window.sessionStorage.setItem('previousPath', route.fullPath)
        redirect('/')
      })
  }
}
</script>
