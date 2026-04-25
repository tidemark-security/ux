"use client";

import React from "react";

import { cn } from "../../utils/cn";

export interface SkeletonCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "small" | "x-small";
  className?: string;
}

export const SkeletonCircle = React.forwardRef<HTMLDivElement, SkeletonCircleProps>(function SkeletonCircle(
  { size = "default", className, ...otherProps },
  ref,
) {
  return (
    <div
      className={cn(
        "group/skeleton-circle flex h-9 w-9 animate-pulse flex-col items-start gap-2 rounded-full bg-neutral-200",
        { "h-5 w-5": size === "x-small", "h-7 w-7": size === "small" },
        className,
      )}
      ref={ref}
      {...otherProps}
    />
  );
});
