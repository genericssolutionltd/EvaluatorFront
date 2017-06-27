import component from '@/components/MessageList/MessageList'
import store from '@/store'
import Vuex from 'vuex'

describe('MessageList', () => {
  beforeEach(() => {
    spyOn(store, 'dispatch')
    spyOn(Vuex, 'mapState').and.returnValue('test')
  })

  describe('properties', () => {
    it('should have a name', () => {
      expect(component.name).toEqual('message-list')
    })
    it('should call mapState to for the messages when the computed method is called', () => {
      expect(component.computed).toBeDefined()
    })
  })

  describe('methods', () => {
    it('should call the store dispatch to get message list on mounted', () => {
      component.mounted()
      expect(store.dispatch).toHaveBeenCalledWith('getMessages')
    })
  })
})
