import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import { addons } from "storybook/preview-api";

import "./tailwind.css";
import "./storybook.css";
import "../src/tokens/index.css";

import { tidemarkDarkTheme } from "./tidemarkTheme";
import { ThemeProvider, useTheme } from "../src/contexts/ThemeContext";
import { TimezoneProvider } from "../src/contexts/TimezoneContext";
import {
  applyResolvedTheme,
  isThemePreference,
  resolveThemePreference,
  type ThemePreference,
} from "../src/utils/themePreference";

function resolveStorybookTheme(theme: unknown): ThemePreference {
  return typeof theme === "string" && isThemePreference(theme) ? theme : "dark";
}

function readThemeFromUrl(): ThemePreference | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const globals = new URLSearchParams(window.location.search).get("globals");
  const themeEntry = globals?.split(";").find((entry) => entry.startsWith("theme:"));
  const theme = themeEntry?.split(":")[1];

  return isThemePreference(theme) ? theme : undefined;
}

function applyStorybookRootTheme(theme: unknown) {
  const themePreference = resolveStorybookTheme(theme);
  const resolvedTheme = resolveThemePreference(themePreference);

  applyResolvedTheme(resolvedTheme);

  if (typeof document !== "undefined") {
    document.documentElement.dataset.themePreference = themePreference;
  }
}

applyStorybookRootTheme(readThemeFromUrl());

const channel = addons.getChannel();

channel.on(GLOBALS_UPDATED, ({ globals }) => {
  applyStorybookRootTheme(globals?.theme);
});

if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (document.documentElement.dataset.themePreference === "system") {
      applyStorybookRootTheme("system");
    }
  });
}

function ThemeSync({ theme }: { theme: ThemePreference }) {
  const { setThemePreference } = useTheme();

  useEffect(() => {
    setThemePreference(theme);
  }, [setThemePreference, theme]);

  return null;
}

const preview: Preview = {
  parameters: {
    layout: "centered",

    options: {
      storySort: {
        order: [
          "Branding",
          ["Overview"],
          "Actions",
          "Auth",
          "Forms",
          "Data Display",
          "Status",
          "Navigation",
          "Layout",
          "Overlays",
          "AI",
        ],
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: {
      options: {
        canvas: { name: "canvas", value: "rgb(10, 10, 10)" },
        paper: { name: "paper", value: "rgb(245, 245, 245)" }
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    },

    docs: {
      toc: {
        headingSelector: "h2",
      },
      theme: tidemarkDarkTheme,
    }
  },

  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "dark",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "dark", title: "Dark" },
          { value: "light", title: "Light" },
          { value: "system", title: "System" },
        ],
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = resolveStorybookTheme(context.globals.theme);
      const isDocsView = context.viewMode === "docs";

      return (
        <MemoryRouter>
          <ThemeProvider initialThemePreference={theme}>
            <TimezoneProvider>
              <ThemeSync theme={theme} />
              <div
                style={{
                  minHeight: isDocsView ? undefined : "100vh",
                  width: "min(100%, 1200px)",
                  maxWidth: "1200px",
                  minWidth: 0,
                  boxSizing: "border-box",
                  padding: "2rem",
                  background: "rgb(var(--color-default-background))",
                  color: "rgb(var(--color-default-font))",
                }}
              >
                <Story />
              </div>
            </TimezoneProvider>
          </ThemeProvider>
        </MemoryRouter>
      );
    },
  ],

  initialGlobals: {
    theme: "dark",
    backgrounds: {
      value: "canvas"
    }
  }
};

export default preview;