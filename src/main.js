// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import promisepoly from 'promise-polyfill'
if(!window.Promise){
    window.Promise = promisepoly;
}

import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'https://jsonbin.org';




/**
 * our authentication check. no one goes to admin unless they login.
 */
router.beforeEach(function (to, from, next) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.isLoggedIn) {
      //if (false) {
            next({
                path: '/login'
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
