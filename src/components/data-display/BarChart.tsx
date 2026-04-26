"use client";

import React from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../utils/cn";

const DEFAULT_COLORS = ["#B6E600", "#F3FF90", "#8DB800", "#E5FF50", "#6A8B00", "#D0FF00"];

const CHART_THEME = {
  dark: {
    axis: "#9CA3AF",
    grid: "rgba(148, 163, 184, 0.22)",
    tooltipBackground: "#111827",
    tooltipBorder: "#374151",
    tooltipText: "#F9FAFB",
  },
  light: {
    axis: "#6B7280",
    grid: "rgba(148, 163, 184, 0.32)",
    tooltipBackground: "#FFFFFF",
    tooltipBorder: "#D1D5DB",
    tooltipText: "#111827",
  },
} as const;

type ChartDatum = Record<string, unknown>;

export interface BarChartSeries {
  dataKey: string;
  name?: string;
  color?: string;
  stackId?: string;
}

export interface BarChartProps {
  className?: string;
  data: ChartDatum[];
  dataKeys?: string[];
  series?: BarChartSeries[];
  height?: number;
  xAxisKey?: string;
  yAxisKey?: string;
  colors?: string[];
  stacked?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  barRadius?: number;
  layout?: "horizontal" | "vertical";
  xAxisProps?: Omit<React.ComponentProps<typeof XAxis>, "dataKey">;
  yAxisProps?: Omit<React.ComponentProps<typeof YAxis>, "dataKey">;
  legendFormatter?: (value: string | number) => React.ReactNode;
  tooltipFormatter?: React.ComponentProps<typeof Tooltip>["formatter"];
  onChartClick?: (entry: ChartDatum) => void;
}

export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(function BarChart(
  {
    className,
    data,
    dataKeys = [],
    series,
    height = 320,
    xAxisKey = "name",
    yAxisKey,
    colors = DEFAULT_COLORS,
    stacked = false,
    showGrid = true,
    showLegend = true,
    showTooltip = true,
    barRadius = 4,
    layout = "horizontal",
    xAxisProps,
    yAxisProps,
    legendFormatter,
    tooltipFormatter,
    onChartClick,
  },
  ref,
) {
  const { resolvedTheme } = useTheme();
  const palette = resolvedTheme === "dark" ? CHART_THEME.dark : CHART_THEME.light;
  const isVertical = layout === "vertical";
  const resolvedSeries: BarChartSeries[] =
    series ??
    dataKeys.map((key, index) => ({
      dataKey: key,
      color: colors[index % colors.length],
    }));
  const radius: [number, number, number, number] = isVertical
    ? [0, barRadius, barRadius, 0]
    : [barRadius, barRadius, 0, 0];

  return (
    <div ref={ref} className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={layout}
          onClick={(event) => {
            const payload = (event as { activePayload?: Array<{ payload?: ChartDatum }> })?.activePayload?.[0]?.payload;
            if (payload && onChartClick) {
              onChartClick(payload);
            }
          }}
        >
          {showGrid ? <CartesianGrid stroke={palette.grid} strokeDasharray="3 3" /> : null}
          <XAxis
            axisLine={false}
            dataKey={isVertical ? undefined : xAxisKey}
            type={isVertical ? "number" : "category"}
            fontSize={12}
            stroke={palette.axis}
            tickLine={false}
            {...xAxisProps}
          />
          <YAxis
            axisLine={false}
            dataKey={isVertical ? yAxisKey ?? xAxisKey : undefined}
            type={isVertical ? "category" : "number"}
            fontSize={12}
            stroke={palette.axis}
            tickLine={false}
            {...yAxisProps}
          />
          {showTooltip ? (
            <Tooltip
              formatter={tooltipFormatter}
              contentStyle={{
                backgroundColor: palette.tooltipBackground,
                border: `1px solid ${palette.tooltipBorder}`,
                borderRadius: "8px",
                color: palette.tooltipText,
              }}
              itemStyle={{ color: palette.tooltipText }}
              labelStyle={{ color: palette.tooltipText }}
            />
          ) : null}
          {showLegend ? (
            <Legend
              formatter={
                legendFormatter ??
                ((value) => <span className="text-body text-default-font">{String(value)}</span>)
              }
            />
          ) : null}
          {resolvedSeries.map((item, index) => (
            <Bar
              key={item.dataKey}
              dataKey={item.dataKey}
              fill={item.color ?? colors[index % colors.length]}
              name={item.name ?? item.dataKey}
              radius={radius}
              stackId={item.stackId ?? (stacked ? "stack" : undefined)}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
});