<template lang="pug">
  div
    b-row()
      b-col()
        div(style="margin-top: 200px; height: 200px; text-align: center")
          h1() あにめちゃんねる
          p アニメについて語らうプライベートコミュニティ
    b-row(align-h="center", style="margin-bottom: 20px")
      b-col.text-center(cols="3")
        el-button(type="primary", @click="signup") Twitterで利用登録
      b-col.text-center(cols="3")
        el-button(type="primary", plain, @click="signup") Twitterでログイン
    b-row()
      b-col.text-center
        p
          small ※利用登録には管理者の承認が必要です。
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
