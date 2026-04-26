"use client";

import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../utils/cn";

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

type AxisId = string | number;

export interface TimeSeriesChartSeries {
  dataKey: string;
  color: string;
  name?: string;
  yAxisId?: AxisId;
  type?: "linear" | "monotone" | "step" | "stepAfter" | "stepBefore" | "natural";
  strokeWidth?: number;
  strokeDasharray?: string;
  dot?: boolean;
}

export interface TimeSeriesChartAxis {
  id?: AxisId;
  orientation?: "left" | "right";
  domain?: React.ComponentProps<typeof YAxis>["domain"];
  tickFontSize?: number;
  unit?: string;
  width?: number;
}

export interface TimeSeriesChartProps {
  className?: string;
  data: Array<Record<string, unknown>>;
  xAxisKey: string;
  series: TimeSeriesChartSeries[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  xTickFontSize?: number;
  yAxes?: TimeSeriesChartAxis[];
  animationDuration?: number;
  legendFormatter?: (value: string | number) => React.ReactNode;
  tooltipFormatter?: React.ComponentProps<typeof Tooltip>["formatter"];
}

const DEFAULT_Y_AXES: TimeSeriesChartAxis[] = [{ orientation: "left", tickFontSize: 12 }];

export const TimeSeriesChart = React.forwardRef<HTMLDivElement, TimeSeriesChartProps>(function TimeSeriesChart(
  {
    className,
    data,
    xAxisKey,
    series,
    height = 300,
    showGrid = true,
    showLegend = true,
    showTooltip = true,
    xTickFontSize = 12,
    yAxes = DEFAULT_Y_AXES,
    animationDuration = 300,
    legendFormatter,
    tooltipFormatter,
  },
  ref,
) {
  const { resolvedTheme } = useTheme();
  const palette = resolvedTheme === "dark" ? CHART_THEME.dark : CHART_THEME.light;

  return (
    <div ref={ref} className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {showGrid ? <CartesianGrid stroke={palette.grid} strokeDasharray="3 3" /> : null}
          <XAxis
            axisLine={false}
            dataKey={xAxisKey}
            fontSize={xTickFontSize}
            stroke={palette.axis}
            tickLine={false}
          />
          {yAxes.map((axis, index) => {
            const axisId = axis.id;

            return (
              <YAxis
                key={`${String(axisId ?? "default")}-${axis.orientation ?? "left"}-${index}`}
                yAxisId={axisId}
                axisLine={false}
                orientation={axis.orientation}
                domain={axis.domain}
                fontSize={axis.tickFontSize ?? 12}
                stroke={palette.axis}
                tickLine={false}
                unit={axis.unit}
                width={axis.width}
              />
            );
          })}
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
          {series.map((line) => (
            <Line
              key={`${String(line.yAxisId ?? "default")}-${line.dataKey}`}
              yAxisId={line.yAxisId}
              type={line.type ?? "monotone"}
              dataKey={line.dataKey}
              stroke={line.color}
              name={line.name ?? line.dataKey}
              strokeWidth={line.strokeWidth ?? 2}
              strokeDasharray={line.strokeDasharray}
              animationDuration={animationDuration}
              dot={line.dot ?? false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});