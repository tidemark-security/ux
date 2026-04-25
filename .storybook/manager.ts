import { GLOBALS_UPDATED, SET_GLOBALS, UPDATE_GLOBALS } from "storybook/internal/core-events";
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

function handleGlobalsChange({ globals }: { globals?: { theme?: string } }) {
  applyManagerTheme(globals?.theme);
}

addons.register("tidemark/theme-sync", (api) => {
  const applyCurrentGlobals = () => {
    applyManagerTheme(api.getGlobals()?.theme as string | undefined);
  };

  api.on(UPDATE_GLOBALS, handleGlobalsChange);
  api.on(GLOBALS_UPDATED, handleGlobalsChange);
  api.on(SET_GLOBALS, handleGlobalsChange);
  applyCurrentGlobals();
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (document.documentElement.dataset.themePreference === "system") {
    applyManagerTheme("system");
  }
});