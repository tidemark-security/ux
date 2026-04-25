"use client";

import React from "react";
import { Info } from "lucide-react";

import { IconWrapper } from "../../utils/IconWrapper";
import { cn } from "../../utils/cn";

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: "neutral" | "error" | "success" | "warning";
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { variant = "neutral", icon = <Info />, title, description, actions, className, ...otherProps },
  ref,
) {
  return (
    <div
      className={cn(
        "group/toast flex w-80 items-center gap-4 rounded-md border border-solid border-neutral-200 bg-neutral-50 px-4 py-3 shadow-neutral-200-shadow-medium",
        {
          "border-success-100 bg-success-50 shadow-success-shadow-medium": variant === "success",
          "border-warning-100 bg-warning-50 shadow-warning-shadow-medium": variant === "warning",
          "border-error-100 bg-error-50 shadow-error-shadow-medium": variant === "error",
        },
        className,
      )}
      ref={ref}
      {...otherProps}
    >
      {icon ? (
        <IconWrapper
          className={cn("text-heading-3 font-heading-3 text-neutral-800", {
            "text-success-1000": variant === "success",
            "text-warning-1000": variant === "warning",
            "text-error-1000": variant === "error",
          })}
        >
          {icon}
        </IconWrapper>
      ) : null}
      <div className="flex grow shrink-0 basis-0 flex-col items-start">
        {title ? (
          <span
            className={cn("w-full whitespace-pre-wrap text-body-bold font-body-bold text-default-font", {
              "text-success-1000": variant === "success",
              "text-warning-1000": variant === "warning",
              "text-error-1000": variant === "error",
            })}
          >
            {title}
          </span>
        ) : null}
        {description ? (
          <span
            className={cn("w-full whitespace-pre-wrap text-caption font-caption text-subtext-color", {
              "text-success-1000": variant === "success",
              "text-warning-1000": variant === "warning",
              "text-error-1000": variant === "error",
            })}
          >
            {description}
          </span>
        ) : null}
      </div>
      {actions ? <div className="flex items-center justify-end gap-1">{actions}</div> : null}
    </div>
  );
});
