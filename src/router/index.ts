import { createRouter, createWebHistory } from "vue-router";
import { constantRoutes, whiteList } from "@/router/modules/constant";
import { isHttp, isPathMatch } from "@/utils/validate";
import NProgress from "nprogress";
import { getToken } from "@/utils/auth";
import useUserStore from "@/store/modules/user";
import { to as tos } from "await-to-js";
import usePermissionStore from "@/store/modules/permission";

// 跳转路径是否在白名单中
const isWhiteList = (path: string) => {
  return whiteList.some(item => isPathMatch(item, path));
};

// 路由前置守卫
const beforeEachGuard = async (to: any, from: any, next: any) => {
  NProgress.start();
  // 路由在白名单中
  if (isWhiteList(to.path)) {
    next();
    return;
  }

  // 如果当前用户已生成token
  if (getToken()) {
    if (to.meta.title) {
      document.title = to.meta.title as string;
    }
    if (to.path === "/login") {
      next("/");
      return;
    }

    // 如果本地存储中没有用户的角色信息，则重新获取一遍
    if (useUserStore().roles.length === 0) {
      const [err] = await tos(useUserStore().getAndSaveInfo());
      if (err) {
        await useUserStore().logout();
        ElMessage.error(err);
        next({ path: "/" });
        return;
      }
      // 根据roles权限生成可访问的路由表
      const accessRoutes = await usePermissionStore().generateRoutes();
      accessRoutes.forEach(route => {
        if (!isHttp(route.path)) {
          router.addRoute(route); // 动态添加可访问路由表
        }
      });
      next({
        path: to.path,
        replace: true,
        params: to.params,
        query: to.query,
        hash: to.hash,
        name: to.name as string
      });
    } else {
      // 数据无误，正常跳转
      next();
    }
  } else {
    // 用于登录后重定向到原先的路径
    const redirect = encodeURIComponent(to.fullPath || "/");
    next(`/login?redirect=${redirect}`);
    NProgress.done();
  }
};

// 路由后置守卫
const afterEachGuard = () => {
  NProgress.done();
};

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

router.beforeEach(beforeEachGuard);
router.afterEach(afterEachGuard);

export default router;
