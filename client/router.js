import Vue from 'vue';
import Router from 'vue-router';

import Home from './components/lobby/Home.vue';
import Register from './components/lobby/Register.vue';
import SignIn from './components/lobby/SignIn.vue';
import Forgot from './components/lobby/Forgot.vue';
import Profile from './components/lobby/Profile.vue';
import Lobby from './components/lobby/Lobby.vue';
import Host from './components/lobby/Host.vue';
import TableTop from './components/lobby/TableTop.vue';

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: SignIn
        },
        {
            path: '/forgot',
            name: 'forgot',
            component: Forgot
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/lobby',
            name: 'lobby',
            component: Lobby
        },
        {
            path: '/host',
            name: 'host',
            component: Host
        },
        {
            path: '/table-top',
            name: 'table-top',
            component: TableTop
        }
    ]
})
