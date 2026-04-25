"use client";

import React from "react";

import { useTheme } from "../../contexts/ThemeContext";
import { Loader } from "../feedback/Loader";
import { IconWrapper } from "../../utils/IconWrapper";
import { cn } from "../../utils/cn";

type ButtonVariant =
  | "brand-primary"
  | "brand-secondary"
  | "brand-tertiary"
  | "neutral-primary"
  | "neutral-secondary"
  | "neutral-tertiary"
  | "destructive-primary"
  | "destructive-secondary"
  | "destructive-tertiary";

type ButtonSize = "large" | "medium" | "small";

type ButtonVariantStyles = {
  button: string;
  icon: string;
  label: string;
  loader: string;
};

const BUTTON_SIZE_STYLES: Record<ButtonSize, string> = {
  small: "h-6 w-auto flex-row flex-nowrap gap-1 px-2 py-0",
  medium: "",
  large: "h-10 w-auto px-4 py-0",
};

const BUTTON_VARIANT_STYLES: Record<ButtonVariant, ButtonVariantStyles> = {
  "brand-primary": {
    button: "",
    icon: "",
    label: "",
    loader: "",
  },
  "brand-secondary": {
    button:
      "border border-solid border-brand-600 bg-default-background hover:bg-brand-600/10 active:bg-brand-600/5",
    icon: "text-brand-600",
    label: "text-brand-600",
    loader: "text-brand-600",
  },
  "brand-tertiary": {
    button: "bg-transparent hover:bg-brand-600/10 active:bg-brand-600/5",
    icon: "text-brand-600",
    label: "text-brand-600",
    loader: "text-brand-600",
  },
  "neutral-primary": {
    button:
      "border border-solid border-neutral-300 bg-neutral-100 hover:bg-neutral-50 active:bg-neutral-200",
    icon: "text-neutral-900",
    label: "text-neutral-900",
    loader: "text-neutral-900",
  },
  "neutral-secondary": {
    button:
      "border border-solid border-neutral-300 bg-default-background hover:bg-neutral-100 active:bg-neutral-50",
    icon: "text-neutral-900",
    label: "text-neutral-900",
    loader: "text-neutral-900",
  },
  "neutral-tertiary": {
    button: "bg-transparent hover:bg-neutral-100 active:bg-neutral-50",
    icon: "text-neutral-900",
    label: "text-neutral-900",
    loader: "text-neutral-900",
  },
  "destructive-primary": {
    button:
      "border border-solid border-error-700 bg-error-600 hover:bg-error-500 active:bg-error-700",
    icon: "text-black",
    label: "text-black",
    loader: "text-black",
  },
  "destructive-secondary": {
    button:
      "border border-solid border-error-600 bg-default-background hover:bg-error-600/10 active:bg-error-600/5",
    icon: "text-error-600",
    label: "text-error-600",
    loader: "text-error-600",
  },
  "destructive-tertiary": {
    button: "bg-transparent hover:bg-error-600/10 active:bg-error-600/5",
    icon: "text-error-600",
    label: "text-error-600",
    loader: "text-error-600",
  },
};

function getButtonVariantStyles(
  variant: ButtonVariant,
  isDarkTheme: boolean,
): ButtonVariantStyles {
  const baseStyles = BUTTON_VARIANT_STYLES[variant];

  // Adjust colors based on theme
  if (!isDarkTheme) {
    // Light mode: darker colors for better contrast
    const lightModeOverrides: Partial<
      Record<ButtonVariant, Partial<ButtonVariantStyles>>
    > = {
      "brand-secondary": {
        button:
          "border border-solid border-brand-800 bg-default-background hover:bg-brand-800/10 active:bg-brand-800/5",
        icon: "text-brand-800",
        label: "text-brand-800",
        loader: "text-brand-800",
      },
      "brand-tertiary": {
        button: "bg-transparent hover:bg-brand-800/10 active:bg-brand-800/5",
        icon: "text-brand-800",
        label: "text-brand-800",
        loader: "text-brand-800",
      },
      "destructive-secondary": {
        button:
          "border border-solid border-error-800 bg-default-background hover:bg-error-800/10 active:bg-error-800/5",
        icon: "text-error-800",
        label: "text-error-800",
        loader: "text-error-800",
      },
      "destructive-tertiary": {
        button: "bg-transparent hover:bg-error-800/10 active:bg-error-800/5",
        icon: "text-error-800",
        label: "text-error-800",
        loader: "text-error-800",
      },
    };

    return {
      ...baseStyles,
      ...lightModeOverrides[variant],
      button: cn(
        baseStyles.button,
        variant === "brand-primary" && "border border-solid border-brand-700",
      ),
    };
  }

  return {
    ...baseStyles,
    button: cn(
      baseStyles.button,
      variant === "brand-primary" && "border border-solid border-brand-700",
    ),
  };
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function ButtonRoot(
    {
      disabled = false,
      variant = "brand-primary",
      size = "medium",
      children,
      icon = null,
      iconRight = null,
      loading = false,
      className,
      type = "button",
      ...otherProps
    },
    ref,
  ) {
    const { resolvedTheme } = useTheme();
    const isDarkTheme = resolvedTheme === "dark";
    const variantStyles = getButtonVariantStyles(variant, isDarkTheme);

    return (
      <button
        className={cn(
          "group/3b777358 flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border-none bg-brand-primary px-3 hover:bg-brand-300 active:bg-brand-600 disabled:cursor-default disabled:bg-neutral-200 hover:disabled:cursor-default hover:disabled:bg-neutral-200 active:disabled:cursor-default active:disabled:bg-neutral-200",
          BUTTON_SIZE_STYLES[size],
          variantStyles.button,
          className,
        )}
        ref={ref}
        type={type}
        disabled={disabled}
        {...otherProps}
      >
        {icon ? (
          <IconWrapper
            className={cn(
              "text-body font-body text-black group-disabled/3b777358:text-neutral-400",
              loading && "hidden",
              size === "large" && "text-heading-3 font-heading-3",
              variantStyles.icon,
            )}
          >
            {icon}
          </IconWrapper>
        ) : null}
        <div
          className={cn(
            "hidden h-4 w-4 flex-none items-center justify-center gap-2",
            {
              flex: loading,
              "h-3 w-3 flex-none": size === "small",
            },
          )}
        >
          <Loader
            size="small"
            className={cn(
              "text-caption font-caption text-black group-disabled/3b777358:text-neutral-400",
              loading &&
                "inline-block font-['Inter'] text-[12px] font-[400] leading-[20px] tracking-normal",
              variantStyles.loader,
            )}
          />
        </div>
        {children ? (
          <span
            className={cn(
              "whitespace-nowrap text-body-bold font-body-bold text-black group-disabled/3b777358:text-neutral-400",
              loading && "hidden",
              size === "small" && "text-caption-bold font-caption-bold",
              variantStyles.label,
            )}
          >
            {children}
          </span>
        ) : null}
        {iconRight ? (
          <IconWrapper
            className={cn(
              "text-body font-body text-black group-disabled/3b777358:text-neutral-400",
              size === "large" && "text-heading-3 font-heading-3",
              variantStyles.icon,
            )}
          >
            {iconRight}
          </IconWrapper>
        ) : null}
      </button>
    );
  },
);

export const Button = ButtonRoot;
