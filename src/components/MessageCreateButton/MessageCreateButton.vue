<template>
  <div class="btn-container">
    <button class="btn btn-primary" v-on:click="createMessage()">Create Message</button>
  </div>
</template>

<script>
import router from '../../router'
export default {
  name: 'message-create',
  methods: {
    createMessage () {
      router.push({ path: '/message/new' })
    }
  }
}
</script>

<style scoped>
.btn-container {
  margin: 0 auto;
}

.btn {
  margin: 20px;
  height: 50px;
  padding: 0px 50px;
}
</style>
