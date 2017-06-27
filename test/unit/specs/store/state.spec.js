import state from '@/store/state'

describe('store.state', () => {
  it('should be defined', () => {
    expect(state).toBeDefined()
  })

  it('should have an empty user object', () => {
    expect(state.user).toEqual({})
  })

  it('should have a null token', () => {
    expect(state.token).toEqual(null)
  })

  it('should have an empty messages', () => {
    expect(state.messages.length).toEqual(0)
  })

  it('should have an empty currentMessage', () => {
    expect(state.currentMessage).toEqual({})
  })
})
