"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../utils/cn";

const TOOLTIP_THEME = {
  dark: {
    background: "#111827",
    border: "#374151",
    text: "#F9FAFB",
  },
  light: {
    background: "#FFFFFF",
    border: "#D1D5DB",
    text: "#111827",
  },
} as const;

export interface SemiDonutChartDatum {
  name: string;
  value: number;
  color: string;
}

export interface SemiDonutChartProps<T extends SemiDonutChartDatum = SemiDonutChartDatum> {
  data: T[];
  centerLabel: string;
  centerValue?: number;
  className?: string;
  height?: number;
  animationDuration?: number;
  decimals?: number;
  showTooltip?: boolean;
  onSliceClick?: (item: T) => void;
}

export function SemiDonutChart<T extends SemiDonutChartDatum = SemiDonutChartDatum>({
  data,
  centerLabel,
  centerValue,
  className,
  height = 240,
  animationDuration = 220,
  decimals = 1,
  showTooltip = true,
  onSliceClick,
}: SemiDonutChartProps<T>) {
  const { resolvedTheme } = useTheme();
  const tooltipTheme = resolvedTheme === "dark" ? TOOLTIP_THEME.dark : TOOLTIP_THEME.light;
  const chartData = data.filter((item) => (item.value ?? 0) > 0);
  const pieData = chartData as unknown as Array<Record<string, unknown>>;
  const total = chartData.reduce((sum, item) => sum + (item.value ?? 0), 0);
  const value = centerValue ?? total;
  const isClickable = Boolean(onSliceClick);

  if (chartData.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="relative" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              animationDuration={animationDuration}
              cx="50%"
              cy="85%"
              data={pieData}
              dataKey="value"
              endAngle={0}
              innerRadius="58%"
              onClick={(_, index) => {
                if (!onSliceClick) {
                  return;
                }

                const clicked = chartData[index];

                if (clicked) {
                  onSliceClick(clicked);
                }
              }}
              outerRadius="90%"
              paddingAngle={3}
              startAngle={180}
              stroke="none"
              style={{ cursor: isClickable ? "pointer" : "default" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`${entry.name}-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {showTooltip ? (
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipTheme.background,
                  border: `1px solid ${tooltipTheme.border}`,
                  borderRadius: "8px",
                  color: tooltipTheme.text,
                }}
                itemStyle={{ color: tooltipTheme.text }}
                labelStyle={{ color: tooltipTheme.text }}
              />
            ) : null}
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-x-0 bottom-[22%] flex flex-col items-center justify-end">
          <span className="text-heading-1 font-heading-1 text-default-font">{value}</span>
          <span className="text-body text-subtext-color">{centerLabel}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {chartData.map((item, index) => {
          const percentage = total > 0 ? (item.value / total) * 100 : 0;

          return (
            <button
              key={`${item.name}-legend-${index}`}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-1 py-1 text-left disabled:cursor-default",
                isClickable ? "transition-colors hover:bg-neutral-50" : undefined,
              )}
              disabled={!isClickable}
              onClick={() => onSliceClick?.(item)}
              type="button"
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-body text-default-font">{item.name}</span>
              </div>
              <div className="flex items-center gap-3 text-body text-subtext-color">
                <span>{item.value}</span>
                <span>{percentage.toFixed(decimals)}%</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}