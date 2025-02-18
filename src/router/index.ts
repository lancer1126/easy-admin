import { createRouter, createWebHistory } from "vue-router";
import { constantRoutes } from "@/router/modules/constant";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes,
  // 刷新时滚动条还原
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

export default router;
