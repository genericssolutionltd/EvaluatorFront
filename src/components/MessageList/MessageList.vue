<template>
  <div class="message-list">
    <div class="list-group list-group-flush">
      <div v-for="message in messages" class="list-group-item list-group-item-action flex-column align-items-start">
        <message-item :message="message"></message-item>
      </div>
    </div>
  </div>
</template>

<script>
import MessageItem from '../MessageItem/MessageItem'
import store from '../../store'
import Vuex from 'vuex'

export default {
  name: 'message-list',
  components: {
    MessageItem
  },
  mounted: () => {
    store.dispatch('getMessages')
  },
  computed: Vuex.mapState([
    'messages'
  ])
}
</script>

<style scoped>
.message-list {
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  border: none;
}

.list-group-item {
  background-color: #f7f7f7;
}

.list-group-item:hover {
  background-color: #A5DBDB;
}
</style>
