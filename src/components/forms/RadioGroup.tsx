"use client";

import React from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";

import { cn } from "../../utils/cn";

interface OptionProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>, "checked"> {
  label?: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  className?: string;
}

const Option = React.forwardRef<HTMLButtonElement, OptionProps>(function Option(
  { label, disabled = false, checked = false, className, ...otherProps },
  ref,
) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <RadixRadioGroup.Item
        disabled={disabled}
        className={cn(
          "group/0f804ad9 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border-2 border-solid border-neutral-300 bg-default-background",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
          "active:border-brand-700",
          "data-[state=checked]:border-brand-600",
          "disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-100",
        )}
        ref={ref}
        {...otherProps}
      >
        <RadixRadioGroup.Indicator className="flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-brand-600 data-[disabled]:bg-neutral-200" />
        </RadixRadioGroup.Indicator>
      </RadixRadioGroup.Item>
      {label ? (
        <span
          className={cn(
            "cursor-pointer text-body font-body text-default-font",
            disabled && "cursor-not-allowed text-subtext-color",
          )}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
});

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root> {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  error?: boolean;
  horizontal?: boolean;
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const RadioGroupRoot = React.forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroupRoot(
  { label, helpText, error = false, horizontal = false, children, className, ...otherProps },
  ref,
) {
  return (
    <RadixRadioGroup.Root
      className={cn("group/c4b6300e flex flex-col items-start gap-2", className)}
      ref={ref}
      {...otherProps}
    >
      {label ? <span className="text-body-bold font-body-bold text-default-font">{label}</span> : null}
      {children ? (
        <div className={cn("flex flex-col items-start gap-2", { "flex-row flex-nowrap gap-6": horizontal })}>
          {children}
        </div>
      ) : null}
      {helpText ? (
        <span className={cn("text-caption font-caption text-subtext-color", { "text-error-700": error })}>
          {helpText}
        </span>
      ) : null}
    </RadixRadioGroup.Root>
  );
});

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Option,
});