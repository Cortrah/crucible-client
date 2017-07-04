import Vue from 'vue';
import App from './App.vue';
import router from './router.js';

Vue.config.productionTip = false;
Vue.config.devTools = true;

new Vue({
  el: '#main',
  router,
  template: '<App/>',
  components: { App }
});
