import AuthenticationContext from 'adal-angular'

window.Logging.level = 3
window.Logging.log = window.console.log

/* eslint-disable no-unused-vars */
const authContext = new AuthenticationContext({
  clientId: process.env.AD_RESOURCE,
  cacheLocation: process.env.AD_LOCATION
})

authContext.handleWindowCallback()

export default authContext
