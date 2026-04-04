import { sub, parseISO, isValid, isAfter } from "date-fns";
import { formatInTimeZone, toZonedTime, fromZonedTime } from "date-fns-tz";

export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    const offset = -new Date().getTimezoneOffset();
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset >= 0 ? "+" : "-";
    return `UTC${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }
}

export function parseRelativeTime(input: string): { start: Date; end: Date } | null {
  const trimmed = input.trim().toLowerCase();
  const now = new Date();

  if (trimmed === "now") {
    return { start: now, end: now };
  }

  const match = trimmed.match(/^-(\d+)(m|min|h|hr|d)$/);
  if (!match) {
    return null;
  }

  const amount = Number.parseInt(match[1], 10);
  const unit = match[2];

  let start: Date;
  switch (unit) {
    case "m":
    case "min":
      start = sub(now, { minutes: amount });
      break;
    case "h":
    case "hr":
      start = sub(now, { hours: amount });
      break;
    case "d":
      start = sub(now, { days: amount });
      break;
    default:
      return null;
  }

  return { start, end: now };
}

export function parseISO8601(input: string): Date | null {
  try {
    const normalized = input.trim().replace(" ", "T");
    const date = parseISO(normalized);
    return isValid(date) ? date : null;
  } catch {
    return null;
  }
}

export function localToUTC(localDate: Date): Date {
  return fromZonedTime(localDate, getUserTimezone());
}

export function utcToLocal(utcDate: Date): Date {
  return toZonedTime(utcDate, getUserTimezone());
}

export function formatForDatetimeLocal(date: Date): string {
  return formatInTimeZone(date, getUserTimezone(), "yyyy-MM-dd'T'HH:mm");
}

export function normalizeDatetimeLocalValue(
  value: string,
  target: "display" | "input",
): string {
  if (!value) {
    return "";
  }

  return target === "display" ? value.replace("T", " ") : value.replace(" ", "T");
}

export function formatForBackend(date: Date): string {
  return formatInTimeZone(date, "UTC", "yyyy-MM-dd'T'HH:mm:ss'Z'");
}

export function formatForDisplay(date: Date): string {
  return formatInTimeZone(date, getUserTimezone(), "MMM d, h:mm a");
}

export function isValidDateRange(start: Date, end: Date): boolean {
  return isAfter(end, start) || start.getTime() === end.getTime();
}

export function getRelativeTimeLabel(relativeExpression: string): string {
  const trimmed = relativeExpression.trim().toLowerCase();
  const match = trimmed.match(/^-(\d+)(m|min|h|hr|d)$/);

  if (!match) {
    return relativeExpression;
  }

  const amount = Number.parseInt(match[1], 10);
  const unit = match[2];

  let unitWord = "";
  switch (unit) {
    case "m":
    case "min":
      unitWord = amount === 1 ? "minute" : "minutes";
      break;
    case "h":
    case "hr":
      unitWord = amount === 1 ? "hour" : "hours";
      break;
    case "d":
      unitWord = amount === 1 ? "day" : "days";
      break;
    default:
      return relativeExpression;
  }

  return `Last ${amount} ${unitWord}`;
}