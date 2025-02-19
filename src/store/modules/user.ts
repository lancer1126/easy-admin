import { defineStore } from "pinia";
import { getToken } from "@/utils/auth";

const useUserStore = defineStore("user", () => {
  const token = ref(getToken());
  const name = ref("");
  const nickname = ref("");
  const userId = ref<string | number>("");
  const roles = ref<Array<string>>([]); // 用户角色编码集合 → 判断路由权限
  const permissions = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限

  return {
    token,
    name,
    nickname,
    userId,
    roles,
    permissions
  };
});

export default useUserStore;
