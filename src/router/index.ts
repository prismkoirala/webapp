import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "../views/layout/Layout.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ "../views/layout/Section.vue"),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "about" */ "@/components/auth/Register.vue"),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ "@/components/auth/Login.vue"),
      },
      {
        path:"/order-summary",
        name: 'OrderSummary',
        component: () => import(/* webpackChunkName: "about" */ "../views/OrderSummary.vue"),
      },
      {
        path:"/wishlist",
        name: 'Wishlist',
        component: () => import(/* webpackChunkName: "about" */ "../views/Wishlist.vue"),
      },
      {
        path:"/profile",
        name: 'Profile',
        component: () => import(/* webpackChunkName: "about" */ "../views/Profile.vue"),
      },
      {
        path:'/checkout',
        name: 'Checkout',
        component: () => import(/* webpackChunkName: "about" */ "../views/Checkout.vue"),
      },
      {
        path: "/:category",
        name: 'Category',
        component: () => import(/* webpackChunkName: "about" */ "../views/ProductList.vue"),
      },
      {
        path: "/:category/:id",
        name: 'ProductDetail',
        component: () => import(/* webpackChunkName: "about" */ "../views/ProductDetail.vue"),
      },
      
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
