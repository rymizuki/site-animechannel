<template lang="pug">
  b-container(v-if="event")
    h3 {{event.title}}
    hr
    nuxt-child
</template>

<script lang="ts">
export default {
  fetch ({ store, params }) {
    return store.dispatch('event/fetch', { id: params.id })
  },
  data () {
    return {
    }
  },
  computed: {
    event () {
      return this.$store.state.event
    }
  },
  methods: {
  }
}
</script>
