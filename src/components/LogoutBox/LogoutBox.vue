<template>
  <div>
    <button class="btn btn-sm btn-outline-secondary" v-on:click="logout">Logout</button>
  </div>
</template>

<script>
import store from '../../store'

export default {
  name: 'logout-box',
  methods: {
    logout () {
      store.dispatch('logout')
    }
  }
}
</script>

<style>

</style>
