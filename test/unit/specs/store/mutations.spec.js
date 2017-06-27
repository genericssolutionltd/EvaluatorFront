import mutations from '@/store/mutations'

let state

describe('store.mutations', () => {
  beforeEach(() => {
    state = {}
  })

  it('should be defined', () => {
    expect(mutations).toBeDefined()
  })

  describe('setUser', () => {
    it('should have a setUser method', () => {
      expect(typeof mutations.setUser).toEqual('function')
    })

    it('should set state.user to user', () => {
      mutations.setUser(state, 'user')
      expect(state.user).toEqual('user')
    })
  })

  describe('setToken', () => {
    it('should have a setToken method', () => {
      expect(typeof mutations.setToken).toEqual('function')
    })

    it('should set state.token to token', () => {
      mutations.setToken(state, 'token')
      expect(state.token).toEqual('token')
    })
  })

  describe('messages', () => {
    it('should have a setMessages method', () => {
      expect(typeof mutations.setMessages).toEqual('function')
    })

    it('should set state.messages to messages', () => {
      mutations.setMessages(state, 'messages')
      expect(state.messages).toEqual('messages')
    })

    it('should push state.messages to messages', () => {
      state.messages = []
      mutations.pushMessage(state, 'message')
      expect(state.messages).toEqual(['message'])
    })
  })

  describe('setCurrentMessage', () => {
    it('should have a setCurrentMessage method', () => {
      expect(typeof mutations.setCurrentMessage).toEqual('function')
    })

    it('should set state.currentMessage to message', () => {
      mutations.setCurrentMessage(state, 'message')
      expect(state.currentMessage).toEqual('message')
    })
  })
  describe('resetCurrentMessage', () => {
    it('should have a resetCurrentMessage method', () => {
      expect(typeof mutations.resetCurrentMessage).toEqual('function')
    })

    it('should set state.currentMessage to empty object', () => {
      mutations.resetCurrentMessage(state, {})
      expect(state.currentMessage).toEqual({})
    })
  })
})
