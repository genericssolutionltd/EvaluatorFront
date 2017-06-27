import Vue from 'vue'
import Router from 'vue-router'
import WorkingPanel from '@/components/WorkingPanel/WorkingPanel'
import CreateMessage from '@/components/CreateMessage/CreateMessage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WorkingPanel',
      component: WorkingPanel
    },
    {
      path: '/message/new',
      name: 'CreateMessage',
      component: CreateMessage
    },
    {
      path: '/message/:messageId',
      name: 'CreateMessage',
      component: CreateMessage,
      props: true
    }
  ]
})
