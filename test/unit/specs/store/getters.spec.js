import getters from '@/store/getters'

let state

describe('store.getters', () => {
  beforeEach(() => {
    state = {}
  })

  it('should be defined', () => {
    expect(getters).toBeDefined()
  })

  describe('isAuthenticated', () => {
    it('should have a isAuthenticated method', () => {
      expect(typeof getters.isAuthenticated).toEqual('function')
    })

    it('should return false if token is null', () => {
      state.token = null
      expect(getters.isAuthenticated(state)).toEqual(false)
    })

    it('should return true if token is not null', () => {
      state.token = 'abc'
      expect(getters.isAuthenticated(state)).toEqual(true)
    })

    it('should return false if token is undefined', () => {
      expect(getters.isAuthenticated(state)).toEqual(false)
    })
  })
})
