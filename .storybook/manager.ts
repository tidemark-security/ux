import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import { addons } from "storybook/manager-api";

import "./manager.css";
import { getTidemarkTheme, type TidemarkThemeMode } from "./tidemarkTheme";

const managerConfig = {
  panelPosition: "right",
  enableShortcuts: true,
  showNav: true,
  showPanel: true,
  showToolbar: true,
} as const;

function resolveThemeMode(theme?: string): TidemarkThemeMode {
  if (theme === "light") {
    return "light";
  }

  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return "dark";
}

function readThemeFromUrl() {
  const globals = new URLSearchParams(window.location.search).get("globals");
  const themeEntry = globals?.split(";").find((entry) => entry.startsWith("theme:"));
  return themeEntry?.split(":")[1];
}

function applyManagerTheme(theme?: string) {
  const resolvedTheme = resolveThemeMode(theme);

  document.documentElement.dataset.colorMode = resolvedTheme;
  document.documentElement.dataset.themePreference = theme ?? resolvedTheme;
  document.documentElement.style.colorScheme = resolvedTheme;

  addons.setConfig({
    ...managerConfig,
    theme: getTidemarkTheme(resolvedTheme),
  });
}

applyManagerTheme(readThemeFromUrl());

const channel = addons.getChannel();

channel.on(GLOBALS_UPDATED, ({ globals }) => {
  applyManagerTheme(globals?.theme);
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (document.documentElement.dataset.themePreference === "system") {
    applyManagerTheme("system");
  }
});