"use client";

import React from "react";

import { IconWrapper } from "../../utils/IconWrapper";
import { cn } from "../../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "brand" | "neutral" | "error" | "warning" | "success";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  iconRight?: React.ReactNode;
  compact?: boolean;
  className?: string;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(function Badge(
  {
    variant = "brand",
    icon = null,
    children,
    iconRight = null,
    compact = false,
    className,
    ...otherProps
  },
  ref,
) {
  return (
    <div
      className={cn(
        "group/badge flex h-6 items-center justify-center gap-1 rounded-md border border-solid border-neutral-border bg-brand-50 px-2",
        {
          "border-success-100 bg-success-100": variant === "success",
          "border-warning-100 bg-warning-100": variant === "warning",
          "border-error-100 bg-error-100": variant === "error",
          "border-neutral-200 bg-neutral-200": variant === "neutral",
        },
        className,
      )}
      ref={ref}
      {...otherProps}
    >
      {icon ? (
        <IconWrapper
          className={cn("text-caption font-caption text-brand-800", {
            "text-success-900": variant === "success",
            "text-warning-900": variant === "warning",
            "text-error-800": variant === "error",
            "text-neutral-700": variant === "neutral",
          })}
        >
          {icon}
        </IconWrapper>
      ) : null}
      {children ? (
        <span
          className={cn(
            "line-clamp-1 grow shrink-0 basis-0 overflow-hidden text-ellipsis text-center text-caption font-caption text-brand-800",
            {
              hidden: compact,
              "text-success-900": variant === "success",
              "text-warning-900": variant === "warning",
              "text-error-800": variant === "error",
              "text-neutral-700": variant === "neutral",
            },
          )}
        >
          {children}
        </span>
      ) : null}
      {iconRight ? (
        <IconWrapper
          className={cn("text-caption font-caption text-brand-700", {
            "text-success-800": variant === "success",
            "text-warning-800": variant === "warning",
            "text-error-700": variant === "error",
            "text-neutral-700": variant === "neutral",
          })}
        >
          {iconRight}
        </IconWrapper>
      ) : null}
    </div>
  );
});
