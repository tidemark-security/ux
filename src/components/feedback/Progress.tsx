"use client";

import React from "react";
import * as RadixProgress from "@radix-ui/react-progress";

import { cn } from "../../utils/cn";

export interface ProgressIndicatorProps extends React.ComponentPropsWithoutRef<typeof RadixProgress.Indicator> {
  className?: string;
}

const Indicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(function Indicator(
  { className, style, ...otherProps },
  ref,
) {
  return (
    <RadixProgress.Indicator
      className={cn("h-2 w-full bg-brand-600 transition-transform", className)}
      style={style}
      ref={ref}
      {...otherProps}
    />
  );
});

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof RadixProgress.Root> {
  value?: number;
  className?: string;
}

const ProgressRoot = React.forwardRef<HTMLDivElement, ProgressProps>(function ProgressRoot(
  { value = 30, children, className, ...otherProps },
  ref,
) {
  const safeValue = value ?? 0;

  return (
    <RadixProgress.Root
      className={cn("relative h-2 w-full overflow-hidden bg-brand-1000", className)}
      value={safeValue}
      ref={ref}
      {...otherProps}
    >
      {children ?? <Indicator style={{ transform: `translateX(-${100 - safeValue}%)` }} />}
    </RadixProgress.Root>
  );
});

export const Progress = Object.assign(ProgressRoot, {
  Indicator,
});
