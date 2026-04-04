import React from "react";
import { Check } from "lucide-react";

import { useTheme } from "../../contexts/ThemeContext";
import { IconWrapper } from "../../utils/IconWrapper";
import { cn } from "../../utils/cn";

export interface IconWithBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "neutral"
    | "error"
    | "success"
    | "warning"
    | "brand"
    | "accent-1"
    | "accent-2"
    | "accent-3";
  size?: "x-large" | "large" | "medium" | "small" | "x-small";
  icon?: React.ReactNode;
  bevel?: boolean;
  className?: string;
}

export const IconWithBackground = React.forwardRef<HTMLDivElement, IconWithBackgroundProps>(
  function IconWithBackground(
    { variant = "default", size = "x-small", icon = <Check />, bevel = true, className, ...otherProps },
    ref,
  ) {
    const { resolvedTheme } = useTheme();
    const isDarkTheme = resolvedTheme === "dark";

    return (
      <div
        className={cn(
          "group/icon-bg flex items-center justify-center",
          {
            "bevel-tr-md": bevel && size === "x-small",
            "bevel-tr-lg": bevel && size === "small",
            "bevel-tr-xl": bevel && size === "medium",
            "bevel-tr-2xl": bevel && size === "large",
            "bevel-tr-3xl": bevel && size === "x-large",
          },
          {
            "h-6 w-6": size === "x-small",
            "h-8 w-8": size === "small",
            "h-10 w-10": size === "medium",
            "h-14 w-14": size === "large",
            "h-20 w-20": size === "x-large",
          },
          {
            "bg-accent-3-primary": variant === "accent-3",
            "bg-accent-2-600": variant === "accent-2",
            "bg-accent-1-400": variant === "accent-1",
            "bg-brand-400": variant === "brand",
            "bg-warning-500": variant === "warning",
            "bg-success-700": variant === "success",
            "bg-error-700": variant === "error",
            [isDarkTheme ? "bg-neutral-100" : "bg-neutral-200"]: variant === "neutral",
          },
          className,
        )}
        ref={ref}
        {...otherProps}
      >
        {icon ? (
          <IconWrapper
            className={cn(
              {
                "text-[12px]": size === "x-small",
                "text-[16px]": size === "small",
                "text-[20px]": size === "medium",
                "text-[28px]": size === "large",
                "text-[40px]": size === "x-large",
              },
              {
                "text-accent-3-200": variant === "accent-3",
                "text-accent-2-1100": variant === "accent-2",
                "text-accent-1-1100": variant === "accent-1",
                "text-brand-1100": variant === "brand" || variant === "success",
                "text-warning-100": variant === "warning",
                "text-error-100": variant === "error",
                "text-neutral-700": variant === "neutral",
                "text-brand-800": variant === "default",
              },
            )}
          >
            {icon}
          </IconWrapper>
        ) : null}
      </div>
    );
  },
);