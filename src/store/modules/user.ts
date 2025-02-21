import { defineStore } from "pinia";
import { getToken, removeToken, setToken } from "@/utils/auth";
import { LoginData } from "@/api/types";
import { getUserInfo, login as loginApi, logout as logoutApi } from "@/api/login/login";
import { to } from "await-to-js";
import defAva from "@/assets/images/profile.jpg";

const useUserStore = defineStore("user", () => {
  const token = ref(getToken());
  const name = ref("");
  const nickname = ref("");
  const avatar = ref("");
  const tenantId = ref("");
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

  // 注销
  const logout = async (): Promise<void> => {
    await logoutApi();
    token.value = "";
    roles.value = [];
    permissions.value = [];
    removeToken();
  };

  // 获取用户信息
  const getInfo = async (): Promise<void> => {
    const [err, res] = await to(getUserInfo());
    if (res) {
      const data = res.data;
      const user = data.user;
      const profile = user.avatar == "" || user.avatar == null ? defAva : user.avatar;

      if (data.roles && data.roles.length > 0) {
        // 验证返回的roles是否是一个非空数组
        roles.value = data.roles;
        permissions.value = data.permissions;
      } else {
        roles.value = ["ROLE_DEFAULT"];
      }
      name.value = user.userName;
      nickname.value = user.nickName;
      avatar.value = profile;
      userId.value = user.userId;
      tenantId.value = user.tenantId;
      return Promise.resolve();
    }
    return Promise.reject(err);
  };

  return {
    token,
    name,
    nickname,
    userId,
    roles,
    permissions,
    login,
    logout,
    getInfo
  };
});

export default useUserStore;
