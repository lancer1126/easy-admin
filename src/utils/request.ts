import axios from "axios";
import { getCurLanguage } from "@/lang";
import { getToken, transParams } from "@/utils/auth";
import { HttpStatus } from "@/enums/RespEnum";
import errorCode from "@/utils/errCode";
import cache from "@/plugins/cache";
import { encryptBase64, encryptWithAes, generateAesKey } from "@/utils/crypto";
import { encrypt } from "@/utils/jsencrypt";

const encryptHeader = "encrypt-key";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 30000
});

// 请求拦截器
const requestInterceptor = (config: any): Promise<any> => {
  config.headers["Content-Language"] = getCurLanguage();
  // 设置token
  const hasToken = config.headers?.hasToken === false;
  const isRepeatSubmit = config.headers?.repeatSubmit === false;
  const isEncrypt = config.headers?.isEncrypt === "true";
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
  // 防止重复请求
  if (!isRepeatSubmit && (config.method === "post" || config.method === "put")) {
    const requestObj = {
      url: config.url,
      data: typeof config.data === "object" ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    };
    const sessionObj = cache.session.getJSON("sessionObj");
    if (sessionObj === undefined || sessionObj === null || sessionObj === "") {
      cache.session.setJSON("sessionObj", requestObj);
    } else {
      const s_url = sessionObj.url; // 请求地址
      const s_data = sessionObj.data; // 请求数据
      const s_time = sessionObj.time; // 请求时间
      const interval = 500; // 间隔时间(ms)，小于此时间视为重复提交
      if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
        const message = "数据正在处理，请勿重复提交";
        console.warn(`[${s_url}]: ` + message);
        return Promise.reject(new Error(message));
      } else {
        cache.session.setJSON("sessionObj", requestObj);
      }
    }
  }
  // 当开启参数加密
  if (import.meta.env.VITE_APP_ENCRYPT === "true") {
    if (isEncrypt && (config.method === "post" || config.method === "put")) {
      // 生成一个 AES 密钥
      const aesKey = generateAesKey();
      config.headers[encryptHeader] = encrypt(encryptBase64(aesKey));
      config.data =
        typeof config.data === "object"
          ? encryptWithAes(JSON.stringify(config.data), aesKey)
          : encryptWithAes(config.data, aesKey);
    }
  }
  // FormData数据去请求头Content-Type
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
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
