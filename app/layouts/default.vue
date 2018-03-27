<template lang="pug">
  el-container()
    el-header()
      b-navbar(toggleable="md")
        b-navbar-toggle(target="nav_collapse")
        b-navbar-brand(to="/") あにめちゃんねる
        b-collapse#nav_collapse(is-nav)
          b-navbar-nav(v-if="user")
            b-nav-item(:to="{ name: 'user-username', params: { username: user.username } }") Dashboard
            b-nav-item(:to="{ name: 'user-username-events', params: { username: user.username } }") Events
          b-navbar-nav.ml-auto()
            b-nav-item-dropdown(right v-if="user")
              template(slot="button-content")
                em() {{user.username}}
              b-dropdown-item(
                v-for="menu in userMenus",
                :key="menu.routeName",
                :to="{name: menu.routeName, params: {username: user.username}}"
              ) {{menu.label}}
              b-dropdown-item(@click="signout") ログアウト
    el-main
      nuxt
    el-footer()
      p(style="text-align: center; font-size: 12px;")
        small() &copy; 2017 animeshi.ry-m.com
</template>

<style>
</style>

<script>
import { chain } from 'lodash'

export default {
  computed: {
    auth () {
      return this.$store.state.auth
    },
    user () {
      return this.auth && this.auth.user
    },
    permissions () {
      return this.auth && this.auth.permissions
    },
    userMenus () {
      const labels = {
        user_management: 'ユーザ管理',
        event_management: 'イベント管理',
      }
      const menus = chain(this.permissions)
        .filter(({ name }) => {
          return labels[name]
        })
        .map(({ name }) => {
          return {
            label: labels[name],
            routeName: `user-username-${ name.replace(/_/g, '-') }`
          }
        })
        .value()
      return menus
    }
  },
  methods: {
    signout () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>

