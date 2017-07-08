/**
 * Created by fimion on 7/1/2017.
 */
import Vue from 'vue'
import Promise from 'promise-polyfill'
import Vuex from 'vuex'
if(!window.Promise){
  window.Promise = Promise;
}
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    _loggedin: false,
    _authToken: false,
    _api:'https://jsonbin.org/',
    _username: 'fimion',
    _posts: 'posts',
    _pages: 'pages',
    _localurl: process.env.LOCAL_URL,
  },

  getters:{
    jsonbin(state, getters){
      return function(path){return state._api+path};
    },
      adminHeader(state,getter){
        return {'authorization':'Bearer '+state._authToken}
      }
  },
  mutations:{
    login(state, token){
      state._loggedin = true;
      state._authToken = token;
    },
    logout(state){
      state._loggedin = false;
      state._authToken = '';
    }
  }
});
