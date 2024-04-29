import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import { ascending, formatFlatteningRoutes, formatTwoStageRoutes } from "@/router/utils";
import { buildHierarchyTree } from "@/utils/tree";
import remainingRouter from "./modules/remaining";
import NProgress from "nprogress";

/**
 * 自动导入全部静态路由，匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件，
 * 除了 remaining.ts 文件
 */
const modules: Record<string, any> = import.meta.glob(["./modules/**/*.ts", "!./modules/**/remaining.ts"], {
  eager: true
});

/** 原始静态路由 */
const routes = [];

Object.keys(modules).forEach(key => {
  routes.push(modules[key].default);
});

/** 处理后的静态路由（三级及以上的路由全部拍成二级） */
export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(ascending(routes.flat(Infinity))))
);

/** 创建路由实例 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes.concat(...(remainingRouter as any)),
  strict: true
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
