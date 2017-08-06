import Vue from 'vue'
import Router from 'vue-router'
import Posts from './views/Posts'
import Admin from './views/Admin'
import Login from './views/Login'
import Logout from './views/Logout'

Vue.use(Router);


export default new Router({
    mode: 'history',
  routes: [
    {
      path: '/admin/:action?/:id?',
      name: 'Admin',
      component: Admin,
      meta: {requiresAuth: true}
    },
    {
      path:'/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/logout',
      name: 'Log Out',
      component: Logout
    },
    {
      path: '/posts/:date?',
      name: 'Posts',
      component: Posts
    },
    {path:'/',redirect:'/posts'}

  ]
})
