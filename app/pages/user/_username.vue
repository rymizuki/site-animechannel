<template lang="pug">
  nuxt-child
</template>

<script lang="ts">
import { get } from 'lodash'
export default {
  fetch ({ store, redirect, route }) {
    return store.dispatch('login')
      .then(() => {
        const permissions = get(store.state, 'auth.permissions')

        // permissionがない場合は仮登録扱い
        if (permissions.length == 0) {
          redirect('/signup')
        }

        // 前に見ようとしてたページがあるならredirect
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
