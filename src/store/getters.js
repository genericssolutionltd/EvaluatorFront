const getters = {
  isAuthenticated (state) {
    return !(state.token === undefined || state.token === null)
  }
}

export default getters
