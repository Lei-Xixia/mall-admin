import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/layout/Home.vue";
import Login from "@/views/layout/Login.vue";
import store from "@/store";
import getMenuRoutes from "@/utils/permission.js";

Vue.use(VueRouter);

const syncRouterMap = [
  {
    path: "/product",
    name: "Product",
    component: Home,
    meta: {
      title: "商品",
      icon: "inbox",
      hidden: false,
    },
    children: [
      {
        path: "list",
        name: "ProductList",
        meta: {
          title: "商品列表",
          icon: "unordered-list",
          hidden: false,
        },
        component: () => import("@/views/page/productList.vue"),
      },
      {
        path: "add",
        name: "ProductAdd",
        meta: {
          title: "新增商品",
          icon: "file-add",
          hidden: false,
        },
        component: () => import("@/views/page/productAdd.vue"),
      },
      {
        path: "category",
        name: "Category",
        meta: {
          title: "商品类目",
          icon: 'project',
          hidden: false,
        },
        component: () => import("@/views/page/category.vue"),
      },
    ],
  },
];

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: '/index',
    meta: {
      title: "首页",
      icon: 'home',
      hidden: false,
    },
    children: [
      {
        path: "index",
        name: "Index",
        meta: {
          title: "统计",
          icon: 'number',
          hidden: false,
        },
        component: () => import("@/views/page/index.vue"), // 懒加载组件
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录",
      hidden: true,
    },
  },
  {
    path: "/about",
    name: "About",
    meta: {
      title: "关于",
      hidden: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

let isAddRoutes = false;
// 每次跳转路由之前使用的回调函数
router.beforeEach(function (to, from, next) {
  if (to.path !== "/login") {
    if (
      store.state.user.username &&
      store.state.user.appkey &&
      store.state.user.role
    ) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.user.role, syncRouterMap);
        store.dispatch("changeMenuRoutes", routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    } else {
      return next("/login");
    }
  }
  return next();
});
export default router;
