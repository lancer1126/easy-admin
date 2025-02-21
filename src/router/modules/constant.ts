import { RouteRecordRaw } from "vue-router";

export const whiteList = ["/login", "/register", "/register*", "/register/*"];

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    hidden: true
  },
  {
    path: "",
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        name: "Home",
        meta: { title: "首页", icon: "dashboard", affix: true }
      }
    ]
  }
];
