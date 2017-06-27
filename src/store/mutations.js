const mutations = {
  setUser (state, user) {
    state.user = user
  },

  setToken (state, token) {
    state.token = token
  },

  setMessages (state, messages) {
    state.messages = messages
  },

  setCurrentMessage (state, message) {
    state.currentMessage = message
  },

  resetCurrentMessage (state, message) {
    state.currentMessage = message
  },

  pushMessage (state, message) {
    state.messages.push(message)
  }
}

export default mutations
