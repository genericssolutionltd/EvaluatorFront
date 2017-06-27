<template>
  <nav class="navbar navbar-toggleable-md navbar-inverse bg-aquamarine">
    <a class="navbar-brand mr-auto" href="#/">SimplyContent</a>
    <logout-box></logout-box>
  </nav>
</template>

<script>
import LogoutBox from '../LogoutBox/LogoutBox'

export default {
  name: 'top-bar',
  components: {
    LogoutBox
  }
}
</script>

<style scoped>
  .bg-aquamarine {
    background-color: #00576D
  }
</style>
