import { defineConfig } from "father";

export default defineConfig({
  esm: { input: "src/toolkit", output: "dist", transformer: "babel" },
  umd: {
    entry: "src/toolkit/index.ts",
    output: {
      path: "dist",
      filename: "index.umd.js",
    },
  },
  platform: "browser",
  extraBabelPlugins: [],
  prebundle: {
    deps: ["idb"],
  },
});
