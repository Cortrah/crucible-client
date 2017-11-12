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
import Crucible from './components/stage/Crucible.vue';

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
            path: '/table-top',
            name: 'TableTop',
            component: TableTop
        },
        {
            path: '/crucible',
            name: 'Crucible',
            component: Crucible
        }
    ]
})
