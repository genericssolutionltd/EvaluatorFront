import setup from '@/setup'
import Vue from '../helpers/mockVue'
import authContext from '@/authentication'

describe('setup tests', () => {
  let mockAcquireToken
  let mockNext
  let mockRequest

  beforeEach(() => {
    mockAcquireToken = spyOn(authContext, 'acquireToken')
    mockNext = jasmine.createSpy('mockNext')
    mockRequest = {
      headers: {
        set: jasmine.createSpy('set')
      }
    }
    Vue.http.interceptors.push.and.callFake(callback => callback(mockRequest, mockNext))
  })

  describe('setup', () => {
    it('should call the Vue.http.interceptors method when the function is called', () => {
      setup()
      expect(Vue.http.interceptors.push).toHaveBeenCalled()
    })

    it('should call the next method if errors from aquire token', () => {
      mockAcquireToken.and.callFake((resource, callback) => callback(true, '123'))
      setup()
      expect(mockNext).toHaveBeenCalled()
    })

    it('should check that the set property on the request header map is called', () => {
      mockAcquireToken.and.callFake((resource, callback) => callback(false, '123'))
      setup()
      expect(mockRequest.headers.set).toHaveBeenCalled()
    })

    it('should set the headers if no errors are returned', () => {
      mockRequest.headers = new Map()
      mockAcquireToken.and.callFake((resource, callback) => callback(false, '123'))
      setup()
      expect(mockRequest.headers.get('Authorization')).toEqual('Bearer 123')
    })
  })
})
