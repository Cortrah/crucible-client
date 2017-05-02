import Vue from 'vue'
import Router from 'vue-router'
import Monitor from '@/components/Monitor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Monitor',
      component: Monitor
    }
  ]
})
