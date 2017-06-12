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
        },
        {
            path: '/',
            name: 'Crucible',
            component: Crucible
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/lobby',
            name: 'Lobby',
            component: Lobby
        },
        {
            path: '/tabletop',
            name: 'Tabletop',
            component: Tabletop
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/host',
            name: 'Host',
            component: Host
        },
        {
            path: '/forgot',
            name: 'Forgot',
            component: Forgot
        }
    ]
})
