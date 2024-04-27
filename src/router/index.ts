import { createRouter, createWebHashHistory } from "vue-router";

const routes = [];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  strict: true
});

export default router;
