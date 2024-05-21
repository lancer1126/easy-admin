import { defineStore } from "pinia";
import { store } from "@/store";
import { constantMenus } from "@/router";
import { formatFlatteningRoutes } from "@/router/utils";

export const usePermissionStore = defineStore({
  id: "pure-permission",
  state: () => ({
    // 静态路由生成的菜单
    constantMenus,
    // 整体路由生成的菜单（静态、动态）
    wholeMenus: [],
    // 整体路由（一维数组格式）
    flatteningRoutes: [],
    // 缓存页面keepAlive
    cachePageList: []
  }),
  actions: {
    /** 组装整体路由生成的菜单 */
    handleWholeMenus(routes: any[]) {
      const total = this.constantMenus.concat(routes);
      this.wholeMenus = total;
      this.flatteningRoutes = formatFlatteningRoutes(total);
    }
  }
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
