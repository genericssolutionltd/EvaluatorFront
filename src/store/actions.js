import authContext from '../authentication'
import Vue from 'vue'

const messageUrl = process.env.CMS_ENDPOINT + '/manage/message'

const actions = {
  getToken: ({ commit }) => {
    authContext.acquireToken(authContext.config.loginResource, (err, token) => {
      if (!err) {
        commit('setToken', token)
      }
    })
  },

  getUser: ({ commit }) => {
    authContext.getUser(function (err, user) {
      if (!err) {
        commit('setUser', user.profile)
      }
    })
  },

  login: ({ commit }) => {
    authContext.login()
  },

  logout: ({ commit }) => {
    // @todo reset to default state
    localStorage.clear()
    commit('setUser', null)
    commit('setToken', null)
    authContext.logOut()
  },

  createMessage: ({ commit }, message) => {
    let messageId = message._id
    if (messageId === undefined) {
      Vue.http.post(messageUrl, message).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('pushMessage', response.body)
        }
      }).catch((reason) => { })
    } else {
      Vue.http.put(`${messageUrl}/${messageId}`, message).then((response) => {
        if (response.status === 200 || response.status === 201) {
          actions.getMessages({ commit })
        }
      }).catch((reason) => { })
    }
  },

  getMessages: ({ commit }) => {
    Vue.http.get(messageUrl).then((messages) => {
      commit('setMessages', messages.body)
    }).catch((reason) => { })
  },

  getMessage: ({ commit }, id) => {
    if (id !== undefined) {
      return Vue.http.get(`${messageUrl}/${id}`).then(message => {
        commit('setCurrentMessage', message.body)
      })
    } else {
      commit('resetCurrentMessage', {})
    }
  }
}

export default actions
