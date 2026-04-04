"use client";

import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

import { usePortalContainer } from "../../contexts/PortalContainerContext";
import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../utils/cn";

export const TooltipProvider = RadixTooltip.Provider;
export const TooltipRoot = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;
export const TooltipPortal = RadixTooltip.Portal;
export const TooltipArrow = RadixTooltip.Arrow;

interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixTooltip.Content> {
  children?: React.ReactNode;
  className?: string;
}

export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent({ children, className, sideOffset = 4, ...otherProps }, ref) {
    const portalContainer = usePortalContainer();
    const { resolvedTheme } = useTheme();
    const isDarkTheme = resolvedTheme === "dark";

    return (
      <RadixTooltip.Portal container={portalContainer}>
        <RadixTooltip.Content
          className={cn(
            "flex flex-col items-start gap-2 rounded-md border border-solid border-neutral-900 px-2 py-1 shadow-sm",
            isDarkTheme ? "bg-neutral-800" : "bg-neutral-100",
            "z-[var(--z-tooltip)]",
            "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          sideOffset={sideOffset}
          ref={ref}
          {...otherProps}
        >
          {children ? <span className="text-caption font-caption text-black">{children}</span> : null}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    );
  },
);

interface TooltipStyledProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const TooltipStyled = React.forwardRef<HTMLDivElement, TooltipStyledProps>(function TooltipStyled(
  { children, className, ...otherProps },
  ref,
) {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  return (
    <div
      className={cn(
        "z-[var(--z-tooltip)] flex flex-col items-start gap-2 rounded-md border border-solid border-neutral-900 px-2 py-1 shadow-sm",
        isDarkTheme ? "bg-neutral-800" : "bg-neutral-100",
        className,
      )}
      ref={ref}
      {...otherProps}
    >
      {children ? <span className="text-caption font-caption text-black">{children}</span> : null}
    </div>
  );
});

export const Tooltip = Object.assign(TooltipStyled, {
  Provider: RadixTooltip.Provider,
  Root: RadixTooltip.Root,
  Trigger: RadixTooltip.Trigger,
  Portal: RadixTooltip.Portal,
  Content: TooltipContent,
  Arrow: RadixTooltip.Arrow,
});