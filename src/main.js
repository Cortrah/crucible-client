import Vue from 'vue';
import Vuex from 'vuex'
import Router from 'vue-router';

import Main from './Main.vue';
import router from './router.js';
import store from './store/store.js'

Vue.use(Vuex);
Vue.use(Router);

Vue.config.productionTip = false;
Vue.config.devTools = true;

new Vue({
    el: '#main',
    router,
    store,
    template: '<Main/>',
    components: { Main },
});
