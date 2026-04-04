import React from "react";
import { Clock } from "lucide-react";

import { Button } from "../buttons/Button";
import { cn } from "../../utils/cn";
import { formatForDatetimeLocal, normalizeDatetimeLocalValue } from "../../utils/dateFilters";
import { TextField } from "./TextField";

export interface DateTimeManagerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  helpText?: string;
  placeholder?: string;
  showNowButton?: boolean;
  size?: "default" | "small";
  className?: string;
}

export function DateTimeManager({
  value,
  onChange,
  label = "Timestamp",
  helpText,
  placeholder = "YYYY-MM-DD HH:MM",
  showNowButton = true,
  size = "default",
  className,
}: DateTimeManagerProps) {
  const handleNowClick = () => {
    const now = new Date();
    const formatted = formatForDatetimeLocal(now);
    onChange(normalizeDatetimeLocalValue(formatted, "display"));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = normalizeDatetimeLocalValue(event.target.value, "display");
    onChange(formatted);
  };

  const inputValue = normalizeDatetimeLocalValue(value, "input");

  return (
    <div
      className={cn(
        "group/924f5722 flex w-full flex-col items-start justify-center gap-2",
        {
          "flex-row flex-nowrap items-center justify-center gap-2": size === "small",
        },
        className,
      )}
    >
      {label ? (
        <span className={cn("text-caption font-caption text-default-font", { "inline whitespace-nowrap": size === "small" })}>
          {label}
        </span>
      ) : null}
      <div className={cn("flex w-full flex-col items-start gap-1", { "flex-row flex-nowrap gap-1": showNowButton })}>
        <TextField className={cn("h-auto w-full flex-none", { "h-auto w-auto flex-none grow": showNowButton })} label="" helpText="" icon={<Clock />}>
          <input
            type="datetime-local"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={cn(
              "h-8 w-full grow shrink-0 basis-0 bg-transparent text-body font-body text-default-font outline-none placeholder:text-subtext-color",
              { "w-full grow shrink-0 basis-0": showNowButton },
            )}
          />
        </TextField>
        {showNowButton ? (
          <Button className="h-8 w-16 flex-none" variant="neutral-secondary" onClick={handleNowClick}>
            Now
          </Button>
        ) : null}
      </div>
      {helpText ? (
        <span className={cn("text-caption font-caption text-subtext-color", { hidden: size === "small" })}>
          {helpText}
        </span>
      ) : null}
    </div>
  );
}