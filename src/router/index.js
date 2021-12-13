import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/layout/Home.vue';
import Login from "../views/layout/Login.vue";
import store from "@/store";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

// 每次跳转路由之前使用的回调函数
router.beforeEach(function(to,from,next){
  if(to.path !== '/login'){
    if(store.state.user.username && store.state.user.appkey && store.state.user.role){
      return next();
    } else{
      return next('/login');
    }
  }
  return next()
})
export default router
