<template lang="pug">
  div
    div(v-if="event.isAccepting")
      div.text-center
        el-button(type="primary", @click="joinus") 参加登録
    hr
    el-tabs(
      type="border-card",
      @tab-click="show"
    )
      el-tab-pane(
        v-for="menu in menus",
        :key="menu.key",
        :label="menu.label",
      )
        nuxt-child
</template>

<script lang="ts">
export default {
  data () {
    return {
      menus: [
        { label: '概要', key: 'information', pathname: 'events-id-information' },
        { label: '予定', key: 'acceptign', pathname: 'events-id-information-schedule' },
        // { label: 'レポート', key: 'report', pathname: 'events-id-report' },
      ]
    }
  },
  computed: {
    event () {
      return this.$store.state.event
    }
  },
  methods: {
    show (vm) {
      const menu = this.menus[vm.index]
      this.$router.push({ name: menu.pathname, params: { id: this.$route.params.id } })
    },
    joinus () {
      this.$router.push({ name: 'events-id-join', params: { id: this.$route.params.id } })
    }
  }
}
</script>
