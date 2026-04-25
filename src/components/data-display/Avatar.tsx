"use client";

import React from "react";

import { cn } from "../../utils/cn";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "brand" | "neutral" | "error" | "success" | "warning";
  size?: "x-large" | "large" | "medium" | "small" | "x-small";
  children?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  square?: boolean;
  className?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {
    variant = "brand",
    size = "medium",
    children,
    image,
    imageAlt = "",
    square = false,
    className,
    ...otherProps
  },
  ref,
) {
  return (
    <div
      className={cn(
        "group/avatar relative flex h-8 w-8 flex-col items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-100",
        {
          "rounded-md": square,
          "h-5 w-5": size === "x-small",
          "h-6 w-6": size === "small",
          "h-12 w-12": size === "large",
          "h-16 w-16": size === "x-large",
          "bg-warning-100": variant === "warning",
          "bg-success-100": variant === "success",
          "bg-error-100": variant === "error",
          "bg-neutral-100": variant === "neutral",
        },
        className,
      )}
      ref={ref}
      {...otherProps}
    >
      {children ? (
        <span
          className={cn(
            "absolute line-clamp-1 w-full text-center font-['Inter'] text-[14px] font-[500] leading-[14px] text-brand-1000",
            {
              "font-['Inter'] text-[10px] font-[500] leading-[10px] tracking-normal":
                size === "x-small" || size === "small",
              "font-['Inter'] text-[18px] font-[500] leading-[18px] tracking-normal": size === "large",
              "font-['Inter'] text-[24px] font-[500] leading-[24px] tracking-normal": size === "x-large",
              "text-warning-1000": variant === "warning",
              "text-success-1000": variant === "success",
              "text-error-1000": variant === "error",
              "text-neutral-900": variant === "neutral",
            },
          )}
        >
          {children}
        </span>
      ) : null}
      {image ? (
        <img
          className={cn("absolute h-8 w-8 flex-none object-cover", {
            "h-5 w-5 flex-none": size === "x-small",
            "h-6 w-6 flex-none": size === "small",
            "h-12 w-12 flex-none": size === "large",
            "h-16 w-16 flex-none": size === "x-large",
            "border-none object-cover": variant === "neutral",
          })}
          src={image}
          alt={imageAlt}
        />
      ) : null}
    </div>
  );
});
