import Vue from 'vue'
import Router from 'vue-router'
import Crucible from '@/components/Crucible'
import VueProgress from 'vue-progress'

Vue.use(Router);
Vue.use(VueProgress)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Crucible',
      component: Crucible
    }
  ]
})
