"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useOptionalTheme } from "../../contexts/ThemeContext";
import { cn } from "../../utils/cn";

export type CarouselControlSize = "mini" | "medium" | "large";

export interface CarouselControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Total number of items in the carousel */
  count: number;
  /** Index of the currently active item */
  index: number;
  /** Called to move to the previous item */
  onPrevious: () => void;
  /** Called to move to the next item */
  onNext: () => void;
  /** Called when a specific dot is selected. When omitted, dots are not interactive. */
  onSelect?: (index: number) => void;
  /** Size of the control. Defaults to "mini". */
  size?: CarouselControlSize;
  /** Accessible label describing a single item (e.g. "tip", "slide") */
  itemLabel?: string;
  className?: string;
}

const sizeStyles: Record<
  CarouselControlSize,
  {
    container: string;
    button: string;
    icon: string;
    dots: string;
    dot: string;
    dotActive: string;
    dotInactive: string;
  }
> = {
  mini: {
    container: "gap-2",
    button: "h-5 w-5",
    icon: "h-3.5 w-3.5",
    dots: "gap-1.5",
    dot: "h-1.5",
    dotActive: "w-4",
    dotInactive: "w-1.5",
  },
  medium: {
    container: "gap-3",
    button: "h-7 w-7",
    icon: "h-4 w-4",
    dots: "gap-2",
    dot: "h-2",
    dotActive: "w-6",
    dotInactive: "w-2",
  },
  large: {
    container: "gap-4",
    button: "h-9 w-9",
    icon: "h-5 w-5",
    dots: "gap-2.5",
    dot: "h-2.5",
    dotActive: "w-8",
    dotInactive: "w-2.5",
  },
};

/**
 * Discrete carousel controls: previous / next chevrons flanking a row of
 * position markers. The active item is shown as an elongated bar
 * ("< · · — · >"). Markers are square to match the brand's flat-surface style.
 *
 * Pair with a `group` parent and a subtle opacity class
 * (e.g. `className="opacity-60 group-hover:opacity-100"`) to keep it
 * unobtrusive but discoverable.
 */
export const CarouselControl = React.forwardRef<HTMLDivElement, CarouselControlProps>(
  function CarouselControl(
    { count, index, onPrevious, onNext, onSelect, size = "mini", itemLabel = "item", className, ...otherProps },
    ref,
  ) {
    const theme = useOptionalTheme();

    if (count <= 1) return null;

    // The active marker matches the brand in dark mode, but in light mode it
    // adopts the chevrons' color (`subtext-color`) so the control reads as one
    // cohesive piece rather than a stray lime bar.
    const isLightTheme = theme?.resolvedTheme === "light";
    const dotActiveColor = isLightTheme ? "bg-subtext-color" : "bg-brand-primary";

    const styles = sizeStyles[size];
    const buttonClass = cn(
      "flex items-center justify-center text-subtext-color transition-colors hover:text-default-font focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
      styles.button,
    );

    return (
      <div
        className={cn("flex items-center justify-center", styles.container, className)}
        ref={ref}
        {...otherProps}
      >
        <button type="button" onClick={onPrevious} className={buttonClass} aria-label={`Previous ${itemLabel}`}>
          <ChevronLeft className={styles.icon} aria-hidden="true" />
        </button>

        <div className={cn("flex items-center", styles.dots)}>
          {Array.from({ length: count }, (_, i) => {
            const isActive = i === index;
            const dot = (
              <span
                className={cn(
                  "block transition-all",
                  styles.dot,
                  isActive ? cn(styles.dotActive, dotActiveColor) : cn(styles.dotInactive, "bg-neutral-border"),
                )}
              />
            );

            return onSelect ? (
              <button
                key={i}
                type="button"
                onClick={() => onSelect(i)}
                className="flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label={`Go to ${itemLabel} ${i + 1}`}
                aria-current={isActive ? "true" : undefined}
              >
                {dot}
              </button>
            ) : (
              <React.Fragment key={i}>{dot}</React.Fragment>
            );
          })}
        </div>

        <button type="button" onClick={onNext} className={buttonClass} aria-label={`Next ${itemLabel}`}>
          <ChevronRight className={styles.icon} aria-hidden="true" />
        </button>
      </div>
    );
  },
);
