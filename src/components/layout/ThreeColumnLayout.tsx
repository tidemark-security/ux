import React, { useEffect, useState } from "react";

import { ColumnRail, DEFAULT_WIDTH } from "./ColumnRail";
import type { Breakpoint, ThreeColumnLayoutProps, VisibleColumns } from "./ThreeColumnLayout.types";

function useBreakpoint(): Breakpoint {
  const getBreakpoint = (width: number): Breakpoint => {
    if (width >= 1920) return "ultrawide";
    if (width >= 1024) return "desktop";
    if (width >= 768) return "tablet";
    return "mobile";
  };

  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    typeof window !== "undefined" ? getBreakpoint(window.innerWidth) : "desktop",
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setBreakpoint(getBreakpoint(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}

export function ThreeColumnLayout({
  leftColumn,
  centerColumn,
  rightColumn,
  visibleColumns,
  onVisibleColumnsChange,
  className = "",
  columnConfig,
  dimLeftColumn = false,
  showLeftRail = false,
  leftRailCollapsed = false,
  onLeftRailToggle,
  leftColumnWidth,
  onLeftColumnWidthChange,
}: ThreeColumnLayoutProps) {
  const breakpoint = useBreakpoint();

  const validValues: VisibleColumns[] = ["left", "center", "right", "left+center", "center+right", "all"];
  if (!validValues.includes(visibleColumns)) {
    console.warn(`[ThreeColumnLayout] Invalid visibleColumns: "${visibleColumns}".`);
  }

  void onVisibleColumnsChange;

  const ultrawideLeftWidth = columnConfig?.ultrawide?.leftWidth || "max-w-[768px]";
  const ultrawideCenterWidth = columnConfig?.ultrawide?.centerWidth || "grow";
  const ultrawideRightWidth = columnConfig?.ultrawide?.rightWidth || "w-[400px]";

  const desktopLeftWidth = columnConfig?.desktop?.leftWidth || "max-w-[768px]";
  const desktopCenterWidth = columnConfig?.desktop?.centerWidth || "grow";
  const desktopRightWidth = columnConfig?.desktop?.rightWidth || "w-[400px]";

  const tabletLeftWidth = columnConfig?.tablet?.leftWidth || "max-w-[768px]";
  const tabletCenterWidth = columnConfig?.tablet?.centerWidth || "grow";
  const tabletRightWidth = columnConfig?.tablet?.rightWidth || "w-[400px]";

  const mobileLeftWidth = columnConfig?.mobile?.leftWidth || "w-full";
  const mobileCenterWidth = columnConfig?.mobile?.centerWidth || "w-full";
  const mobileRightWidth = columnConfig?.mobile?.rightWidth || "w-full";

  const showLeft = visibleColumns === "left" || visibleColumns === "left+center" || visibleColumns === "all";
  const showCenter = visibleColumns === "center" || visibleColumns === "left+center" || visibleColumns === "center+right" || visibleColumns === "all";
  const showRight = visibleColumns === "right" || visibleColumns === "center+right" || visibleColumns === "all";

  const getLeftWidthStyle = () => {
    if (showLeftRail && leftColumnWidth && breakpoint !== "mobile") {
      return { width: `${leftColumnWidth}px`, flexShrink: 0 };
    }
    return undefined;
  };

  const shouldShowRail = showLeftRail && showLeft && showCenter && breakpoint !== "mobile";

  return (
    <div className={`relative flex h-full w-full items-start gap-4 px-4 py-4 mobile:px-0 mobile:py-0 ${className}`}>
      {showLeft ? (
        <div
          className={`flex flex-col items-start self-stretch bg-default-background transition-all duration-300 ease-in-out ${
            !showLeftRail || !leftColumnWidth
              ? breakpoint === "ultrawide"
                ? ultrawideLeftWidth
                : breakpoint === "desktop"
                  ? desktopLeftWidth
                  : breakpoint === "tablet"
                    ? tabletLeftWidth
                    : mobileLeftWidth
              : "shrink-0"
          } ${showCenter && dimLeftColumn ? "brightness-75 hover:brightness-100" : ""} ${breakpoint !== "mobile" ? "bevel-tr-3xl" : ""}`}
          style={{ ...getLeftWidthStyle() }}
        >
          {leftColumn}
        </div>
      ) : null}

      {shouldShowRail && onLeftRailToggle ? (
        <ColumnRail
          collapsed={leftRailCollapsed}
          onToggle={onLeftRailToggle}
          width={leftColumnWidth ?? DEFAULT_WIDTH}
          onWidthChange={onLeftColumnWidthChange}
          resizable={!!onLeftColumnWidthChange}
        />
      ) : null}

      {showCenter ? (
        <div
          className={`flex flex-col items-start self-stretch bg-default-background transition-all duration-300 ease-in-out ${
            breakpoint === "ultrawide"
              ? ultrawideCenterWidth
              : breakpoint === "desktop"
                ? desktopCenterWidth
                : breakpoint === "tablet"
                  ? tabletCenterWidth
                  : mobileCenterWidth
          } ${breakpoint !== "mobile" ? "bevel-tr-3xl" : ""}`}
        >
          {centerColumn}
        </div>
      ) : null}

      {showRight ? (
        <div
          className={`bg-neutral-50 p-6 transition-all duration-300 ease-in-out ${
            breakpoint === "ultrawide"
              ? `absolute right-0 top-0 bottom-0 ${ultrawideRightWidth} z-10 max-h-screen overflow-y-auto shadow-lg animate-slide-in-right`
              : ""
          } ${
            breakpoint === "desktop"
              ? `absolute right-0 top-0 bottom-0 ${desktopRightWidth} z-10 max-h-screen overflow-y-auto shadow-lg animate-slide-in-right`
              : ""
          } ${
            breakpoint === "tablet"
              ? `absolute right-0 top-0 bottom-0 ${tabletRightWidth} z-10 max-h-screen overflow-y-auto shadow-lg animate-slide-in-right`
              : ""
          } ${breakpoint === "mobile" ? `relative h-full ${mobileRightWidth} content-fade-in p-4` : ""}`}
        >
          {rightColumn}
        </div>
      ) : null}
    </div>
  );
}