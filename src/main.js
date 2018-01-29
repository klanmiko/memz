import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import UIKit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import About from './About.vue'
import Content from './Content.vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import Post from './Post.vue'

UIKit.use(Icons)
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
var routes = [
  {path: '/', component: Content},
  {path: '/about', component: About},
  {path: '/posts/:id', component: Post}
];
const router = new VueRouter({
  mode: 'history',
  routes
})
const store = new Vuex.Store({
  state: {
    usrData: window.usrInfo,
    activePost: {},
    activeComment: null
  },
  mutations: {
    pushPost(state, post) {
      state.activePost = post;
    },
    toggleComment(state, commentId) {
      state.activeComment = commentId || null;
    },
    addComment(state, comment){
      state.activePost.comments.unshift(comment);
    }
  },
  actions: {
    loadActive: ({commit, store}, id) => {
      Vue.http.get('/api/posts/' + id).then((response) => {
        response.body.photo = "/api/image/" + response.body.file;
        delete response.body.file;
        commit("pushPost", response.body);
      });
    },
    comment:( {commit, state}, comment) => {
      if (comment.link) Vue.http.post("/api/posts/" + state.activePost._id + "/comment/" + comment.link + "/reply", comment).then(result => {
        commit("toggleComment");  
        commit("addComment", comment);
      });
      else Vue.http.post("/api/posts/" + state.activePost._id + "/comment", comment).then(result => {
        console.log(result);
      });
    }
  }
});
new Vue({
  router,
  store,
  el: '#app',
  render: (h) => h(App)
})
