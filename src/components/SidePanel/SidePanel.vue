<template>
  <div class="side-panel flex-column">
    <message-list></message-list>
    <message-create></message-create>
  </div>
</template>

<script>
import MessageList from '../MessageList/MessageList'
import MessageCreate from '../MessageCreateButton/MessageCreateButton'
export default {
  name: 'side-panel',
  components: {
    MessageList,
    MessageCreate
  }
}
</script>

<style scoped>
.side-panel {
  display: flex;
  flex: 1;
}
</style>
