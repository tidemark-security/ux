"use client";

import React from "react";

import { useOptionalTheme } from "../../contexts/ThemeContext";
import {
  getStoredThemePreference,
  resolveThemePreference,
  type ResolvedTheme,
} from "../../utils/themePreference";
import { cn } from "../../utils/cn";

export type MenuCardBaseVariant = "default" | "selected";

export interface MenuCardBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MenuCardBaseVariant;
}

const MENU_CARD_GROUP_CLASS = "group/6c3f1f95";

function getFallbackResolvedTheme(): ResolvedTheme {
  if (typeof document !== "undefined") {
    const rootTheme = document.documentElement.getAttribute("data-theme");
    if (rootTheme === "dark" || rootTheme === "light") {
      return rootTheme;
    }
  }

  return resolveThemePreference(getStoredThemePreference());
}

function useMenuCardIsDarkTheme(): boolean {
  const theme = useOptionalTheme();
  const [fallbackResolvedTheme, setFallbackResolvedTheme] = React.useState<ResolvedTheme>(
    () => getFallbackResolvedTheme(),
  );

  React.useEffect(() => {
    if (theme) {
      return;
    }

    const syncResolvedTheme = () => {
      setFallbackResolvedTheme(getFallbackResolvedTheme());
    };

    syncResolvedTheme();

    if (typeof document === "undefined") {
      return;
    }

    const observer = new MutationObserver(syncResolvedTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    if (typeof window.matchMedia !== "function") {
      return () => observer.disconnect();
    }

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    if (typeof mediaQueryList.addEventListener === "function") {
      mediaQueryList.addEventListener("change", syncResolvedTheme);
      return () => {
        observer.disconnect();
        mediaQueryList.removeEventListener("change", syncResolvedTheme);
      };
    }

    mediaQueryList.addListener(syncResolvedTheme);
    return () => {
      observer.disconnect();
      mediaQueryList.removeListener(syncResolvedTheme);
    };
  }, [theme]);

  return theme ? theme.resolvedTheme === "dark" : fallbackResolvedTheme === "dark";
}

export function getMenuCardTitleClassName(
  isDarkTheme: boolean,
  variant: MenuCardBaseVariant,
  className?: string,
): string {
  return cn(
    "line-clamp-1 min-w-[240px] grow shrink-0 basis-0 text-body-bold font-body-bold",
    {
      "text-[#fafafaff] group-hover/6c3f1f95:text-brand-400": isDarkTheme,
      "text-default-font": !isDarkTheme,
      "text-accent-1-400": variant === "selected" && isDarkTheme,
    },
    className,
  );
}

export function getMenuCardMetaClassName(
  isDarkTheme: boolean,
  variant: MenuCardBaseVariant,
  className?: string,
): string {
  return cn(
    "text-caption font-caption text-subtext-color",
    {
      "group-hover/6c3f1f95:text-brand-700": isDarkTheme,
      "text-accent-1-700": variant === "selected" && isDarkTheme,
    },
    className,
  );
}

export const MenuCardBase = React.forwardRef<HTMLDivElement, MenuCardBaseProps>(function MenuCardBase(
  { variant = "default", className, children, ...otherProps },
  ref,
) {
  const isDarkTheme = useMenuCardIsDarkTheme();

  return (
    <div
      className={cn(
        `${MENU_CARD_GROUP_CLASS} flex w-full cursor-pointer flex-col flex-wrap items-center justify-between rounded-sm border border-solid border-neutral-border bg-neutral-0 px-4 py-3`,
        {
          "hover:border hover:border-solid hover:border-brand-primary": isDarkTheme,
          "hover:border-brand-700 hover:bg-brand-primary": !isDarkTheme,
          "border border-solid border-accent-1-primary": variant === "selected" && isDarkTheme,
          "border-neutral-900 bg-neutral-300": variant === "selected" && !isDarkTheme,
        },
        className,
      )}
      ref={ref}
      {...otherProps}
    >
      {children}
    </div>
  );
});