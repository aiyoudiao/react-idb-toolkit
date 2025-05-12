import { defineConfig } from "father";

export default defineConfig({
  esm: { input: "src", output: "dist" },
  cjs: { input: "src", output: "dist" },
  platform: "browser",
  extraBabelPlugins: [],
  prebundle: {
    deps: ["idb"],
  },
});
