<template lang="pug">
  div
    calendar(:date-contents="dateContents")
</template>

<script lang="ts">
import { get } from 'lodash'
import Calendar from '~/components/calendar'

export default {
  components: {
    Calendar,
  },
  data () {
    return {
    }
  },
  computed: {
    event () {
      return this.$store.state.event
    },
    dateContents () {
      return []
    }
  },
  methods: {
    get (object, key) {
      return get(object, key)
    }
  }

}
</script>

<style scoped>
.row {
  margin-top: 12px;
}
</style>

