import Vue from 'vue';
import VueProgress from 'vue-progress';
import Router from 'vue-router';

import Splash from './components/lobby/Splash.vue';
import Register from './components/lobby/Register.vue';
import Login from './components/lobby/Login.vue';
import Lobby from './components/lobby/Lobby.vue';
import Tabletop from './components/lobby/Tabletop.vue';
import Profile from './components/lobby/Profile.vue';
import Host from './components/lobby/Host.vue';
import Forgot from './components/lobby/Forgot.vue';
import Crucible from './components/stage/Crucible.vue';

Vue.use(Router);
Vue.use(VueProgress);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Splash',
            component: Splash
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
        },
        {
            path: '/tabletop',
            name: 'Tabletop',
            component: Tabletop
        },
        {
            path: '/crucible',
            name: 'Crucible',
            component: Crucible
        }
    ]
})
