import CreateMessage from '@/components/CreateMessage/CreateMessage'
import store from '@/store'
import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'

describe('CreateMessage', () => {
  beforeEach(() => {
    spyOn(store, 'dispatch')
    spyOn(router, 'push')
  })

  describe('component', () => {
    it('should have a name create-message', () => {
      expect(CreateMessage.name).toEqual('create-message')
    })
  })

  describe('methods', () => {
    it('should call store.dispatch to create message when save is called', () => {
      let message = {}
      message.author = 'tester'
      CreateMessage.methods.createMessage(message)
      expect(store.dispatch).toHaveBeenCalledWith('createMessage', message)
    })

    it('should call the router when the method cancelMessage is called', () => {
      CreateMessage.methods.cancelMessage()
      expect(router.push).toHaveBeenCalledWith({ path: '/' })
    })

    it('should call store.dispatch to get message when getMessage is called', () => {
      CreateMessage.methods.getMessage('123')
      expect(store.dispatch).toHaveBeenCalledWith('getMessage', '123')
    })

    it('on mounted should call the getMessage method with the messageId', () => {
      function getComp (Component, propsData) {
        let CreateMessage = Vue.extend(Component)
        return new CreateMessage({
          propsData: {
            messageId: 123
          },
          store: new Vuex.Store({ state: jasmine.createSpy() })
        })
      }
      let comp = getComp(CreateMessage, { messageId: 123 })
      spyOn(comp, 'getMessage')
      comp.$mount()
      expect(comp.getMessage).toHaveBeenCalled()
      expect(comp.getMessage).toHaveBeenCalledWith(123)
    })
  })
})

