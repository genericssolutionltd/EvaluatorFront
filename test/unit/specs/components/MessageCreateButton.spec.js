import MessageCreateButton from '@/components/MessageCreateButton/MessageCreateButton'
import router from '@/router'

describe('MessageCreateButton.vue', () => {
  beforeEach(() => {
    spyOn(router, 'push')
  })

  describe('createMessage', () => {
    it('should have a createMessage method', () => {
      expect(typeof MessageCreateButton.methods.createMessage).toEqual('function')
    })

    it('should call the router when the method createMessage is called', () => {
      MessageCreateButton.methods.createMessage()
      expect(router.push).toHaveBeenCalledWith({ path: '/message/new' })
    })
  })
})
