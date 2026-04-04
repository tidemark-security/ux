"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type DateRange, type Matcher } from "react-day-picker";

import { cn } from "../../utils/cn";

export interface CalendarProps {
  className?: string;
  mode?: "single" | "range" | "multiple";
  selected?: Date | Date[] | DateRange;
  onSelect?: (date: Date | Date[] | DateRange | undefined) => void;
  disabled?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
  fromDate?: Date;
  toDate?: Date;
  defaultMonth?: Date;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    className,
    mode = "single",
    selected,
    onSelect,
    disabled = false,
    disablePast = false,
    disableFuture = false,
    fromDate,
    toDate,
    defaultMonth,
    ...props
  },
  ref,
) {
  const today = new Date();
  const disabledDates: Matcher[] = [];

  if (disablePast) {
    disabledDates.push((date: Date) => date < today);
  }

  if (disableFuture) {
    disabledDates.push((date: Date) => date > today);
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <DayPicker
        mode={mode as never}
        selected={selected as never}
        onSelect={onSelect as never}
        disabled={disabled ? true : disabledDates.length > 0 ? disabledDates : undefined}
        fromDate={fromDate}
        toDate={toDate}
        defaultMonth={defaultMonth}
        showOutsideDays
        classNames={{
          root: "relative",
          month: "flex flex-col gap-4",
          months: "relative flex max-w-fit flex-wrap gap-4",
          nav: "absolute flex h-8 w-full items-center justify-between p-0.5",
          month_caption: "flex h-8 items-center justify-center",
          caption_label: "text-body-bold font-body-bold text-default-font",
          button_previous:
            "inline-flex h-8 w-8 items-center justify-center rounded border-none bg-transparent hover:bg-neutral-50 active:bg-neutral-100",
          button_next:
            "inline-flex h-8 w-8 items-center justify-center rounded border-none bg-transparent hover:bg-neutral-50 active:bg-neutral-100",
          chevron: "text-[18px] font-[500] leading-[18px] text-neutral-600",
          weeks: "flex flex-col gap-2",
          weekdays: "flex pb-4",
          weekday: "w-8 text-center text-caption-bold font-caption-bold text-subtext-color",
          week: "flex overflow-hidden rounded-lg",
          day: "group flex h-8 w-8 cursor-pointer items-center justify-center p-0 text-body font-body text-default-font",
          day_button:
            "flex h-8 w-8 cursor-pointer items-center justify-center gap-2 rounded-lg border-none hover:bg-neutral-100",
          selected: "rounded-lg bg-brand-600 text-white",
          today: "font-bold",
          outside: "text-neutral-400 opacity-50",
          disabled: "cursor-not-allowed text-neutral-300",
          range_start: "rounded-l-lg rounded-r-none bg-brand-600 text-white",
          range_middle: "rounded-none bg-neutral-100 text-default-font",
          range_end: "rounded-l-none rounded-r-lg bg-brand-600 text-white",
        }}
        components={{
          Chevron: ({ orientation }) =>
            orientation === "left" ? (
              <ChevronLeft className="h-4 w-4 text-neutral-600" />
            ) : (
              <ChevronRight className="h-4 w-4 text-neutral-600" />
            ),
        }}
        {...props}
      />
    </div>
  );
});

export { Calendar };