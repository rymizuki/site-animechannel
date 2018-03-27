<template lang="pug">
  div(v-if="self")
    h2 あにめちゃんねる
    h3 仮登録完了
    hr
    p ようこそあにめちゃんねるへ。
    p
      | このサイトはプライベートな集まりです。
      | 只今 {{self.username}} さんは仮登録の状態で、正式な利用のためには管理者による本登録が必要です。
      | しばらく待っても反映が行われない場合は管理者までお声がけください。
    p また、意図せず仮登録されてしまった場合は、お手数ですが以下よりご連絡ください。
    p
      el-button() お問い合わせ
      el-button(@click="logout") ログアウト
</template>

<script>
export default {
  layout: 'empty',
  fetch ({ store, redirect }) {
    return store.dispatch('login')
      .catch(() => {
        console.log('unauhtorize')
        return redirect('/')
      })
  },
  computed: {
    self () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>

