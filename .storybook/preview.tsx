import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import "./storybook.css";
import "../src/tokens/index.css";

import { tidemarkDarkTheme } from "./tidemarkTheme";
import { ThemeProvider, useTheme } from "../src/contexts/ThemeContext";
import { TimezoneProvider } from "../src/contexts/TimezoneContext";
import type { ThemePreference } from "../src/utils/themePreference";

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
      toc: true,
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
      const theme = context.globals.theme as ThemePreference;
      const isDocsView = context.viewMode === "docs";

      return (
        <MemoryRouter>
          <ThemeProvider>
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
    backgrounds: {
      value: "canvas"
    }
  }
};

export default preview;