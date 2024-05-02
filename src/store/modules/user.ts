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
    async login() {
      // todo 登录
      return { success: true };
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
