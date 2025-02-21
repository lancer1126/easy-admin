import { AxiosPromise } from "axios";
import { LoginData, LoginResult, TenantInfo, UserInfo, VerifyCode } from "@/api/types";
import request from "@/utils/request";

// pc端固定客户端授权id
const defaultClient = import.meta.env.VITE_APP_CLIENT_ID;

/**
 * 获取租户列表
 * @param hasToken
 */
export function getTenantList(hasToken: boolean): AxiosPromise<TenantInfo> {
  return request({
    url: "/auth/tenant/list",
    method: "get",
    headers: {
      hasToken: hasToken
    }
  });
}

/**
 * 获取验证码
 */
export function getCodeImg(): AxiosPromise<VerifyCode> {
  return request({
    url: "/auth/code",
    method: "get",
    timeout: 20000,
    headers: {
      hasToken: false
    }
  });
}

/**
 * 登录api
 */
export function login(loginData: LoginData): AxiosPromise<LoginResult> {
  const params = {
    ...loginData,
    clientId: loginData.clientId || defaultClient,
    grantType: loginData.grantType || "password"
  };
  return request({
    url: "/auth/login",
    method: "post",
    data: params,
    headers: {
      hasToken: false,
      isEncrypt: true,
      repeatSubmit: false
    }
  });
}

/**
 * 注销
 */
export function logout() {
  if (import.meta.env.VITE_APP_SSE === "true") {
    request({
      url: "/resource/sse/close",
      method: "get"
    });
  }
  return request({
    url: "/auth/logout",
    method: "post"
  });
}

// 获取用户详细信息
export function getUserInfo(): AxiosPromise<UserInfo> {
  return request({
    url: "/system/user/getInfo",
    method: "get"
  });
}
