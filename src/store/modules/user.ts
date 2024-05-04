import { defineStore } from "pinia";
import type { UserType } from "@/store/types";
import { storageLocal } from "@/store/utils";
import { type DataInfo, USER_KEY } from "@/utils/auth";
import { store } from "@/store";
import { getLogin } from "@/api/user";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): UserType => ({
    avatar: storageLocal().getItem<DataInfo<number>>(USER_KEY)?.avatar ?? "",
    username: storageLocal().getItem<DataInfo<number>>(USER_KEY)?.username ?? "",
    nickname: storageLocal().getItem<DataInfo<number>>(USER_KEY)?.nickname ?? "",
    roles: storageLocal().getItem<DataInfo<number>>(USER_KEY)?.roles ?? [],
    verifyCode: "",
    currentPage: 0,
    isRemembered: false,
    loginDay: 7
  }),
  actions: {
    /** 存储头像 */
    SET_AVATAR(avatar: string) {
      this.avatar = avatar;
    },
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储昵称 */
    SET_NICKNAME(nickname: string) {
      this.nickname = nickname;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
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
    async login(data: any) {
      return new Promise<CommonResult>((resolve, reject) => {
        getLogin(data)
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
