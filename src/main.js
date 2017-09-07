import Vue from 'vue';
import Vuex from 'vuex'
import Router from 'vue-router';
import { sync } from 'vuex-router-sync';

import Home from './Home.vue';
import router from './router.js';
import store from './store/store.js'

Vue.use(Vuex);
Vue.use(Router);
Vue.use(VueProgress);

Vue.config.productionTip = false;
Vue.config.devTools = true;

sync(store, router);

new Vue({
    el: '#main',
    router,
    store,
    template: '<Home/>',
    components: { Home },
});
