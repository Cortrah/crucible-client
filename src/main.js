import Vue from 'vue';
import Vuex from 'vuex'

import App from './App.vue';
import router from './router.js';
import store from './store/store.js'

Vue.config.devTools = true;
Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(router);

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});
