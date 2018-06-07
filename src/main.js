import Vue from 'vue';
import Vuex from 'vuex'

import App from './App.vue';
import router from './router.js';
import store from './store/store.js'
import Queue from './main/Queue'

Vue.use(Vuex);
Vue.use(router);

Vue.config.devTools = true;
Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();
Vue.prototype.$que = new Queue();

console.log('main');

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});
