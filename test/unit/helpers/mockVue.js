import Vue from 'vue'

Vue.http = {
  get: jasmine.createSpy('get'),
  interceptors: {
    push: jasmine.createSpy('push')
  },
  post: jasmine.createSpy('post'),
  put: jasmine.createSpy('put')
}

export default Vue
