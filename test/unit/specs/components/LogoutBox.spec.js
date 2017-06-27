// import Vue from 'vue'
import LogoutBox from '@/components/LogoutBox/LogoutBox'
import store from '@/store'

let mockStoreDispatch

describe('LogoutBox.vue', () => {
  beforeEach(() => {
    mockStoreDispatch = spyOn(store, 'dispatch')
  })

  describe('logout', () => {
    it('should have a logout method', () => {
      expect(typeof LogoutBox.methods.logout).toEqual('function')
    })

    it('should dispatch the logout action', () => {
      LogoutBox.methods.logout()
      expect(mockStoreDispatch).toHaveBeenCalledWith('logout')
    })
  })
})
