"use client";

import React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";

import { cn } from "../../utils/cn";

interface ThumbProps extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Thumb> {
  className?: string;
}

const Thumb = React.forwardRef<HTMLSpanElement, ThumbProps>(function Thumb(
  { className, ...otherProps },
  ref,
) {
  return (
    <RadixSwitch.Thumb
      className={cn(
        "relative z-10 h-4 w-4 bg-black",
        "data-[state=checked]:translate-x-6 transition-transform",
        className,
      )}
      ref={ref}
      {...otherProps}
    />
  );
});

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  checked?: boolean;
  label?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

const SwitchRoot = React.forwardRef<HTMLButtonElement, SwitchProps>(function SwitchRoot(
  { checked, defaultChecked, label = false, onCheckedChange, className, ...otherProps },
  ref,
) {
  const isControlled = checked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(Boolean(defaultChecked));
  const currentChecked = isControlled ? checked : uncontrolledChecked;

  const handleCheckedChange = React.useCallback(
    (nextChecked: boolean) => {
      if (!isControlled) {
        setUncontrolledChecked(nextChecked);
      }
      onCheckedChange?.(nextChecked);
    },
    [isControlled, onCheckedChange],
  );

  const root = (
    <RadixSwitch.Root
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={handleCheckedChange}
      className={cn(
        "group/7a464794 relative inline-flex h-6 w-12 cursor-pointer items-center border border-solid border-neutral-300 bg-neutral-200 px-1 py-1",
        "data-[state=checked]:border data-[state=checked]:border-solid data-[state=checked]:border-brand-primary data-[state=checked]:bg-brand-500",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...otherProps}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-2 text-[10px] font-semibold leading-none transition-colors",
          currentChecked ? "text-black/75" : "text-transparent",
        )}
      >
        I
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-2 text-[10px] font-semibold leading-none transition-colors",
          currentChecked ? "text-transparent" : "text-neutral-1000/75",
        )}
      >
        O
      </span>
      <Thumb />
    </RadixSwitch.Root>
  );

  if (!label) {
    return root;
  }

  return (
    <span className="inline-flex items-center gap-2 align-middle">
      <span className="min-w-6 text-caption-bold font-caption-bold text-subtext-color">
        {currentChecked ? "On" : "Off"}
      </span>
      {root}
    </span>
  );
});

export const Switch = Object.assign(SwitchRoot, {
  Thumb,
});
