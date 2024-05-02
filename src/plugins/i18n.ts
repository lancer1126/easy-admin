import { createI18n, type I18n } from "vue-i18n";
import type { App, WritableComputedRef } from "vue";
import { isObject } from "@pureadmin/utils";

/** 仅初始化一次国际化配置 */
const siphonI18n = (function () {
  let cache = Object.fromEntries(
    Object.entries(import.meta.glob("../../locales/*.y(a)?ml", { eager: true })).map(([key, value]: any) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
      return [matched, value.default];
    })
  );
  return (prefix = "zh-CN") => {
    return cache[prefix];
  };
})();

export const localeConfig = {
  zh: {
    ...siphonI18n("zh-CN")
  },
  en: {
    ...siphonI18n("en")
  }
};

/** 获取对象中所有嵌套对象的key键，并将它们用点号分割组成字符串 */
const getObjectKeys = (obj: Set<string>) => {
  const stack = [];
  const keys: Set<string> = new Set();

  stack.push({ obj, key: "" });

  while (stack.length > 0) {
    const { obj, key } = stack.pop();

    for (const k in obj) {
      const newKey = key ? `${key}.${k}` : k;

      if (obj[k] && isObject(obj[k])) {
        stack.push({ obj: obj[k], key: newKey });
      } else {
        keys.add(newKey);
      }
    }
  }

  return keys;
};

/** 将展开的key缓存 */
const keysCache: Map<string, Set<string>> = new Map();
const flatI18n = (prefix = "zh-CN") => {
  let cache = keysCache.get(prefix);
  if (!cache) {
    cache = getObjectKeys(siphonI18n(prefix));
    keysCache.set(prefix, cache);
  }
  return cache;
};

/**
 * 国际化转换工具函数（自动读取根目录locales文件夹下文件进行国际化匹配）
 * @param message message
 * @returns 转化后的message
 */
export function transformI18n(message: any = "") {
  if (!message) {
    return "";
  }

  // 处理存储动态路由的title,格式 {zh:"",en:""}
  if (typeof message === "object") {
    const locale: string | WritableComputedRef<string> | any = i18n.global.locale;
    return message[locale?.value];
  }

  const key = message.match(/(\S*)\./)?.input;

  if (key && flatI18n("zh-CN").has(key)) {
    return i18n.global.t.call(i18n.global.locale, message);
  } else if (!key && Object.hasOwn(siphonI18n("zh-CN"), message)) {
    // 兼容非嵌套形式的国际化写法
    return i18n.global.t.call(i18n.global.locale, message);
  } else {
    return message;
  }
}

export const $t = (key: string) => key;

export const i18n: I18n = createI18n({
  legacy: false,
  locale: "zh",
  fallbackLocale: "en",
  messages: localeConfig
});

export function useI18n(app: App) {
  app.use(i18n);
}
