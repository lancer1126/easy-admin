import { getUserRoutes } from "@/api/system/menu/menu";
import { createCustomNameComponent } from "@/utils/custom";
import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router/modules/constant";
import Layout from "@/layout/index.vue";
import Page404 from "@/views/error/404.vue";

// 全局父组件Layout
const LAYOUT: string = "Layout";
// 读取项目中所有的views文件夹下的.vue文件
const projectViewModules = import.meta.glob("@/views/**/*.vue");
const moduleMap: Map<string, () => Promise<any>> = new Map();
/**
 * 转为map便于匹配
 */
const buildModuleMap = () => {
  Object.entries(projectViewModules).forEach(([path, module]) => {
    const componentName = path.replace(/^.*\/views\//, "").replace(/\.vue$/, "");
    moduleMap.set(componentName, module);
  });
};

const usePermissionStore = defineStore("permission", () => {
  const sidebarRoutes = ref<RouteRecordRaw[]>([]);
  const rewriteRoutes = ref<RouteRecordRaw[]>([]);

  const setSidebarRoutes = (routes: RouteRecordRaw[]): void => {
    sidebarRoutes.value = routes;
  };

  const setRewriteRoutes = (routes: RouteRecordRaw[]): void => {
    rewriteRoutes.value = routes;
  };

  /**
   * 递归扁平化children的路由，使其成为一维数组
   * @param routes 路由列表
   * @param lastRoute 上一级路由
   */
  const flattenChildren = (routes: RouteRecordRaw[], lastRoute: RouteRecordRaw): RouteRecordRaw[] => {
    let children: RouteRecordRaw[] = [];
    routes.forEach(el => {
      if (el.children && el.children.length) {
        if (el.component?.toString() === "ParentView" && !lastRoute) {
          el.children.forEach(c => {
            c.path = el.path + "/" + c.path;
            if (c.children && c.children.length) {
              children = children.concat(flattenChildren(c.children, c));
              return;
            }
            children.push(c);
          });
          return;
        }
      }
      if (lastRoute) {
        el.path = lastRoute.path + "/" + el.path;
        if (el.children && el.children.length) {
          children = children.concat(flattenChildren(el.children, el));
          return;
        }
      }
      children = children.concat(el);
    });
    return children;
  };

  /**
   * 将多级嵌套路由转换为一维数组
   */
  const rewriteChildren = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
    return routes.filter(r => {
      if (r.children && r.children.length) {
        r.children = flattenChildren(r.children, null);
      }
      return true;
    });
  };

  /**
   * 构建路由相关属性
   */
  const matchRouteComponent = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
    return routes.filter(r => {
      // 使用名称匹配组件并设置在路由中
      if (r.component?.toString() === LAYOUT) {
        r.component = Layout;
      } else {
        r.component = loadView(r.component, r.name as string);
      }
      if (r.children?.length) {
        r.children = matchRouteComponent(r.children);
      }
      return true;
    });
  };

  /**
   * 解析并生成用户路由
   */
  const generateRoutes = async (): Promise<RouteRecordRaw[]> => {
    const res = await getUserRoutes();
    const { data } = res;
    const routeData = JSON.parse(JSON.stringify(data));

    if (moduleMap.size === 0) {
      buildModuleMap();
    }
    const filteredRoutes = matchRouteComponent(routeData);
    const _rewriteRoutes = rewriteChildren(filteredRoutes);

    setSidebarRoutes(constantRoutes.concat(filteredRoutes));
    setRewriteRoutes(_rewriteRoutes);

    return new Promise(resolve => {
      resolve(_rewriteRoutes);
    });
  };

  return {
    sidebarRoutes,
    flattenChildren,
    matchRouteComponent,
    generateRoutes
  };
});

/**
 * 把路由组件名称转换为组件
 */
function loadView(viewPath: any, name: string) {
  const moduleLoader = moduleMap.get(viewPath);
  if (!moduleLoader) {
    console.warn(`找不到组件路径: ${viewPath}`);
    // 返回404组件而非null，防止路由错误
    return Page404;
  }
  // 返回包装后的组件
  return createCustomNameComponent(moduleLoader, { name });
}

export default usePermissionStore;
