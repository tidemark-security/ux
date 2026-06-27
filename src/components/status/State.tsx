"use client";

import React from "react";
import { Check, CheckSquare, ChevronsUp, Mail, MailOpen, MinusSquare, Square } from "lucide-react";

import { cn } from "../../utils/cn";

export interface StateProps extends React.HTMLAttributes<HTMLDivElement> {
  state?:
    | "closed"
    | "new"
    | "in_progress"
    | "escalated"
    | "closed_true_positive"
    | "closed_benign_positive"
    | "closed_false_positive"
    | "closed_unresolved"
    | "closed_duplicate"
    | "tsk_todo"
    | "tsk_in_progress"
    | "tsk_done";
  variant?: "small" | "mini" | "maxi";
  className?: string;
}

const STATE_LABELS: Record<NonNullable<StateProps["state"]>, string[]> = {
  closed: ["Closed", "XCL"],
  new: ["New", "NEW"],
  in_progress: ["In Progress", "In Prog.", "INP"],
  escalated: ["Escalated", "Esc.", "ESC"],
  closed_true_positive: ["Closed (True Positive)", "Closed (True)", "Closed (TP)", "XTP"],
  closed_benign_positive: ["Closed (Benign Positive)", "Closed (Benign)", "Closed (BP)", "XBP"],
  closed_false_positive: ["Closed (False Positive)", "Closed (False)", "Closed (FP)", "XFP"],
  closed_unresolved: ["Closed (Unresolved)", "Closed (U)", "XUN"],
  closed_duplicate: ["Closed (Duplicate)", "Closed (D)", "XDP"],
  tsk_todo: ["To Do", "Todo", "TDO"],
  tsk_in_progress: ["In Progress", "In Prog.", "INP"],
  tsk_done: ["Done", "DON"],
};

const StateRoot = React.forwardRef<HTMLDivElement, StateProps>(function StateRoot(
  { state = "closed", variant = "small", className, ...otherProps },
  ref,
) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const labelRef = React.useRef<HTMLSpanElement | null>(null);
  const measurementRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
  const labels = STATE_LABELS[state] ?? STATE_LABELS.closed;
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

  React.useLayoutEffect(() => {
    if (variant === "mini") {
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
  }, [labels, variant]);

  return (
    <div
      className={cn(
        "group/a7f5a586 flex h-6 min-w-0 max-w-full items-center justify-center gap-1 overflow-hidden rounded-md border border-solid border-neutral-border bg-neutral-50 px-2",
        {
          "h-16 w-full min-w-[176px] flex-col flex-nowrap items-start justify-center gap-2 px-2 py-2": variant === "maxi",
          "h-6 w-16": variant === "mini",
        },
        className,
      )}
      ref={setRootRefs}
      {...otherProps}
    >
      {state === "escalated" ? (
        <ChevronsUp className={cn("text-body font-body text-neutral-700", { "text-heading-2 font-heading-2": variant === "maxi" })} />
      ) : state === "in_progress" ? (
        <MailOpen className={cn("text-body font-body text-neutral-700", { "text-heading-2 font-heading-2": variant === "maxi" })} />
      ) : state === "new" ? (
        <Mail className={cn("text-body font-body text-neutral-700", { "text-heading-2 font-heading-2": variant === "maxi" })} />
      ) : state === "tsk_todo" ? (
        <Square className={cn("text-body font-body text-neutral-700", { "text-heading-2 font-heading-2": variant === "maxi" })} />
      ) : state === "tsk_in_progress" ? (
        <MinusSquare className={cn("text-body font-body text-neutral-700", { "text-heading-2 font-heading-2": variant === "maxi" })} />
      ) : state === "tsk_done" ? (
        <CheckSquare className={cn("text-body font-body text-neutral-700", { "text-heading-2 font-heading-2": variant === "maxi" })} />
      ) : (
        <Check className={cn("text-body font-body text-neutral-700", { "text-heading-2 font-heading-2": variant === "maxi" })} />
      )}
      <span
        ref={labelRef}
        className={cn(
          "relative min-w-0 grow shrink basis-0 whitespace-nowrap text-center text-caption font-caption text-neutral-700",
          {
            "font-['Saira'] text-[20px] font-[400] leading-[22px] tracking-normal text-left": variant === "maxi",
            "grow-0 shrink-0 basis-auto": variant === "mini",
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

export const State = StateRoot;
