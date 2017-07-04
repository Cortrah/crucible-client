import Vue from 'vue'
import VueProgress from 'vue-progress'
import Router from 'vue-router'

import Crucible from '@/components/stage/Crucible'
import Register from '@/components/lobby/Register'
import Login from '@/components/lobby/Login'
import Lobby from '@/components/lobby/Lobby'
import Tabletop from '@/components/lobby/Tabletop'
import Profile from '@/components/lobby/Profile'
import Host from '@/components/lobby/Host'
import Forgot from '@/components/lobby/Forgot'


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
