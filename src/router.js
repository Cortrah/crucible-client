import Vue from 'vue';
import Router from 'vue-router';

import Home from './lobby/views/Home.vue';
import Register from './lobby/views/Register.vue';
import SignIn from './lobby/views/SignIn.vue';
import Forgot from './lobby/views/Forgot.vue';
import Profile from './lobby/views/Profile.vue';
import Lobby from './lobby/views/Lobby.vue';
import Host from './lobby/views/Host.vue';
import Stage from './stage/TableTop.vue';

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
            path: '/stage',
            name: 'stage',
            component: Stage
        }
    ]
})
