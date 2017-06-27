import Vue from 'vue'
import authContext from './authentication'

const setupInterceptors = () => {
  Vue.http.interceptors.push(function (request, next) {
    authContext.acquireToken(authContext.config.loginResource, (err, token) => {
      if (!err) {
        let tokenText = 'Bearer ' + token
        request.headers.set('Authorization', tokenText)
      }
      next()
    })
  })
}

export default setupInterceptors
