import Vue from 'vue'
import Router from 'vue-router'
const Posts = ()=>import(/* webpackChunkName:'posts.view' */'./views/Posts')
const Admin = ()=>import(/* webpackChunkName:'admin.view' */'./views/Admin')
const Login = ()=>import(/* webpackChunkName:'login.view' */'./views/Login')
const Logout = ()=>import(/* webpackChunkName:'logout.view' */'./views/Logout')

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
