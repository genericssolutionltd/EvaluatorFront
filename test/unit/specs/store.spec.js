import Vuex from 'vuex'
import store from '@/store'

describe('store', () => {
  it('should be defined', () => {
    expect(store).toBeDefined()
  })

  it('should return an instance of Vuex.Store', () => {
    expect(store).toEqual(jasmine.any(Vuex.Store))
  })
})
