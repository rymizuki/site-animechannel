<template lang="pug">
  div
    b-row.row(v-for="(label, index) in labels", :key="index")
      b-col(cols="2") <i>{{label.name}}</i>
      b-col() {{get(event, label.key) || '未定'}}
    b-row.row()
      b-col(cols="2") <i>参加者</i>
      b-col()
        p {{event.participants.length}}人
</template>

<script lang="ts">
import { get } from 'lodash'

export default {
  data () {
    return {
      labels: [
        { name: '概要', key: 'description' },
        { name: '開催', key: 'date' },
        { name: '受付', key: 'state.name' },
        { name: '会場', key: 'place' },
      ]
    }
  },
  computed: {
    event () {
      return this.$store.state.event
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

