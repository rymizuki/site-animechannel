<template lang="pug">
  el-container()
    el-main
      el-row()
        el-col(:span="24")
          div(style="margin-top: 200px; height: 200px; line-height: 200px; text-align: center")
            h1() あにめちゃんねる
      el-row(type="flex", justify="center")
        el-col(:span="3", style="text-align: center")
          el-button(type="primary", @click="signup") Sign-up
        el-col(:span="3", style="text-align: center")
          el-button(type="primary", plain, @click="signin") Sign-in
    el-footer
      p(style="text-align: center")
        small &copy; 2018 animeshi.ry-m.com
</template>

<script>

export default {
  layout: 'empty',
  components: {
  }
}
</script>
