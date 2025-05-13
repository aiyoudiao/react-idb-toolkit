import "../src/index.css";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    docs: {
      // 控制是否自动提取源码
      source: {
        type: "code", // 'auto' | 'code' | 'dynamic'
      },
    },
  },
};

export default preview;
