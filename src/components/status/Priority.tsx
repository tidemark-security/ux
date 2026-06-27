"use client";

import React from "react";
import { BellRing, ChevronDown, ChevronUp, ChevronsDown, ChevronsUp, Info } from "lucide-react";

import { cn } from "../../utils/cn";

export interface PriorityProps extends React.HTMLAttributes<HTMLDivElement> {
  priority?: "info" | "low" | "medium" | "high" | "critical" | "extreme";
  size?: "small" | "mini" | "maxi";
  className?: string;
}

const PRIORITY_LABELS: Record<NonNullable<PriorityProps["priority"]>, string[]> = {
  extreme: ["Extreme (Priority 0)", "Extreme (P0)", "P0"],
  critical: ["Critical (Priority 1)", "Critical (P1)", "P1"],
  high: ["High (Priority 2)", "High (P2)", "P2"],
  medium: ["Medium (Priority 3)", "Medium (P3)", "P3"],
  low: ["Low (Priority 4)", "Low (P4)", "P4"],
  info: ["Informational (Priority 5)", "Info (Priority 5)", "Info (P5)", "P5"],
};

const PriorityRoot = React.forwardRef<HTMLDivElement, PriorityProps>(function PriorityRoot(
  { priority = "info", size = "small", className, ...otherProps },
  ref,
) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const labelRef = React.useRef<HTMLSpanElement | null>(null);
  const measurementRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
  const labels = PRIORITY_LABELS[priority] ?? PRIORITY_LABELS.info;
  const [visibleLabel, setVisibleLabel] = React.useState(() => labels[0]);
  const setRootRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  const isExtreme = priority === "extreme";
  const isCritical = priority === "critical";
  const isHigh = priority === "high";
  const isMedium = priority === "medium";
  const isLow = priority === "low";
  const highlightPriority = isExtreme || isCritical || isHigh || isMedium;
  const isInfo = !isExtreme && !isCritical && !isHigh && !isMedium && !isLow;

  React.useLayoutEffect(() => {
    if (size === "mini") {
      setVisibleLabel(labels[labels.length - 1]);
      return;
    }

    const root = rootRef.current;
    const labelElement = labelRef.current;
    if (!root || !labelElement) {
      return;
    }

    const updateLabelMode = () => {
      const availableWidth = labelElement.getBoundingClientRect().width;
      const nextLabel =
        labels.find((_, index) => {
          const measurementElement = measurementRefs.current[index];
          return measurementElement
            ? measurementElement.getBoundingClientRect().width <= availableWidth + 0.5
            : false;
        }) ?? labels[labels.length - 1];

      setVisibleLabel(nextLabel);
    };

    updateLabelMode();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const resizeObserver = new ResizeObserver(updateLabelMode);
    resizeObserver.observe(root);
    resizeObserver.observe(labelElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [labels, size]);

  return (
    <div
      className={cn(
        "group/58f5a1fe flex h-6 min-w-0 max-w-full items-center justify-center gap-1 overflow-hidden rounded-md border border-solid border-neutral-border px-2",
        {
          "h-9 min-w-48": size === "maxi",
          "h-6 w-14": size === "mini",
          "bg-p0": isExtreme,
          "bg-p1": isCritical,
          "bg-p2": isHigh,
          "bg-p3": isMedium,
          "bg-p4": isLow,
          "bg-p5": isInfo,
        },
        className,
      )}
      ref={setRootRefs}
      {...otherProps}
    >
      {isExtreme ? (
        <BellRing className={cn("text-body font-body text-black", { "text-heading-2 font-heading-2": size === "maxi", "text-white": highlightPriority })} />
      ) : isCritical ? (
        <ChevronsUp className={cn("text-body font-body text-black", { "text-heading-2 font-heading-2": size === "maxi", "text-white": highlightPriority })} />
      ) : isHigh ? (
        <ChevronUp className={cn("text-body font-body text-black", { "text-heading-2 font-heading-2": size === "maxi", "text-white": highlightPriority })} />
      ) : isMedium ? (
        <ChevronDown className={cn("text-body font-body text-black", { "text-heading-2 font-heading-2": size === "maxi", "text-white": highlightPriority })} />
      ) : isLow ? (
        <ChevronsDown className={cn("text-body font-body text-black", { "text-heading-2 font-heading-2": size === "maxi", "text-white": highlightPriority })} />
      ) : (
        <Info className={cn("text-body font-body text-black", { "text-heading-2 font-heading-2": size === "maxi", "text-white": highlightPriority })} />
      )}
      <span
        ref={labelRef}
        className={cn(
          "relative min-w-0 grow shrink basis-0 whitespace-nowrap text-center text-caption font-caption text-black",
          {
            "text-heading-2 font-heading-2": size === "maxi",
            "grow-0 shrink-0 basis-auto": size === "mini",
            "text-white": highlightPriority,
          },
        )}
      >
        {labels.map((measurementLabel, index) => (
          <span
            key={`${measurementLabel}-${index}`}
            ref={(node) => {
              measurementRefs.current[index] = node;
            }}
            aria-hidden="true"
            className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap"
          >
            {measurementLabel}
          </span>
        ))}
        {visibleLabel}
      </span>
    </div>
  );
});

export const Priority = PriorityRoot;
