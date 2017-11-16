import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import UIKit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import About from './About.vue'
import Content from './Content.vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
UIKit.use(Icons)
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
var routes = [
  {path: '/', component: Content},
  {path: '/about', component: About},
];
const router = new VueRouter({
  mode: 'history',
  routes
})
const store = new Vuex.Store({
  state: {
    usrData: null
  },

});
new Vue({
  router,
  store,
  el: '#app',
  render: (h) => h(App)
})
