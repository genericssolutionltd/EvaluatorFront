import router from '@/router'
import Router from 'vue-router'

describe('router', () => {
  it('should be defined', () => {
    expect(router).toBeDefined()
  })

  it('should return an instance of Router', () => {
    expect(router).toEqual(jasmine.any(Router))
  })
})
