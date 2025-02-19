import { LanguageEnum } from "@/enums/LanguageEnum";
import { createI18n } from "vue-i18n";

import zh from "./locales/zh_CN.json";
import en from "./locales/en_US.json";

// 获取系统当前使用的语言
export const getCurLanguage = (): LanguageEnum => {
  const lang = useStorage<LanguageEnum>("language", LanguageEnum.zh_CN);
  if (lang.value) {
    return lang.value;
  }
  return LanguageEnum.zh_CN;
};

const i18n = createI18n({
  globalInjection: true,
  allowComposition: true,
  legacy: false,
  locale: getCurLanguage(),
  messages: {
    zh_CN: zh,
    en_US: en
  }
});

export default i18n;
