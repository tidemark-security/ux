"use client";

import React from "react";

import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../utils/cn";

export interface AiLoadingScanlineProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const AiLoadingScanline = React.forwardRef<HTMLDivElement, AiLoadingScanlineProps>(function AiLoadingScanline(
  { className, ...otherProps },
  ref,
) {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  return (
    <div className={cn("ai-scanline-track", className)} ref={ref} {...otherProps}>
      <span className={cn("ai-scanline", isDarkTheme ? "bg-brand-primary" : "bg-default-font")} aria-hidden="true" />
    </div>
  );
});