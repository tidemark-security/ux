"use client";

import React from "react";
import { Check, Minus } from "lucide-react";

import { useOptionalTheme } from "../../contexts/ThemeContext";
import { cn } from "../../utils/cn";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: "small" | "medium";
  inputClassName?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    checked = false,
    indeterminate = false,
    disabled = false,
    className,
    inputClassName,
    onCheckedChange,
    onChange,
    size = "medium",
    ...otherProps
  },
  forwardedRef,
) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const theme = useOptionalTheme();
  const isDarkTheme =
    theme?.resolvedTheme === "dark" ||
    (!theme && typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark");
  const isMarked = checked || indeterminate;

  React.useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center align-middle",
        size === "small" ? "h-4 w-4" : "h-5 w-5",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => {
          onChange?.(event);
          onCheckedChange?.(event.target.checked);
        }}
        className={cn("peer sr-only", inputClassName)}
        {...otherProps}
      />
      <span
        aria-hidden="true"
        className={cn(
          "flex items-center justify-center rounded-sm border border-solid transition-colors",
          size === "small" ? "h-4 w-4" : "h-5 w-5",
          isMarked
            ? isDarkTheme
              ? "border-brand-primary bg-brand-primary text-default-background"
              : "border-black bg-black text-white"
            : isDarkTheme
              ? "border-neutral-border bg-default-background text-transparent"
              : "border-black bg-white text-transparent",
          !disabled && "peer-focus-visible:border-brand-primary peer-focus-visible:shadow-sm",
          disabled && !isMarked && "border-neutral-border bg-neutral-100 text-transparent opacity-50",
          disabled && isMarked && (
            isDarkTheme
              ? "border-neutral-700 bg-neutral-800 text-neutral-50 opacity-70"
              : "border-neutral-300 bg-neutral-100 text-black opacity-70"
          ),
        )}
      >
        {indeterminate ? (
          <Minus className={size === "small" ? "h-3 w-3" : "h-3.5 w-3.5"} />
        ) : checked ? (
          <Check className={size === "small" ? "h-3 w-3" : "h-3.5 w-3.5"} />
        ) : null}
      </span>
    </label>
  );
});
