import Vue from 'vue';
import Vuex from 'vuex';
import Toasted from 'vue-toasted';

import App from './App.vue';
import router from './router.js';
import store from './store.js'

Axios.defaults.baseURL = ' http://localhost:8082/api/v1';

Vue.use(Toasted);
Vue.use(Vuex);
Vue.use(router);

Vue.config.devtools = true;
Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});
