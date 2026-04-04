import { create } from "storybook/theming";

export type TidemarkThemeMode = "dark" | "light";

const sharedTheme = {
  brandTitle: "Tidemark Security UX",
  brandTarget: "_self",
  appBorderRadius: 0,
  fontBase: '"Saira", sans-serif',
  fontCode: '"Kode Mono", monospace',
  inputBorderRadius: 0,
} as const;

export function getTidemarkTheme(mode: TidemarkThemeMode) {
  if (mode === "light") {
    return create({
      ...sharedTheme,
      base: "light",
      colorPrimary: "#0a0a0a",
      colorSecondary: "#2a1e5c",
      appBg: "#f5f5f5",
      appContentBg: "#ffffff",
      appPreviewBg: "#fafafa",
      appBorderColor: "#d4d4d4",
      textColor: "#171717",
      textInverseColor: "#ffffff",
      textMutedColor: "#525252",
      barTextColor: "#525252",
      barSelectedColor: "#0a0a0a",
      barHoverColor: "#171717",
      barBg: "#ffffff",
      inputBg: "#fafafa",
      inputBorder: "#d4d4d4",
      inputTextColor: "#171717",
    });
  }

  return create({
    ...sharedTheme,
    base: "dark",
    colorPrimary: "#d0ff00",
    colorSecondary: "#00ffd9",
    appBg: "#0a0a0a",
    appContentBg: "#0a0a0a",
    appPreviewBg: "#191919",
    appBorderColor: "#414141",
    textColor: "#e5e5e5",
    textInverseColor: "#0a0a0a",
    textMutedColor: "#a5a5a5",
    barTextColor: "#a5a5a5",
    barSelectedColor: "#d0ff00",
    barHoverColor: "#ffffff",
    barBg: "#171717",
    inputBg: "#262626",
    inputBorder: "#414141",
    inputTextColor: "#e5e5e5",
  });
}

export const tidemarkDarkTheme = getTidemarkTheme("dark");
export const tidemarkLightTheme = getTidemarkTheme("light");
export const tidemarkTheme = tidemarkDarkTheme;

export default tidemarkTheme;