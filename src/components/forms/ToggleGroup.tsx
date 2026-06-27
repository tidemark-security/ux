"use client";

import React from "react";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import { Star } from "lucide-react";

import { Tooltip } from "../overlays/Tooltip";
import { useTheme } from "../../contexts/ThemeContext";
import { IconWrapper } from "../../utils/IconWrapper";
import { cn } from "../../utils/cn";

export type ToggleGroupVariant = "default" | "compact-button" | "button" | "two-line-button";
export type ToggleGroupLabelDisplay = "inline" | "tooltip";

interface ToggleGroupContextValue {
  variant: ToggleGroupVariant;
  labelDisplay: ToggleGroupLabelDisplay;
  value?: string | string[];
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: "default",
  labelDisplay: "inline",
});

function getTextFromNode(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextFromNode).filter(Boolean).join(" ");
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getTextFromNode(node.props.children);
  }

  return "";
}

interface ItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixToggleGroup.Item>, "value"> {
  disabled?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  value?: string;
  className?: string;
  tooltip?: React.ReactNode;
  tooltipClassName?: string;
}

const Item = React.forwardRef<HTMLButtonElement, ItemProps>(function Item(
  { disabled = false, children, icon = <Star />, value, className, title, tooltip, tooltipClassName, ...otherProps },
  ref,
) {
  const { resolvedTheme } = useTheme();
  const { variant, labelDisplay, value: selectedValue } = React.useContext(ToggleGroupContext);
  const isSelected = Array.isArray(selectedValue)
    ? Boolean(value && selectedValue.includes(value))
    : Boolean(value && selectedValue === value);
  const selectedTextColorClass =
    resolvedTheme === "dark" ? "text-brand-primary" : "text-brand-700";
  const selectedTextClass =
    resolvedTheme === "dark"
      ? "group-data-[state=on]/56dea6ed:text-brand-primary group-aria-pressed/56dea6ed:text-brand-primary"
      : "group-data-[state=on]/56dea6ed:text-brand-700 group-aria-pressed/56dea6ed:text-brand-700";
  const hoverBackgroundClass =
    resolvedTheme === "dark"
      ? "hover:bg-neutral-100 active:bg-neutral-100"
      : "hover:bg-neutral-300 active:bg-neutral-300";
  const isCompactButtonVariant = variant === "compact-button";
  const isButtonVariant = variant === "button";
  const isTwoLineButtonVariant = variant === "two-line-button";
  const isLargeButtonVariant = isButtonVariant || isTwoLineButtonVariant;
  const usesSolidSelection =
    isCompactButtonVariant || isButtonVariant || isTwoLineButtonVariant;
  const fallbackTooltip = title ?? (labelDisplay === "tooltip" ? getTextFromNode(children) : undefined);
  const tooltipContent = tooltip ?? fallbackTooltip;
  const ariaLabel = otherProps["aria-label"] ?? (typeof fallbackTooltip === "string" ? fallbackTooltip : undefined);
  const hideChildrenForTooltip = labelDisplay === "tooltip" && !title;

  const button = (
    <RadixToggleGroup.Item
      value={value || ""}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "group/56dea6ed flex w-auto cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent",
        hoverBackgroundClass,
        "data-[state=on]:bg-default-background data-[state=on]:shadow-none aria-pressed:bg-default-background aria-pressed:shadow-none",
        isSelected && "bg-default-background shadow-none",
        isCompactButtonVariant
          ? "h-7 px-2 py-1 data-[state=on]:bg-brand-primary aria-pressed:bg-brand-primary"
          : isButtonVariant
          ? "min-h-14 min-w-24 flex-col gap-1 px-4 py-2 text-center data-[state=on]:bg-brand-primary aria-pressed:bg-brand-primary"
          : isTwoLineButtonVariant
            ? "min-h-14 min-w-32 flex-row justify-start gap-3 px-3 py-2 text-left data-[state=on]:bg-brand-primary aria-pressed:bg-brand-primary"
            : "h-7 px-2 py-1",
        {
          "cursor-not-allowed opacity-50 hover:bg-transparent active:bg-transparent": disabled,
          "bg-brand-primary": isSelected && usesSolidSelection,
        },
        className,
      )}
      ref={ref}
      {...otherProps}
    >
      {icon ? (
        <IconWrapper
          className={cn(
            "text-body font-body text-subtext-color",
            "group-hover/56dea6ed:text-default-font group-active/56dea6ed:text-default-font",
            "group-data-[state=on]/56dea6ed:scale-105 group-aria-pressed/56dea6ed:scale-105",
            usesSolidSelection
              ? "text-heading-3 font-heading-3 group-data-[state=on]/56dea6ed:text-black group-aria-pressed/56dea6ed:text-black"
              : selectedTextClass,
            isTwoLineButtonVariant && "flex-none",
            {
              "scale-105": isSelected,
              "text-black": isSelected && usesSolidSelection,
              [selectedTextColorClass]: isSelected && !usesSolidSelection,
              "text-neutral-400 group-hover/56dea6ed:text-neutral-400 group-active/56dea6ed:text-neutral-400":
                disabled,
            },
          )}
        >
          {icon}
        </IconWrapper>
      ) : null}
      {children ? (
        <span
          className={cn(
            "whitespace-nowrap text-caption-bold font-caption-bold text-subtext-color",
            "group-hover/56dea6ed:text-default-font group-active/56dea6ed:text-default-font",
            hideChildrenForTooltip && "sr-only",
            isCompactButtonVariant
              ? "group-data-[state=on]/56dea6ed:text-black group-aria-pressed/56dea6ed:text-black"
              : isButtonVariant
              ? "text-center group-data-[state=on]/56dea6ed:text-black group-aria-pressed/56dea6ed:text-black"
              : isTwoLineButtonVariant
                ? "min-w-0 text-left group-data-[state=on]/56dea6ed:text-black group-aria-pressed/56dea6ed:text-black"
                : "group-data-[state=on]/56dea6ed:underline group-data-[state=on]/56dea6ed:underline-offset-2 group-aria-pressed/56dea6ed:underline group-aria-pressed/56dea6ed:underline-offset-2",
            !usesSolidSelection && selectedTextClass,
            {
              "text-black": isSelected && usesSolidSelection,
              [selectedTextColorClass]: isSelected && !usesSolidSelection,
              "underline underline-offset-2": isSelected && !usesSolidSelection,
              "text-neutral-400 group-hover/56dea6ed:text-neutral-400 group-active/56dea6ed:text-neutral-400":
                disabled,
            },
          )}
        >
          {children}
        </span>
      ) : null}
    </RadixToggleGroup.Item>
  );

  if (!tooltipContent) {
    return button;
  }

  return (
    <Tooltip.Provider delayDuration={0} skipDelayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {button}
        </Tooltip.Trigger>
        <Tooltip.Content
          side="bottom"
          align="center"
          sideOffset={6}
          className={tooltipClassName}
        >
          {typeof tooltipContent === "string" || typeof tooltipContent === "number" ? (
            <span className="text-caption font-caption text-black">{tooltipContent}</span>
          ) : tooltipContent}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
});

type ToggleGroupSingleProps = {
  type?: "single";
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
  variant?: ToggleGroupVariant;
  labelDisplay?: ToggleGroupLabelDisplay;
};

type ToggleGroupMultipleProps = {
  type: "multiple";
  value?: string[];
  onValueChange?: (value: string[]) => void;
  children?: React.ReactNode;
  className?: string;
  variant?: ToggleGroupVariant;
  labelDisplay?: ToggleGroupLabelDisplay;
};

type ToggleGroupRootProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

const ToggleGroupRoot = React.forwardRef<HTMLDivElement, ToggleGroupRootProps>(
  function ToggleGroupRoot(props, ref) {
    const { children, className, variant = "default", labelDisplay = "inline" } = props;
    const rootClassName = cn(
      "flex flex-wrap items-center justify-center gap-0.5 overflow-hidden rounded-md bg-default-background px-0.5 py-0.5",
      (variant === "button" || variant === "two-line-button") && "items-stretch",
      className,
    );

    if (!children) {
      return null;
    }

    if (props.type === "multiple") {
      const { value = [], onValueChange } = props;

      return (
        <ToggleGroupContext.Provider value={{ variant, labelDisplay, value }}>
          <RadixToggleGroup.Root
            type="multiple"
            value={value}
            onValueChange={onValueChange}
            className={rootClassName}
            ref={ref}
          >
            {children}
          </RadixToggleGroup.Root>
        </ToggleGroupContext.Provider>
      );
    }

    const { value, onValueChange } = props;

    return (
      <ToggleGroupContext.Provider value={{ variant, labelDisplay, value }}>
        <RadixToggleGroup.Root
          type="single"
          value={value}
          onValueChange={onValueChange}
          className={rootClassName}
          ref={ref}
        >
          {children}
        </RadixToggleGroup.Root>
      </ToggleGroupContext.Provider>
    );
  },
);

export const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Item,
});
