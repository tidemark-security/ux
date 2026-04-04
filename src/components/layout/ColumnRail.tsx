/* eslint-disable react-refresh/only-export-components */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AI_PANE_COLLAPSED_KEY = "intercept-ai-pane-collapsed";
const AI_PANE_WIDTH_KEY = "intercept-ai-pane-width";
const DEFAULT_WIDTH = 512;
const MIN_WIDTH = 320;
const MAX_WIDTH = 800;

export interface ColumnRailProps {
  collapsed: boolean;
  onToggle: () => void;
  width?: number;
  onWidthChange?: (width: number) => void;
  resizable?: boolean;
}

export function getPersistedWidth(fallbackWidth: number = DEFAULT_WIDTH): number {
  if (typeof window === "undefined") return fallbackWidth;
  try {
    const stored = localStorage.getItem(AI_PANE_WIDTH_KEY);
    if (stored) {
      const width = Number.parseInt(stored, 10);
      if (!Number.isNaN(width) && width >= MIN_WIDTH && width <= MAX_WIDTH) {
        return width;
      }
    }
  } catch {
    return fallbackWidth;
  }
  return fallbackWidth;
}

export function getPersistedCollapsedState(fallbackCollapsed: boolean): boolean {
  if (typeof window === "undefined") return fallbackCollapsed;
  try {
    const stored = localStorage.getItem(AI_PANE_COLLAPSED_KEY);
    if (stored === "true") return true;
    if (stored === "false") return false;
  } catch {
    return fallbackCollapsed;
  }
  return fallbackCollapsed;
}

export function persistCollapsedState(collapsed: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(AI_PANE_COLLAPSED_KEY, String(collapsed));
  } catch {
    // Ignore localStorage failures.
  }
}

function persistWidth(width: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(AI_PANE_WIDTH_KEY, String(width));
  } catch {
    // Ignore localStorage failures.
  }
}

export function ColumnRail({ collapsed, onToggle, width, onWidthChange, resizable = true }: ColumnRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(0);
  const hasDragged = useRef(false);
  const onWidthChangeRef = useRef(onWidthChange);

  useEffect(() => {
    onWidthChangeRef.current = onWidthChange;
  }, [onWidthChange]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (!resizable || collapsed) return;

      event.preventDefault();
      event.stopPropagation();

      setIsDragging(true);
      hasDragged.current = false;
      dragStartX.current = event.clientX;
      dragStartWidth.current = width ?? DEFAULT_WIDTH;
    },
    [collapsed, resizable, width],
  );

  useEffect(() => {
    if (!isDragging) return;

    let lastWidth = dragStartWidth.current;

    const handleMouseMove = (event: MouseEvent) => {
      const delta = event.clientX - dragStartX.current;

      if (Math.abs(delta) > 3) {
        hasDragged.current = true;
      }

      lastWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, dragStartWidth.current + delta));
      onWidthChangeRef.current?.(lastWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (hasDragged.current) {
        persistWidth(lastWidth);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onToggle();
      }
    },
    [onToggle],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (hasDragged.current) {
        event.preventDefault();
        event.stopPropagation();
        hasDragged.current = false;
        return;
      }
      onToggle();
    },
    [onToggle],
  );

  return (
    <div
      ref={railRef}
      role="button"
      tabIndex={0}
      aria-label={collapsed ? "Expand panel" : "Collapse panel"}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      className={`
        group relative flex h-full w-1.5 shrink-0 items-center justify-center
        cursor-col-resize bg-transparent transition-colors duration-150
        hover:bg-brand-300/15 focus:outline-none focus-visible:bg-brand-300/15
        ${isDragging ? "bg-brand-300/25" : ""}
      `}
    >
      <div
        className={`
          absolute inset-y-0 left-1/2 w-px -translate-x-1/2 transition-colors duration-150
          ${isDragging ? "bg-brand-primary" : "bg-neutral-border group-hover:bg-brand-300/50"}
        `}
      />
      <div
        className={`
          absolute left-1/2 top-1/2 flex h-8 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm border border-neutral-border bg-neutral-100/90 shadow-sm
          opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100
          ${isDragging ? "opacity-100" : ""}
        `}
      >
        {collapsed ? <ChevronRight className="h-4 w-4 text-brand-primary" /> : <ChevronLeft className="h-4 w-4 text-brand-primary" />}
      </div>
    </div>
  );
}

export { DEFAULT_WIDTH, MAX_WIDTH, MIN_WIDTH };