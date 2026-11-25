import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { i18nReady } from "@repo/i18n";
import "./index.css";
import App from "./App.tsx";

async function bootstrap() {
  // 等待 i18next 初始化完成
  await i18nReady;

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void bootstrap();
