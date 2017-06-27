import AuthenticationContext from 'adal-angular'
import authContext from '@/authentication'

describe('authentication', () => {
  it('should be defined', () => {
    expect(authContext).toBeDefined()
  })

  it('should return an instance of AuthenticationContext', () => {
    expect(authContext).toEqual(jasmine.any(AuthenticationContext))
  })
})
