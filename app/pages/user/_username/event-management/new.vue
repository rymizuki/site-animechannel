<template lang="pug">
  div
    h5 イベントの作成
    el-form(
      ref = "form"
      :model = "form"
      label-width = "120px"
    )
      el-form-item(
        label = "title"
        prop = "title"
      )
        el-input(v-model="form.title")
      el-form-item(
        label = "description"
      )
        el-input(type="textarea" v-model="form.description")
      el-form-item(
        label = "開催候補期間",
        prop  = "candidate",
      )
        el-col(:span="11")
          el-date-picker(
            type="date"
            placeholder="選択してください"
            v-model="form.candidate.from"
            style="width: 100%;"
          )
        el-col.line(
          :span="2",
          style="text-align: center;"
        ) 〜
        el-col(:span="11")
          el-date-picker(
            type="date"
            placeholder="選択してください"
            v-model="form.candidate.to"
            style="width: 100%;"
          )
      el-form-item(
        label = "休日を含む"
      )
        el-switch(v-model="form.holiday")
      el-form-item(
        label = "お店"
      )
        el-input(v-model="form.place")
      el-form-item()
        el-button(
          type="primary"
          @click="onSubmit"
        ) 登録
</template>

<script lang="ts">
export default {
  data () {
    return {
      form: {
        title: null,
        description: null,
        candidate: {
          from: null,
          to: null,
        },
        holiday: false,
        place: null,
      }
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('events/register', this.form)
        .then(() => {
          return this.$router.push('user-username-event-management')
        })
    }
  }
}
</script>

