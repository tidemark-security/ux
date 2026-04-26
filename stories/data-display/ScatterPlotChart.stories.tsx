import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScatterPlotChart } from "../../src";

const confidenceData = [
  { confidence: 15, acceptanceRate: 24, total: 8, category: "Low confidence" },
  { confidence: 34, acceptanceRate: 39, total: 12, category: "Low confidence" },
  { confidence: 52, acceptanceRate: 57, total: 17, category: "Medium confidence" },
  { confidence: 68, acceptanceRate: 71, total: 22, category: "Medium confidence" },
  { confidence: 83, acceptanceRate: 88, total: 29, category: "High confidence" },
  { confidence: 94, acceptanceRate: 91, total: 26, category: "High confidence" },
];

const categoryColors: Record<string, string> = {
  "Low confidence": "#FF0055",
  "Medium confidence": "#5F40EB",
  "High confidence": "#00FFD9",
};

const meta = {
  title: "Data Display/ScatterPlotChart",
  component: ScatterPlotChart,
  tags: ["autodocs"],
} satisfies Meta<typeof ScatterPlotChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[720px] rounded-md border border-neutral-border bg-default-background p-4">
      <ScatterPlotChart
        data={confidenceData}
        xAxisKey="confidence"
        yAxisKey="acceptanceRate"
        seriesName="Confidence buckets"
        pointColor="#FF0055"
        xAxisProps={{
          domain: [0, 100],
          unit: "%",
          label: { value: "Confidence (%)", position: "insideBottom", offset: -8 },
        }}
        yAxisProps={{
          domain: [0, 100],
          unit: "%",
          width: 56,
          label: { value: "Acceptance Rate (%)", angle: -90, position: "insideBottomLeft", dy: -10 },
        }}
        tooltipFormatter={(value, name) => [`${Number(value ?? 0).toFixed(1)}%`, String(name)]}
      />
    </div>
  ),
};

export const SizedPoints: Story = {
  render: () => (
    <div className="w-[720px] rounded-md border border-neutral-border bg-default-background p-4">
      <ScatterPlotChart
        data={confidenceData}
        xAxisKey="confidence"
        yAxisKey="acceptanceRate"
        zAxisKey="total"
        seriesName="Recommendation buckets"
        pointColor="#5F40EB"
        pointFillAccessor={(entry) => {
          const category = entry.category;
          return typeof category === "string" ? categoryColors[category] : undefined;
        }}
        xAxisProps={{ domain: [0, 100], unit: "%" }}
        yAxisProps={{ domain: [0, 100], unit: "%", width: 56 }}
        zAxisRange={[100, 360]}
        tooltipFormatter={(value, name) => {
          if (name === "total") {
            return [value, "Recommendations"];
          }

          return [`${Number(value ?? 0).toFixed(1)}%`, String(name)];
        }}
      />
    </div>
  ),
};