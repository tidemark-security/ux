import { formatDistanceToNow, format, parseISO, differenceInDays } from "date-fns";

function normalizeRelativeTimeLabel(value: string): string {
  return value
    .replace(/\bless than\b/gi, "<")
    .replace(/\bover\b/gi, ">")
    .replace(/\balmost\b/gi, "~")
    .replace(/\babout\b/gi, "~")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export interface TimestampFormatOptions {
  useRelative?: boolean;
  relativeDaysThreshold?: number;
  absoluteFormat?: string;
}

const DEFAULT_OPTIONS: Required<TimestampFormatOptions> = {
  useRelative: true,
  relativeDaysThreshold: 7,
  absoluteFormat: "MMM d, yyyy h:mm a",
};

export function formatTimelineTimestamp(
  timestamp: string | Date | undefined | null,
  options: TimestampFormatOptions = {},
): string {
  if (!timestamp) {
    return "";
  }

  const resolvedOptions = { ...DEFAULT_OPTIONS, ...options };

  try {
    const date = typeof timestamp === "string" ? parseISO(timestamp) : timestamp;
    const now = new Date();
    const daysDiff = Math.abs(differenceInDays(now, date));

    if (resolvedOptions.useRelative && daysDiff <= resolvedOptions.relativeDaysThreshold) {
      return normalizeRelativeTimeLabel(formatDistanceToNow(date, { addSuffix: true }));
    }

    return format(date, resolvedOptions.absoluteFormat);
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return String(timestamp);
  }
}

export function formatRelativeTime(timestamp: string | Date | undefined | null): string {
  if (!timestamp) {
    return "";
  }

  try {
    const date = typeof timestamp === "string" ? parseISO(timestamp) : timestamp;
    return normalizeRelativeTimeLabel(formatDistanceToNow(date, { addSuffix: true }));
  } catch (error) {
    console.error("Error formatting relative time:", error);
    return String(timestamp);
  }
}

export function formatAbsoluteTime(
  timestamp: string | Date | undefined | null,
  formatString = "MMM d, yyyy h:mm a",
): string {
  if (!timestamp) {
    return "";
  }

  try {
    const date = typeof timestamp === "string" ? parseISO(timestamp) : timestamp;
    return format(date, formatString);
  } catch (error) {
    console.error("Error formatting absolute time:", error);
    return String(timestamp);
  }
}

export type TimeGroup = "today" | "yesterday" | "week" | "older";

export const TIME_GROUP_LABELS: Record<TimeGroup, string> = {
  today: "Today",
  yesterday: "Yesterday",
  week: "Last 7 days",
  older: "Older",
};

export function getTimeGroup(timestamp: string | Date): TimeGroup {
  const date = typeof timestamp === "string" ? parseISO(timestamp) : timestamp;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const weekAgo = new Date(today.getTime() - 7 * 86400000);

  if (date >= today) {
    return "today";
  }

  if (date >= yesterday) {
    return "yesterday";
  }

  if (date >= weekAgo) {
    return "week";
  }

  return "older";
}