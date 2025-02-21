import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";

const usePermissionStore = defineStore("permission", () => {
  const generateRoutes = (): Promise<RouteRecordRaw[]> => {
    // todo 根据用户权限生成属于用户的动态路由
    return Promise.resolve([]);
  };

  return {
    generateRoutes
  };
});

export default usePermissionStore;
