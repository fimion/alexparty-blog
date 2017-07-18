import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import Admin from '@/components/Admin'
import Login from '@/components/Login'
import Logout from '@/components/Logout'

Vue.use(Router);


export default new Router({
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
