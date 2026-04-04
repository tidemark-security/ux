"use client";

import React from "react";
import { Calendar, ChevronDown } from "lucide-react";

import { Accordion } from "../misc/Accordion";
import { Button } from "../buttons/Button";
import { DropdownMenu } from "../overlays/DropdownMenu";
import { TextField } from "./TextField";
import { useTheme } from "../../contexts/ThemeContext";
import {
  formatForBackend,
  formatForDisplay,
  getRelativeTimeLabel,
  getUserTimezone,
  isValidDateRange,
  parseISO8601,
  parseRelativeTime,
} from "../../utils/dateFilters";
import { cn } from "../../utils/cn";

export interface DateRangeValue {
  start: string;
  end: string;
  preset?: string;
}

export interface DateRangePickerProps {
  value: DateRangeValue | null;
  onChange: (value: DateRangeValue | null) => void;
  presets?: string[];
  showAllTime?: boolean;
  size?: "small" | "medium";
  className?: string;
  variant?: "neutral-secondary" | "neutral-tertiary";
}

export function DateRangePicker({
  value,
  onChange,
  presets = ["-15m", "-1h", "-24h", "-7d", "-30d", "-90d"],
  showAllTime = true,
  size = "small",
  className,
  variant = "neutral-secondary",
}: DateRangePickerProps) {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";
  const [customStart, setCustomStart] = React.useState("");
  const [customEnd, setCustomEnd] = React.useState("");
  const [dateError, setDateError] = React.useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const userTimezone = React.useMemo(() => getUserTimezone(), []);

  const handlePresetClick = (relativeExpression: string | null) => {
    if (relativeExpression === null) {
      onChange(null);
      setIsOpen(false);
      setCustomStart("");
      setCustomEnd("");
      setDateError(null);
      return;
    }

    const range = parseRelativeTime(relativeExpression);
    if (!range) {
      return;
    }

    const { start, end } = range;
    onChange({
      start: formatForBackend(start),
      end: formatForBackend(end),
      preset: relativeExpression,
    });
    setIsOpen(false);
    setCustomStart("");
    setCustomEnd("");
    setDateError(null);
  };

  const handleCustomApply = () => {
    setDateError(null);

    if (!customStart || !customEnd) {
      setDateError("Please enter both start and end dates");
      return;
    }

    let startDate: Date | null = null;
    let endDate: Date | null = null;

    const relativeStart = parseRelativeTime(customStart);
    startDate = relativeStart ? relativeStart.start : parseISO8601(customStart);

    const relativeEnd = parseRelativeTime(customEnd);
    endDate = relativeEnd ? relativeEnd.end : parseISO8601(customEnd);

    if (!startDate) {
      setDateError("Invalid start date format. Use YYYY-MM-DD HH:mm:ss or -7d");
      return;
    }

    if (!endDate) {
      setDateError("Invalid end date format. Use YYYY-MM-DD HH:mm:ss or now");
      return;
    }

    if (!isValidDateRange(startDate, endDate)) {
      setDateError("End date must be after start date");
      return;
    }

    onChange({
      start: formatForBackend(startDate),
      end: formatForBackend(endDate),
      preset: "custom",
    });

    setIsOpen(false);
    setCustomStart("");
    setCustomEnd("");
    setDateError(null);
  };

  const displayLabel = React.useMemo(() => {
    if (!value) {
      return showAllTime ? "All time" : "Select dates";
    }

    if (value.preset && value.preset !== "custom") {
      return getRelativeTimeLabel(value.preset);
    }

    try {
      const start = parseISO8601(value.start);
      const end = parseISO8601(value.end);

      if (start && end) {
        return `${formatForDisplay(start)} - ${formatForDisplay(end)}`;
      }
    } catch {
      return "Custom range";
    }

    return "Custom range";
  }, [showAllTime, value]);

  const presetRowClass = cn(
    "flex w-full cursor-pointer items-center gap-2 px-3 py-2",
    "bg-neutral-50",
    isDarkTheme ? "hover:bg-neutral-100" : "hover:bg-brand-primary",
  );

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <Button className={className} variant={variant} size={size} icon={<Calendar />} iconRight={<ChevronDown />}>
          {displayLabel}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-[320px] items-stretch p-0" side="bottom" align="start" sideOffset={4}>
        <Accordion
          trigger={
            <div className="flex w-full items-center justify-start gap-2 px-3 py-3">
              <span className="grow shrink-0 basis-0 text-left text-body-bold font-body-bold text-default-font">Presets</span>
              <Accordion.Chevron />
            </div>
          }
          defaultOpen
        >
          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start border-t border-solid border-neutral-border">
            {presets.map((expr) => (
              <div key={expr} className={presetRowClass} onClick={() => handlePresetClick(expr)}>
                <span className="grow shrink-0 basis-0 text-body font-body text-default-font">{getRelativeTimeLabel(expr)}</span>
              </div>
            ))}
            {showAllTime ? (
              <div className={presetRowClass} onClick={() => handlePresetClick(null)}>
                <span className="grow shrink-0 basis-0 text-body font-body text-default-font">All time</span>
              </div>
            ) : null}
          </div>
        </Accordion>
        <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
        <Accordion
          trigger={
            <div className="flex w-full items-center justify-start gap-2 px-3 py-3">
              <span className="grow shrink-0 basis-0 text-left text-body-bold font-body-bold text-default-font">Custom Range</span>
              <Accordion.Chevron />
            </div>
          }
        >
          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-3 border-t border-solid border-neutral-border bg-neutral-50 px-3 py-3">
            <div className="flex w-full items-start gap-2 text-caption font-caption text-subtext-color">
              Times shown in your local timezone ({userTimezone})
            </div>
            <div className="flex w-full items-start gap-2">
              <TextField className="h-auto grow shrink-0 basis-0" label="Start date" helpText={dateError || ""} error={!!dateError}>
                <TextField.Input
                  className="h-8 w-full flex-none"
                  type="text"
                  value={customStart}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setCustomStart(event.target.value);
                    setDateError(null);
                  }}
                  placeholder="YYYY-MM-DD HH:mm or -7d"
                />
              </TextField>
            </div>
            <div className="flex w-full items-start gap-2">
              <TextField className="h-auto grow shrink-0 basis-0" label="End date" helpText="">
                <TextField.Input
                  className="h-8 w-full flex-none"
                  type="text"
                  value={customEnd}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setCustomEnd(event.target.value);
                    setDateError(null);
                  }}
                  placeholder="YYYY-MM-DD HH:mm or now"
                />
              </TextField>
            </div>
            <Button className="h-6 w-full flex-none" size="small" onClick={handleCustomApply} disabled={!customStart || !customEnd}>
              Apply
            </Button>
          </div>
        </Accordion>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default DateRangePicker;