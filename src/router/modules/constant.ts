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
    redirect: "/index",
    children: [
      {
        path: "/index",
        component: () => import("@/views/home/home.vue"),
        name: "Index",
        meta: { title: "首页", icon: "dashboard", affix: true }
      }
    ]
  }
];
