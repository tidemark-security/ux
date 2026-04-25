"use client";

import React from "react";

import { cn } from "../../utils/cn";

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "label" | "subheader" | "section-header" | "header";
  className?: string;
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(function SkeletonText(
  { size = "default", className, ...otherProps },
  ref,
) {
  return (
    <div
      className={cn(
        "group/skeleton-text flex h-5 w-full animate-pulse flex-col items-start gap-2 rounded-md bg-neutral-200",
        {
          "h-10 w-full": size === "header",
          "h-9 w-full": size === "section-header",
          "h-7 w-full": size === "subheader",
          "h-4 w-full": size === "label",
        },
        className,
      )}
      ref={ref}
      {...otherProps}
    />
  );
});
