// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" }, // `@`을 `src` 폴더로 매핑
    ],
  },
  server: {
    host: "0.0.0.0", // ✅ 네트워크 모든 IP에서 접근 가능
    port: 5173, // 포트 설정 (기본값: 5173)
    proxy: {
      "/api": {
        target: "https://dingdong-dev-beta.vercel.app",
        changeOrigin: true,
        secure: true,
        headers: {
          credentials: "include",
        },
        cookieDomainRewrite: "localhost"
      },
      "/ws": {
        target: "https://dingdong-dev-beta.vercel.app",
        changeOrigin: true,
        ws: true,
        secure: true,
        headers: {
          credentials: "include",
        },
      },
    },
  },
});
