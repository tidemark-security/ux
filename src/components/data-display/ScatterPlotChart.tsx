"use client";

import React from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart as RechartsScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
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

type ChartDatum = Record<string, unknown>;

export interface ScatterPlotChartProps {
  className?: string;
  data: ChartDatum[];
  xAxisKey: string;
  yAxisKey: string;
  zAxisKey?: string;
  height?: number;
  margin?: React.ComponentProps<typeof RechartsScatterChart>["margin"];
  seriesName?: string;
  pointColor?: string;
  pointFillAccessor?: (entry: ChartDatum, index: number) => string | undefined;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  animationDuration?: number;
  pointLine?: React.ComponentProps<typeof Scatter>["line"];
  pointShape?: React.ComponentProps<typeof Scatter>["shape"];
  zAxisRange?: [number, number];
  xAxisProps?: Omit<React.ComponentProps<typeof XAxis>, "dataKey" | "type">;
  yAxisProps?: Omit<React.ComponentProps<typeof YAxis>, "dataKey" | "type">;
  zAxisProps?: Omit<React.ComponentProps<typeof ZAxis>, "dataKey" | "range">;
  legendFormatter?: (value: string | number) => React.ReactNode;
  tooltipFormatter?: React.ComponentProps<typeof Tooltip>["formatter"];
  onPointClick?: (entry: ChartDatum) => void;
}

export const ScatterPlotChart = React.forwardRef<HTMLDivElement, ScatterPlotChartProps>(function ScatterPlotChart(
  {
    className,
    data,
    xAxisKey,
    yAxisKey,
    zAxisKey,
    height = 300,
    margin = { top: 8, right: 12, left: 8, bottom: 8 },
    seriesName = "Series",
    pointColor = "#D0FF00",
    pointFillAccessor,
    showGrid = true,
    showLegend = false,
    showTooltip = true,
    animationDuration = 300,
    pointLine,
    pointShape,
    zAxisRange = [80, 260],
    xAxisProps,
    yAxisProps,
    zAxisProps,
    legendFormatter,
    tooltipFormatter,
    onPointClick,
  },
  ref,
) {
  const { resolvedTheme } = useTheme();
  const palette = resolvedTheme === "dark" ? CHART_THEME.dark : CHART_THEME.light;
  const hasCustomPointColors = typeof pointFillAccessor === "function";

  return (
    <div ref={ref} className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsScatterChart data={data} margin={margin}>
          {showGrid ? <CartesianGrid stroke={palette.grid} strokeDasharray="3 3" /> : null}
          <XAxis
            axisLine={false}
            dataKey={xAxisKey}
            type="number"
            fontSize={12}
            stroke={palette.axis}
            tickLine={false}
            {...xAxisProps}
          />
          <YAxis
            axisLine={false}
            dataKey={yAxisKey}
            type="number"
            fontSize={12}
            stroke={palette.axis}
            tickLine={false}
            {...yAxisProps}
          />
          {zAxisKey ? <ZAxis dataKey={zAxisKey} range={zAxisRange} {...zAxisProps} /> : null}
          {showTooltip ? (
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
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
          <Scatter
            name={seriesName}
            data={data}
            fill={pointColor}
            line={pointLine}
            shape={pointShape}
            animationDuration={animationDuration}
            onClick={(event) => {
              const payload = (event as { payload?: ChartDatum } | undefined)?.payload;
              if (payload && onPointClick) {
                onPointClick(payload);
              }
            }}
          >
            {hasCustomPointColors
              ? data.map((entry, index) => (
                  <Cell
                    key={`scatter-point-${index}`}
                    fill={pointFillAccessor(entry, index) ?? pointColor}
                  />
                ))
              : null}
          </Scatter>
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
  );
});