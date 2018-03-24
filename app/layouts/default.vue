<template lang="pug">
  el-container()
    el-header()
      b-navbar(toggleable="md")
        b-navbar-toggle(target="nav_collapse")
        b-navbar-brand(to="dashboard") あにめちゃんねる
        b-collapse#nav_collapse(is-nav)
          b-navbar-nav
            b-nav-item(to="dashboard") Dashboard
            b-nav-item(to="events") Events
          b-navbar-nav.ml-auto()
            b-nav-item-dropdown(right)
              template(slot="button-content")
                em() User
              b-dropdown-item(@click="signout") singout
    el-main
      nuxt
    el-footer()
      p(style="text-align: center; font-size: 12px;")
        small() &copy; 2017 animeshi.ry-m.com
</template>

<style>
</style>

<script>
export default {
  methods: {
    signout () {
      console.log('signout ')
    }
  }
}
</script>

