/**
 * Created by fimion on 7/1/2017.
 */
import Vue from 'vue'
import Promise from 'promise-polyfill'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import auth from './modules/auth'
import posts from './modules/posts'
import messages from './modules/messages'

if(!window.Promise){
  window.Promise = Promise;
}

Vue.use(Vuex);



export default new Vuex.Store({
  state:{
    _username: process.env.USER_NAME,
    _postsName: process.env.POSTS_NAME,
    _pagesName: process.env.POSTS_NAME,
    _menuOpen: false,
  },
  getters,
  mutations,
  actions,
  modules:{
    auth,
    posts,
    messages
  }
});
