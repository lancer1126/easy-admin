export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "Login",
      showLink: false,
      rank: 101
    }
  }
] satisfies Array<RouteConfigsTable>;
