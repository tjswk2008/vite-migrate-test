import 'es6-promise/auto';
import Vue from 'vue';
import router from './router/index';
import store from './store/index';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import './assets/stylus/style.styl';
// import 'mint-ui/lib/style.css';

// 结合vuex和路由
sync(store, router);

export const Root = new Vue({
  router,
  store,
  ...App
});

document.addEventListener('DOMContentLoaded', function() {
  // let width = document.getElementsByTagName('body')[0].getBoundingClientRect().width;

  Root.$mount('#app');
});

