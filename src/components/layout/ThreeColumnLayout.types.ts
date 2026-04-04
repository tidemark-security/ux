import type { ReactNode } from "react";

export type VisibleColumns = "left" | "center" | "right" | "left+center" | "center+right" | "all";

export type Breakpoint = "mobile" | "tablet" | "desktop" | "ultrawide";

export interface ColumnConfig {
  ultrawide?: {
    leftWidth?: string;
    centerWidth?: string;
    rightWidth?: string;
  };
  desktop?: {
    leftWidth?: string;
    centerWidth?: string;
    rightWidth?: string;
  };
  tablet?: {
    leftWidth?: string;
    centerWidth?: string;
    rightWidth?: string;
  };
  mobile?: {
    leftWidth?: string;
    centerWidth?: string;
    rightWidth?: string;
  };
}

export interface ThreeColumnLayoutProps {
  leftColumn: ReactNode;
  centerColumn: ReactNode;
  rightColumn?: ReactNode;
  visibleColumns: VisibleColumns;
  onVisibleColumnsChange: (columns: VisibleColumns) => void;
  className?: string;
  columnConfig?: ColumnConfig;
  dimLeftColumn?: boolean;
  showLeftRail?: boolean;
  leftRailCollapsed?: boolean;
  onLeftRailToggle?: () => void;
  leftColumnWidth?: number;
  onLeftColumnWidthChange?: (width: number) => void;
}