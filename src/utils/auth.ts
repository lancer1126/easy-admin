import Cookies from "js-cookie";
import { storageLocal } from "@/store/utils";
import { useUserStoreHook } from "@/store/modules/user";

export interface DataInfo<T> {
  /** token */
  accessToken: string;
  /** `accessToken`的过期时间（时间戳） */
  expires: T;
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string;
  /** 头像 */
  avatar?: string;
  /** 用户名 */
  username?: string;
  /** 昵称 */
  nickname?: string;
  /** 当前登录用户的角色 */
  roles?: Array<string>;
}

export const USER_KEY: string = "user-info";
export const TOKEN_KEY = "authorized-token";
/**
 * 通过`multiple-tabs`是否在`cookie`中，判断用户是否已经登录系统，
 * 从而支持多标签页打开已经登录的系统后无需再登录。
 * 浏览器完全关闭后`multiple-tabs`将自动从`cookie`中销毁，
 * 再次打开浏览器需要重新登录系统
 * */
export const MULTI_TABS_KEY: string = "multiple-tabs";

/** 存储鉴权信息 */
export function setToken(data: DataInfo<Date>) {
  let expires: number;
  const { accessToken, refreshToken } = data;
  const { isRemembered, loginDay } = useUserStoreHook();
  expires = new Date(data.expires).getTime();
  const cookieString = JSON.stringify({ accessToken, expires, refreshToken });

  expires > 0
    ? Cookies.set(TOKEN_KEY, cookieString, { expires: (expires - Date.now()) / 86400000 })
    : Cookies.set(TOKEN_KEY, cookieString);
  Cookies.set(MULTI_TABS_KEY, "true", isRemembered ? { expires: loginDay } : {});

  function setUserKey({ avatar, username, nickname, roles }) {
    useUserStoreHook().SET_AVATAR(avatar);
    useUserStoreHook().SET_USERNAME(username);
    useUserStoreHook().SET_NICKNAME(nickname);
    useUserStoreHook().SET_ROLES(roles);
    storageLocal().setItem(USER_KEY, {
      refreshToken,
      expires,
      avatar,
      username,
      nickname,
      roles
    });
  }

  if (data.username && data.roles) {
    const { username, roles } = data;
    setUserKey({
      avatar: data?.avatar ?? "",
      username,
      nickname: data?.nickname ?? "",
      roles
    });
  } else {
    const avatar = storageLocal().getItem<DataInfo<number>>(USER_KEY)?.avatar ?? "";
    const username = storageLocal().getItem<DataInfo<number>>(USER_KEY)?.username ?? "";
    const nickname = storageLocal().getItem<DataInfo<number>>(USER_KEY)?.nickname ?? "";
    const roles = storageLocal().getItem<DataInfo<number>>(USER_KEY)?.roles ?? [];
    setUserKey({
      avatar,
      username,
      nickname,
      roles
    });
  }
}

/** 删除token以及其他鉴权信息 */
export function removeToken() {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(MULTI_TABS_KEY);
  storageLocal().removeItem(USER_KEY);
}
