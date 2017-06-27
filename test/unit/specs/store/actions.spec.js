import actions from '@/store/actions'
import authContext from '@/authentication'
import Vue from '../../helpers/mockVue'
import messages from '../../helpers/messages'
import store from '@/store'

describe('action tests', () => {
  let mockAcquireToken
  let mockGetUser
  let mockLogin
  let mockLogOut
  let mockCommit
  let mockLocalStorageClear
  beforeEach(() => {
    mockAcquireToken = spyOn(authContext, 'acquireToken')
    mockGetUser = spyOn(authContext, 'getUser')
    mockLogin = spyOn(authContext, 'login')
    mockLogOut = spyOn(authContext, 'logOut')
    mockLocalStorageClear = spyOn(localStorage, 'clear')
    mockCommit = jasmine.createSpy()
    spyOn(store, 'dispatch')
  })

  afterEach(() => {
    Vue.http.get.and.callThrough()
  })

  describe('store.actions', () => {
    it('should be defined', () => {
      expect(actions).toBeDefined()
    })

    describe('getToken', () => {
      it('should have a getToken method', () => {
        expect(typeof actions.getToken).toEqual('function')
      })

      it('should call the acquireToken method', () => {
        mockAcquireToken.and.callFake((resource, callback) => callback(null, '123'))
        actions.getToken({ commit: mockCommit })
        expect(mockAcquireToken).toHaveBeenCalled()
      })

      it('should commit setToken', () => {
        mockAcquireToken.and.callFake((resource, callback) => callback(null, '123'))
        actions.getToken({ commit: mockCommit })
        expect(mockCommit).toHaveBeenCalledWith('setToken', '123')
      })

      it('should not commit setToken if err thrown', () => {
        mockAcquireToken.and.callFake((resource, callback) => callback(true, null))
        actions.getToken({ commit: mockCommit })
        expect(mockCommit).not.toHaveBeenCalled()
      })
    })

    describe('getUser', () => {
      it('should have a getUser method', () => {
        expect(typeof actions.getUser).toEqual('function')
      })

      it('should call the getUser method', () => {
        mockGetUser.and.callFake((callback) => callback(null, { profile: 'user' }))
        actions.getUser({ commit: mockCommit })
        expect(mockGetUser).toHaveBeenCalled()
      })

      it('should commit setUser', () => {
        mockGetUser.and.callFake((callback) => callback(null, { profile: 'user' }))
        actions.getUser({ commit: mockCommit })
        expect(mockCommit).toHaveBeenCalledWith('setUser', 'user')
      })

      it('should not commit setUser if err thrown', () => {
        mockGetUser.and.callFake((callback) => callback(true, null))
        actions.getUser({ commit: mockCommit })
        expect(mockCommit).not.toHaveBeenCalled()
      })
    })

    describe('login', () => {
      it('should have a login method', () => {
        expect(typeof actions.login).toEqual('function')
      })

      it('should call the login method', () => {
        actions.login({ commit: mockCommit })
        expect(mockLogin).toHaveBeenCalled()
      })
    })

    describe('logout', () => {
      it('should have a logout method', () => {
        expect(typeof actions.logout).toEqual('function')
      })

      it('should call the logout method', () => {
        actions.logout({ commit: mockCommit })
        expect(mockLogOut).toHaveBeenCalled()
      })

      it('should call clear localStorage', () => {
        actions.logout({ commit: mockCommit })
        expect(mockLocalStorageClear).toHaveBeenCalled()
      })

      it('should commit setUser', () => {
        actions.logout({ commit: mockCommit })
        expect(mockCommit).toHaveBeenCalledWith('setUser', null)
      })

      it('should commit setToken', () => {
        actions.logout({ commit: mockCommit })
        expect(mockCommit).toHaveBeenCalledWith('setToken', null)
      })
    })

    describe('createMessage', () => {
      it('should have a create Message method', () => {
        expect(typeof actions.createMessage).toEqual('function')
      })

      it('should call the Vue.http.post when the create message is called', () => {
        let myPromise = new Promise((resolve, reject) => { })
        Vue.http.post.and.returnValue(myPromise)
        let testUrl = 'http://dev-uks-cms.azurewebsites.net/'
        let myMessage = {
          title: 'title',
          description: 'description',
          author: 'author',
          tags: ['a tag'],
          status: 'status'
        }
        actions.createMessage({ commit: mockCommit }, myMessage)
        expect(Vue.http.post).toHaveBeenCalledWith(testUrl + '/manage/message', myMessage)
      })

      it('should call pushMessage if the promise resolves with a status of 200', (done) => {
        let myMessage = {
          title: 'title',
          description: 'description',
          author: 'author',
          tags: ['a tag'],
          status: 'status'
        }
        let response = {
          status: 200,
          body: 'my response'
        }
        let myPromise = Promise.resolve(response)
        Vue.http.post.and.returnValue(myPromise)
        actions.createMessage({ commit: mockCommit }, myMessage)
        myPromise.then(() => {
          expect(mockCommit).toHaveBeenCalledWith('pushMessage', response.body)
          done()
        }).catch(e => {
          done.fail(e)
        })
      })

      it('should call pushMessage if the promise resolves with a status of 201', (done) => {
        let myMessage = {
          title: 'title',
          description: 'description',
          author: 'author',
          tags: ['a tag'],
          status: 'status'
        }
        let response = {
          status: 201,
          body: 'my response'
        }
        let myPromise = Promise.resolve(response)
        Vue.http.post.and.returnValue(myPromise)
        actions.createMessage({ commit: mockCommit }, myMessage)
        myPromise.then(() => {
          expect(mockCommit).toHaveBeenCalledWith('pushMessage', response.body)
          done()
        }).catch(e => {
          done.fail(e)
        })
      })

      it('should handle errors if promise fails', (done) => {
        let myMessage = {
          title: 'title',
          description: 'description',
          author: 'author',
          tags: ['a tag'],
          status: 'status'
        }
        let myPromise = Promise.reject('error')
        Vue.http.post.and.returnValue(myPromise)
        actions.createMessage({ commit: mockCommit }, myMessage)
        myPromise.then(() => { }).catch(e => {
          // TODO need to decide how to handle errors and write tests for them
          done()
        })
      })

      it('should not call pushMessage if the promise resolves with a status of 500', (done) => {
        let myMessage = {
          title: 'title',
          description: 'description',
          author: 'author',
          tags: ['a tag'],
          status: 'status'
        }
        let response = {
          status: 500,
          body: 'my response'
        }
        let myPromise = Promise.resolve(response)
        Vue.http.post.and.returnValue(myPromise)
        actions.createMessage({ commit: mockCommit }, myMessage)
        myPromise.then(() => {
          expect(mockCommit).not.toHaveBeenCalledWith('pushMessage', response.body)
          done()
        }).catch(e => {
          done.fail(e)
        })
      })
    })

    describe('editMessage using createMessage button', () => {
      it('should call the Vue.http.put when the create message is called with a defined messageid', () => {
        let myPromise = new Promise((resolve, reject) => { })
        Vue.http.put.and.returnValue(myPromise)
        // let testUrl = 'http://dev-uks-cms.azurewebsites.net/manage/message'
        let myMessage = {
          _id: '123',
          title: 'title',
          description: 'description',
          author: 'author',
          tags: ['a tag'],
          status: 'status'
        }
        actions.createMessage({ commit: mockCommit }, myMessage)
        // expect(Vue.http.put).toHaveBeenCalledWith(testUrl + '/123', myMessage)
        expect(Vue.http.put).toHaveBeenCalled()
      })

      it('should call getMessage if the promise resolves with a status of 200 after update', (done) => {
        spyOn(actions, 'getMessages')
        let myMessage = {
          _id: '123',
          title: 'title',
          description: 'description',
          author: 'author',
          tags: ['a tag'],
          status: 'status'
        }
        let response = {
          status: 200,
          body: 'my response'
        }
        let myPromise = Promise.resolve(response)
        Vue.http.put.and.returnValue(myPromise)
        actions.createMessage({ commit: mockCommit }, myMessage)
        myPromise.then(() => {
          expect(actions.getMessages).toHaveBeenCalled()
          done()
        }).catch(e => {
          done.fail(e)
        })
      })

      it('should call pushMessage if the promise resolves with a status of 201', (done) => {
        spyOn(actions, 'getMessages')
        let myMessage = {
          _id: '123',
          title: 'title',
          description: 'description',
          author: 'author',
          tags: ['a tag'],
          status: 'status'
        }
        let response = {
          status: 201,
          body: 'my response'
        }
        let myPromise = Promise.resolve(response)
        Vue.http.put.and.returnValue(myPromise)
        actions.createMessage({ commit: mockCommit }, myMessage)
        myPromise.then(() => {
          expect(actions.getMessages).toHaveBeenCalled()
          done()
        }).catch(e => {
          done.fail(e)
        })
      })

      it('should handle errors if promise fails', (done) => {
        let myMessage = {
          _id: '123',
          title: 'title',
          description: 'description',
          author: 'author',
          tags: ['a tag'],
          status: 'status'
        }
        let myPromise = Promise.reject('error')
        Vue.http.put.and.returnValue(myPromise)
        actions.createMessage({ commit: mockCommit }, myMessage)
        myPromise.then(() => { }).catch(e => {
          done()
        })
      })

      it('should not call pushMessage if the promise resolves with a status of 500', (done) => {
        let myMessage = {
          _id: '123',
          title: 'title',
          description: 'description',
          author: 'author',
          tags: ['a tag'],
          status: 'status'
        }
        let response = {
          status: 500,
          body: 'my response'
        }
        let myPromise = Promise.resolve(response)
        Vue.http.put.and.returnValue(myPromise)
        actions.createMessage({ commit: mockCommit }, myMessage)
        myPromise.then(() => {
          expect(mockCommit).not.toHaveBeenCalledWith('setCurrentMessage', response.body)
          done()
        }).catch(e => {
          done.fail(e)
        })
      })
    })
    describe('getMessages', () => {
      it('should have a getMessages method', () => {
        expect(typeof actions.getMessages).toEqual('function')
      })

      it('should call the http get when getMessages is called', () => {
        let myPromise = new Promise(function (resolve, reject) {
          resolve()
        })
        Vue.http.get.and.returnValue(myPromise)
        actions.getMessages({ commit: mockCommit })
        expect(Vue.http.get).toHaveBeenCalled()
      })

      it('should call the commit setMessages when the http promise reolves', (done) => {
        let messages = {
          body: ['one', 'two']
        }
        let myPromise = Promise.resolve(messages)
        Vue.http.get.and.returnValue(myPromise)
        actions.getMessages({ commit: mockCommit })
        myPromise.then(() => {
          expect(mockCommit).toHaveBeenCalledWith('setMessages', messages.body)
          done()
        })
      })
    })

    describe('getMessage', () => {
      it('should have a getMessage method', () => {
        expect(typeof actions.getMessage).toEqual('function')
      })

      it('should return a promise', () => {
        let promise = Promise.resolve({ body: messages[0] })
        Vue.http.get.and.returnValue(promise)
        expect(actions.getMessage({ commit: mockCommit }, '123')).toEqual(jasmine.any(Promise))
      })

      it('should call Vue.http.get to fetch the message', (done) => {
        let promise = Promise.resolve({ body: messages[0] })
        Vue.http.get.and.returnValue(promise)
        actions.getMessage({ commit: mockCommit }, '123')
        promise.then(() => {
          expect(Vue.http.get).toHaveBeenCalled()
          done()
        })
      })

      it('should call the commit setCurrentMessage with the message', (done) => {
        let promise = Promise.resolve({ body: messages[0] })
        Vue.http.get.and.returnValue(promise)
        actions.getMessage({ commit: mockCommit }, '123')
        promise.then(() => {
          expect(mockCommit).toHaveBeenCalledWith('setCurrentMessage', messages[0])
          done()
        })
      })

      it('should call the commit resetCurrentMessage when messageid is undefined', (done) => {
        let promise = Promise.resolve({ body: messages[0] })
        Vue.http.get.and.returnValue(promise)
        actions.getMessage({ commit: mockCommit }, undefined)
        promise.then(() => {
          expect(mockCommit).toHaveBeenCalledWith('resetCurrentMessage', {})
          done()
        })
      })

      it('should not return an array but object when the http promise resolves', (done) => {
        let message = {
          body: {}
        }
        let myPromise = Promise.resolve(message)
        Vue.http.get.and.returnValue(myPromise)
        actions.getMessage({ commit: mockCommit }, 'id')
        myPromise.then((response) => {
          expect(response.body).toEqual(Object({}))
          done()
        })
      })
    })
  })
})
