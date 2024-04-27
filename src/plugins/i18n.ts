import { createI18n, type I18n } from "vue-i18n";
import type { App } from "vue";

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

export const i18n: I18n = createI18n({
  legacy: false,
  locale: "zh",
  fallbackLocale: "en",
  messages: localeConfig
});

export function useI18n(app: App) {
  app.use(i18n);
}
