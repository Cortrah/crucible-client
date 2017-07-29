import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store/store.js'

Vue.config.productionTip = false;
Vue.config.devTools = true;

new Vue({
    el: '#main',
    router,
    store,
    template: '<App/>',
    components: { App },
});
