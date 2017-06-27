// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import Setup from './setup'
import VTooltip from 'v-tooltip'

Vue.use(VueResource)
Vue.use(VTooltip)

store.dispatch('getToken')
store.dispatch('getUser')

if (!store.getters.isAuthenticated) {
  store.dispatch('login')
}

Vue.config.productionTip = false

Setup()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
