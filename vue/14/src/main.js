import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router';
import Nl2br from 'vue-nl2br';

Vue.config.productionTip = false;

Vue.component('nl2br', Nl2br);

new Vue({
  el: '#app',
  store,
  router,
  vuetify,
  render: h => h(App)
});
