// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: "./testSetup.ts",
    environment: "jsdom",
    include: ["{src,test}/**/*.{test,spec}.?(c|m)[jt]s?(x)"], // 明确指定 src 目录
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
    ],
    watchExclude: ["**/node_modules/**", "**/dist/**"],
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
