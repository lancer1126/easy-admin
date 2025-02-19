import axios, { InternalAxiosRequestConfig } from "axios";
import { getCurLanguage } from "@/lang";
import { getToken, transParams } from "@/utils/auth";
import { HttpStatus } from "@/enums/RespEnum";
import errorCode from "@/utils/errCode";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 30000
});

// 请求拦截器
const requestInterceptor = (config: any): InternalAxiosRequestConfig => {
  config.headers["Content-Language"] = getCurLanguage();
  // 设置token
  const hasToken = config.headers?.hasToken === false;
  if (!hasToken && getToken()) {
    config.headers["Authorization"] = "Bearer " + getToken();
  }
  // get请求映射params参数
  if (config.method === "get" && config.params) {
    const paramStr = transParams(config.params);
    if (paramStr) {
      config.url = `${config.url}?${paramStr}`;
    }
    config.params = {};
  }
  return config;
};

// 请求错误处理
const requestErrorHandler = (error: any) => {
  return Promise.reject(error);
};

// 响应拦截器
const responseInterceptor = (resp: any): Promise<any> => {
  // 未设置状态码则默认成功状态
  const code = resp.data.code || HttpStatus.SUCCESS;
  // 获取错误信息
  const msg = errorCode[code] || resp.data.msg || errorCode["default"];
  // 二进制数据则直接返回
  if (resp.request.responseType === "blob" || resp.request.responseType === "arraybuffer") {
    return resp.data;
  }
  if (code === 401) {
    return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
  } else if (code === HttpStatus.SERVER_ERROR) {
    ElMessage({ message: msg, type: "error" });
    return Promise.reject(new Error(msg));
  } else if (code === HttpStatus.WARN) {
    ElMessage({ message: msg, type: "warning" });
    return Promise.reject(new Error(msg));
  } else if (code !== HttpStatus.SUCCESS) {
    ElNotification.error({ title: msg });
    return Promise.reject("error");
  } else {
    return Promise.resolve(resp.data);
  }
};

// 响应错误处理
const responseErrorHandler = (error: any) => {
  let { message } = error;
  if (message == "Network Error") {
    message = "后端接口连接异常";
  } else if (message.includes("timeout")) {
    message = "系统接口请求超时";
  } else if (message.includes("Request failed with status code")) {
    message = "系统接口" + message.substr(message.length - 3) + "异常";
  }
  ElMessage({ message: message, type: "error", duration: 5 * 1000 });
  return Promise.reject(error);
};

service.interceptors.request.use(requestInterceptor, requestErrorHandler);
service.interceptors.response.use(responseInterceptor, responseErrorHandler);

export default service;
