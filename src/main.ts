import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'p5/lib/addons/p5.sound.min.js';
import 'p5/lib/addons/p5.dom.min.js';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
