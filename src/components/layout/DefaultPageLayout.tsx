"use client";

import React from "react";

import { cn } from "../../utils/cn";

export interface DefaultPageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  priority?:
    | "info"
    | "low"
    | "medium"
    | "high"
    | "critical"
    | "extreme"
    | "INFO"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL"
    | "EXTREME";
  withContainer?: boolean;
  desktopSidebar?: React.ReactNode;
  mobileSidebar?: React.ReactNode;
  overlaySlot?: React.ReactNode;
  contentClassName?: string;
  containerClassName?: string;
}

const DefaultPageLayoutRoot = React.forwardRef<HTMLDivElement, DefaultPageLayoutProps>(
  function DefaultPageLayoutRoot(
    {
      children,
      className,
      priority,
      withContainer,
      desktopSidebar,
      mobileSidebar,
      overlaySlot,
      contentClassName,
      containerClassName,
      ...otherProps
    },
    ref,
  ) {
    const normalizedPriority = priority?.toLowerCase();

    const gradient =
      normalizedPriority === "extreme"
        ? "bg-p0/60"
        : normalizedPriority === "critical"
          ? "bg-p1"
          : normalizedPriority === "high"
            ? "bg-p2/60"
            : normalizedPriority === "medium"
              ? "bg-p3/60"
              : normalizedPriority === "low"
                ? "bg-p4/60"
                : normalizedPriority === "info"
                  ? "bg-p5/50"
                  : "bg-transparent";

    return (
      <div
        className={cn(
          "flex h-screen w-full items-center justify-center bg-p0 mobile:flex-col mobile:flex-nowrap mobile:items-end mobile:justify-center mobile:gap-0",
          className,
        )}
        ref={ref}
        {...otherProps}
      >
        {desktopSidebar}
        {children ? (
          <div className="relative flex grow shrink-0 basis-0 self-stretch overflow-hidden bg-page-background">
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                maskImage: "linear-gradient(0deg, black, transparent 45%)",
                WebkitMaskImage: "linear-gradient(0deg, black, transparent 65%)",
              }}
            >
              <div
                className={cn("absolute inset-0 transition-colors duration-500 mobile:bg-transparent", gradient)}
                style={{
                  maskImage:
                    "repeating-linear-gradient(135deg, transparent, transparent 20px, black 20px, black 40px)",
                  WebkitMaskImage:
                    "repeating-linear-gradient(135deg, transparent, transparent 20px, black 20px, black 40px)",
                }}
              />
            </div>
            <div className={cn("relative z-10 flex h-full w-full flex-col items-start gap-4 overflow-y-auto", { "p-4 mobile:p-0": !!withContainer }, contentClassName)}>
              {withContainer ? (
                <div className={cn("flex w-full flex-1 flex-col items-start bg-default-background bevel-tr-3xl", containerClassName)}>
                  {children}
                </div>
              ) : (
                children
              )}
            </div>
          </div>
        ) : null}
        {mobileSidebar}
        {overlaySlot}
      </div>
    );
  },
);

export const DefaultPageLayout = DefaultPageLayoutRoot;