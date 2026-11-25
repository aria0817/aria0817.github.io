// 帮我写一个js脚本，自动生成多语言文件，包含zh-CN en 这两个文件夹，并在每个文件夹下生成一个translation.json文件，内容为{"hello": "你好"}和{"hello": "Hello"}，并且在packages/i18n/src/locales/index.js中导入这两个文件夹的内容，并导出一个对象，包含zh-CN和en两个属性，分别对应这两个文件夹的内容。

// const fs = require("node:fs");
// const path = require("node:path");

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 多语言配置

const locales = {
  "zh-CN": {
    hello: "你好",
  },
  en: {
    hello: "Hello",
  },
};
console.log('--------')


// 项目根目录
const rootDir = path.resolve(__dirname, "..");
// locales 目录
const localesDir = path.join(
  rootDir,
  "packages/i18n/src/locales"
);
// 创建 locales 目录
fs.mkdirSync(localesDir, { recursive: true });



// 生成语言文件夹和 translation.json
Object.entries(locales).forEach(([locale, translations]) => {
  const localeDir = path.join(localesDir, locale);

  fs.mkdirSync(localeDir, { recursive: true });

  const translationPath = path.join(
    localeDir,
    "translation.json"
  );

  fs.writeFileSync(
    translationPath,
    JSON.stringify(translations, null, 2) + "\n",
    "utf-8"
  );

  console.log(`Generated: ${locale}/translation.json`);
});


// 生成 index.js
const imports = Object.keys(locales)
  .map(
    (locale, index) =>
      `import locale${index} from "./${locale}/translation.json" with { type: "json" };`
  )
  .join("\n");

const exports = Object.keys(locales)
  .map(
    (locale, index) =>
      `  "${locale}": locale${index},`
  )
  .join("\n");

const indexContent = `${imports}

const resources = {
${exports}
};

export default resources;
`;

fs.writeFileSync(
  path.join(localesDir, "index.js"),
  indexContent,
  "utf-8"
);

console.log("All locale files generated successfully!");
