import { createRouter, createWebHashHistory, type RouteComponent, type Router, type RouteRecordRaw } from "vue-router";
import { ascending, formatFlatteningRoutes, formatTwoStageRoutes, initRouter } from "@/router/utils";
import { buildHierarchyTree } from "@/utils/tree";
import remainingRouter from "./modules/remaining";
import NProgress from "nprogress";
import { isUrl, storageLocal } from "@/store/utils";
import { type DataInfo, MULTI_TABS_KEY, removeToken, USER_KEY } from "@/utils/auth";
import { getConfig } from "@/config";
import { transformI18n } from "@/plugins/i18n";
import Cookies from "js-cookie";
import { isAllEmpty, openLink } from "@pureadmin/utils";

/**
 * 自动导入全部静态路由，匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件，
 * 除了 remaining.ts 文件
 */
const modules: Record<string, any> = import.meta.glob(["./modules/**/*.ts", "!./modules/**/remaining.ts"], {
  eager: true
});

/** 原始静态路由 */
const routes = [];
/** 路由白名单 */
const whiteList = ["/login"];

Object.keys(modules).forEach(key => {
  routes.push(modules[key].default);
});

/** 处理后的静态路由（三级及以上的路由全部拍成二级） */
export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(ascending(routes.flat(Infinity))))
);

/** 用于渲染菜单，保持原始层级 */
export const constantMenus: Array<RouteComponent> = ascending(routes.flat(Infinity)).concat(...remainingRouter);

/** 创建路由实例 */
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes.concat(...(remainingRouter as any)),
  strict: true
});

router.beforeEach((to, _from, next) => {
  NProgress.start();
  const userInfo = storageLocal().getItem<DataInfo<number>>(USER_KEY);
  const externalLink: boolean = isUrl(to?.name as string);
  if (!externalLink) {
    to.matched.some(item => {
      if (!item.meta.title) {
        return "";
      }
      // 设置页面标题
      const title: string = getConfig().Title;
      if (title) {
        document.title = `${transformI18n(item.meta.title)} | ${title}`;
      } else {
        document.title = transformI18n(item.meta.title);
      }
    });
  }

  function correctRoute() {
    whiteList.includes(to.fullPath) ? next(_from.fullPath) : next();
  }

  // 存在MULTI_TABS_KEY且存在userInfo视为已登录
  if (Cookies.get(MULTI_TABS_KEY) && userInfo) {
    if (_from?.name) {
      // 目标路由name为超链接
      if (externalLink) {
        openLink(to?.name as string);
        NProgress.done();
      } else {
        correctRoute();
      }
    } else {
      initRouter().then((r: Router) => {
        if (isAllEmpty(to.name)) {
          r.push(to.fullPath);
        }
      });
      correctRoute();
    }
  } else {
    if (to.path !== "/login") {
      if (whiteList.includes(to.path)) {
        next();
      } else {
        removeToken();
        next({ path: "/login" });
      }
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
