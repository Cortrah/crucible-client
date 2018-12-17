import Vue from 'vue';
import Router from 'vue-router';

import Home from './lobby/views/Home.vue';
import Register from './lobby/views/Register.vue';
import SignIn from './lobby/views/SignIn.vue';
import Forgot from './lobby/views/Forgot.vue';
import Profile from './lobby/views/Profile.vue';
import Lobby from './lobby/views/Lobby.vue';
import Host from './lobby/views/Host.vue';
import Stage from './lobby/views/Stage.vue';

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/sign-in',
            name: 'SignIn',
            component: SignIn
        },
        {
            path: '/forgot',
            name: 'Forgot',
            component: Forgot
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/lobby',
            name: 'Lobby',
            component: Lobby
        },
        {
            path: '/host',
            name: 'Host',
            component: Host
        },
        {
            path: '/stage',
            name: 'Stage',
            component: Stage
        }
    ]
})
