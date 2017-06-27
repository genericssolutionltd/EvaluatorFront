import component from '@/components/MessageItem/MessageItem'
import store from '@/store'
import router from '@/router'

describe('MessageItem', () => {
  beforeEach(() => {
    spyOn(store, 'dispatch')
    spyOn(router, 'push')
  })

  describe('properties', () => {
    it('should have a name', () => {
      expect(component.name).toEqual('message-item')
    })
    it('should have have a prop of message', () => {
      expect(component.props).toContain('message')
    })
  })

  describe('methods', () => {
    it('should have an editMessage method', () => {
      component.methods.editMessage()
      expect(typeof component.methods.editMessage).toEqual('function')
    })
    it('should call the router push when the method is called', () => {
      let messageid = 'id'
      component.methods.editMessage(messageid)
      expect(router.push).toHaveBeenCalledWith({ path: '/message/' + messageid })
    })
  })
})
