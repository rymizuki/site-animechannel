<template lang="pug">
  div
    el-row()
      el-col(:span="24")
        div(style="margin-top: 200px; height: 200px; line-height: 200px; text-align: center")
          h1() あにめちゃんねる
    el-row(type="flex", justify="center")
      el-col(:span="3", style="text-align: center")
        el-button(type="primary", @click="signup") Sign-up
      el-col(:span="3", style="text-align: center")
        el-button(type="primary", plain, @click="signin") Sign-in
</template>

<script>
import { get } from 'lodash'

export default {
  layout: 'empty',
  fetch({ store, redirect }) {
    if (get(store.state, 'auth.user.username')) {
      return redirect(`/user/${ store.state.auth.user.username }`)
    }
  },
  components: {
  },
  methods: {
    signup () {
      location.href = '/auth/signup'
    },
    signin () {
      this.$router.push('/dashboard')
    }
  }
}
</script>
