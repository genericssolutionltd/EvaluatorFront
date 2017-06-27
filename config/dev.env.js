var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CMS_ENDPOINT: '"http://dev-uks-cms.azurewebsites.net/"'
})
