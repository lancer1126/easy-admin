import { defineStore } from "pinia";
import type { UserType } from "@/store/types";
import { storageLocal } from "@/store/utils";
import { type DataInfo, userKey } from "@/utils/auth";
import { store } from "@/store";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): UserType => ({
    avatar: storageLocal().getItem<DataInfo<number>>(userKey)?.avatar ?? "",
    username: storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "",
    nickname: storageLocal().getItem<DataInfo<number>>(userKey)?.nickname ?? "",
    roles: storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [],
    verifyCode: "",
    currentPage: 0,
    isRemembered: false,
    loginDay: 7
  }),
  actions: {
    /** 存储验证码 */
    SET_VERIFY_CODE(verifyCode: string) {
      this.verifyCode = verifyCode;
    },
    /** 存储是否勾选了登录页的免登录 */
    SET_REMEMBERED(remember: boolean) {
      this.isRemembered = remember;
    },
    /** 设置登录页的免登录存储几天 */
    SET_LOGIN_DAY(value: number) {
      this.loginDay = Number(value);
    },
    async login() {
      // todo 登录
      return { success: true };
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
