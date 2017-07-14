/**
 * Created by fimion on 7/1/2017.
 */
import Vue from 'vue'
import Promise from 'promise-polyfill'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

import auth from './modules/auth'
import posts from './modules/posts'

import Axios from 'axios';
if(!window.Promise){
  window.Promise = Promise;
}
let axios = Axios.create();
Vue.use(Vuex);



export default new Vuex.Store({
  state:{
    _username: process.env.USER_NAME,
    _postsName: process.env.POSTS_NAME,
    _pagesName: process.env.POSTS_NAME,
  },
  getters,
  mutations,
  actions,
  modules:{
    auth,
    posts
  }
});
