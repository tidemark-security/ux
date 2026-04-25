"use client";

import React from "react";
import { Info } from "lucide-react";

import { IconWrapper } from "../../utils/IconWrapper";
import { cn } from "../../utils/cn";

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: "brand" | "neutral" | "error" | "success" | "warning";
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = "neutral", icon = <Info />, title, description, actions, className, ...otherProps },
  ref,
) {
  return (
    <div
      className={cn(
        "group/alert flex w-full flex-col items-start gap-2 rounded-md border border-solid border-neutral-200 bg-neutral-50 py-3 pl-4 pr-3",
        {
          "border-warning-100 bg-warning-50": variant === "warning",
          "border-success-100 bg-success-50": variant === "success",
          "border-error-100 bg-error-50": variant === "error",
          "border-brand-100 bg-brand-50": variant === "brand",
        },
        className,
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex w-full items-center gap-4">
        {icon ? (
          <IconWrapper
            className={cn("text-heading-3 font-heading-3 text-neutral-800", {
              "text-warning-1000": variant === "warning",
              "text-success-1000": variant === "success",
              "text-error-1000": variant === "error",
              "text-brand-1000": variant === "brand",
            })}
          >
            {icon}
          </IconWrapper>
        ) : null}
        <div className="flex grow shrink-0 basis-0 flex-col items-start">
          {title ? (
            <span
              className={cn("w-full whitespace-pre-wrap text-body-bold font-body-bold text-default-font", {
                "text-warning-1000": variant === "warning",
                "text-success-1000": variant === "success",
                "text-error-1000": variant === "error",
                "text-brand-1000": variant === "brand",
              })}
            >
              {title}
            </span>
          ) : null}
          {description ? (
            <span
              className={cn("w-full whitespace-pre-wrap text-caption font-caption text-subtext-color", {
                "text-warning-1000": variant === "warning",
                "text-success-1000": variant === "success",
                "text-error-1000": variant === "error",
                "text-brand-1000": variant === "brand",
              })}
            >
              {description}
            </span>
          ) : null}
        </div>
        {actions ? <div className="flex items-center justify-end gap-1">{actions}</div> : null}
      </div>
    </div>
  );
});
