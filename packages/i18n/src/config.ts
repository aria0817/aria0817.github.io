
import i18n, { type Resource } from "i18next";
import { initReactI18next } from "react-i18next";

// @ts-expect-error The locale bundle is JavaScript and has no declaration file.
import localeResources from "./locales/index";

const resources = localeResources as Resource;

export const defaultLanguage = "zh-CN";

export const supportedLanguages = ["zh-CN", "en"] as const;

export type SupportedLanguage =
  (typeof supportedLanguages)[number];

// 初始化 i18next
export const i18nReady = i18n
  .use(initReactI18next)
  .init({
    // 所有语言资源
    resources,

    // 默认语言
    lng: defaultLanguage,

    // 找不到翻译时使用英文
    fallbackLng: "en",

    // 默认命名空间 
    defaultNS: "translation",

    // 可用命名空间
    ns: ["translation"],

    // 插值配置
    interpolation: {
      escapeValue: false,
    },

    // 避免找不到翻译时直接返回 key
    returnEmptyString: false,
  });

export default i18n;
