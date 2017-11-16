import Vue from 'vue'
import App from './SubmitPage.vue'
import UIKit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
UIKit.use(Icons)
Vue.use(VueResource)
new Vue({
  el: '#app',
  render: (h) => h(App)
})
