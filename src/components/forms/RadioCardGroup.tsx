"use client";

import React from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";

import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../utils/cn";

export interface RadioCardProps extends React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Item> {
  disabled?: boolean;
  hideRadio?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const RadioCard = React.forwardRef<HTMLButtonElement, RadioCardProps>(function RadioCard(
  { disabled = false, hideRadio = false, children, className, ...otherProps },
  ref,
) {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  return (
    <RadixRadioGroup.Item disabled={disabled} asChild {...otherProps}>
      <button
        className={cn(
          "group/radio-card flex w-full cursor-pointer items-center gap-4 rounded-sm border border-solid border-neutral-border bg-neutral-0 px-4 py-3 text-left",
          {
            "text-[#fafafaff] hover:border-brand-primary hover:text-brand-400": isDarkTheme,
            "text-default-font hover:border-neutral-900 hover:bg-neutral-100": !isDarkTheme,
            "data-[state=checked]:border-accent-1-primary data-[state=checked]:text-accent-1-400": isDarkTheme,
            "data-[state=checked]:border-neutral-900 data-[state=checked]:bg-neutral-300": !isDarkTheme,
            "data-[state=checked]:hover:border-accent-1-primary data-[state=checked]:hover:text-accent-1-400":
              isDarkTheme,
            "data-[state=checked]:hover:border-neutral-900 data-[state=checked]:hover:bg-neutral-300": !isDarkTheme,
            "disabled:cursor-default disabled:border-neutral-100 disabled:bg-neutral-50 disabled:text-subtext-color hover:disabled:cursor-default hover:disabled:bg-neutral-50":
              true,
          },
          className,
        )}
        ref={ref}
      >
        <div className={cn("flex items-start gap-2 rounded-full pt-0.5", { hidden: hideRadio })}>
          <div
            className={cn(
              "flex h-4 w-4 flex-none flex-col items-center justify-center gap-2 rounded-full border-2 border-solid border-neutral-300 group-data-[state=checked]/radio-card:border-2 group-data-[state=checked]/radio-card:border-solid group-disabled/radio-card:border-2 group-disabled/radio-card:border-solid group-disabled/radio-card:border-neutral-300 group-disabled/radio-card:bg-neutral-100",
              {
                "group-data-[state=checked]/radio-card:border-accent-1-primary": isDarkTheme,
                "group-data-[state=checked]/radio-card:border-neutral-900": !isDarkTheme,
              },
            )}
          >
            <div
              className={cn(
                "hidden h-2 w-2 flex-none flex-col items-start gap-2 rounded-full bg-black group-data-[state=checked]/radio-card:flex group-disabled/radio-card:bg-neutral-300",
                {
                  "group-data-[state=checked]/radio-card:bg-accent-1-primary": isDarkTheme,
                  "group-data-[state=checked]/radio-card:bg-neutral-900": !isDarkTheme,
                },
              )}
            />
          </div>
        </div>
        {children ? <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">{children}</div> : null}
      </button>
    </RadixRadioGroup.Item>
  );
});

export interface RadioCardGroupProps extends React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root> {
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const RadioCardGroupRoot = React.forwardRef<HTMLDivElement, RadioCardGroupProps>(function RadioCardGroupRoot(
  { children, className, ...otherProps },
  ref,
) {
  return children ? (
    <RadixRadioGroup.Root asChild {...otherProps}>
      <div className={cn("flex items-start gap-2", className)} ref={ref}>
        {children}
      </div>
    </RadixRadioGroup.Root>
  ) : null;
});

export const RadioCardGroup = Object.assign(RadioCardGroupRoot, {
  RadioCard,
});
