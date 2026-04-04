import preset from "./src/tokens/tailwind-preset.js";

export default {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./stories/**/*.{ts,tsx,js,jsx}",
    "./.storybook/**/*.{ts,tsx,js,jsx}",
  ],
  presets: [preset],
};