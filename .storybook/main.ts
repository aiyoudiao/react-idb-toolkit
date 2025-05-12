import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: (config) => {
    return {
      ...config,
      css: {
        preprocessorOptions: {
          css: {
            additionalData: `@import 'src/index.css';`, // 引入 tailwind 配置
          },
        },
      },
    };
  },
};
export default config;
