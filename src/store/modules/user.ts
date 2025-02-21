import { defineStore } from "pinia";
import { getToken, setToken } from "@/utils/auth";
import { LoginData } from "@/api/types";
import { login as loginApi } from "@/api/login/login";
import { to } from "await-to-js";

const useUserStore = defineStore("user", () => {
  const token = ref(getToken());
  const name = ref("");
  const nickname = ref("");
  const userId = ref<string | number>("");
  const roles = ref<Array<string>>([]); // 用户角色编码集合 → 判断路由权限
  const permissions = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限

  const login = async (loginData: LoginData): Promise<void> => {
    const [err, res] = await to(loginApi(loginData));
    if (!res) {
      return Promise.reject(err);
    }
    const data = res.data;
    token.value = data.access_token;
    // token进行保存
    setToken(data.access_token);
    return Promise.resolve();
  };

  return {
    token,
    name,
    nickname,
    userId,
    roles,
    permissions,
    login
  };
});

export default useUserStore;
