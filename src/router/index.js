import Vue from 'vue'
import Router from 'vue-router'
import Crucible from '@/components/Crucible'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Crucible',
      component: Crucible
    }
  ]
})
