import locale0 from "./zh-CN/translation.json" with { type: "json" };
import locale1 from "./en/translation.json" with { type: "json" };

// namespace resources
// TODO: 生成 index.js 文件时，自动生成 resources 对象
const resources = {
  'zh-CN': {
    'translation': locale0,
  },
  'en': {
    'translation': locale1,
  },
};
export default resources;
