import type { Meta, StoryObj } from "@storybook/react-vite";

import { TimeSeriesChart } from "../../src";

const incidentVolumeData = [
  { time: "Mon", alerts: 42, cases: 6, closed: 31 },
  { time: "Tue", alerts: 36, cases: 5, closed: 24 },
  { time: "Wed", alerts: 51, cases: 8, closed: 38 },
  { time: "Thu", alerts: 47, cases: 7, closed: 33 },
  { time: "Fri", alerts: 39, cases: 4, closed: 28 },
];

const acceptanceTrendData = [
  { week: "W1", accepted: 18, rejected: 6, rate: 75 },
  { week: "W2", accepted: 24, rejected: 5, rate: 82.8 },
  { week: "W3", accepted: 22, rejected: 7, rate: 75.9 },
  { week: "W4", accepted: 29, rejected: 4, rate: 87.9 },
];

const meta = {
  title: "Data Display/TimeSeriesChart",
  component: TimeSeriesChart,
  tags: ["autodocs"],
} satisfies Meta<typeof TimeSeriesChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[720px] rounded-md border border-neutral-border bg-default-background p-4">
      <TimeSeriesChart
        data={incidentVolumeData}
        xAxisKey="time"
        series={[
          { dataKey: "alerts", color: "#FF0055", name: "Alerts" },
          { dataKey: "cases", color: "#00FFD9", name: "Cases" },
          { dataKey: "closed", color: "#D0FF00", name: "Closed" },
        ]}
      />
    </div>
  ),
};

export const DualAxis: Story = {
  render: () => (
    <div className="w-[720px] rounded-md border border-neutral-border bg-default-background p-4">
      <TimeSeriesChart
        data={acceptanceTrendData}
        xAxisKey="week"
        yAxes={[
          { id: "left", orientation: "left" },
          { id: "right", orientation: "right", domain: [0, 100], unit: "%" },
        ]}
        series={[
          { dataKey: "accepted", color: "#D0FF00", name: "Accepted", yAxisId: "left" },
          { dataKey: "rejected", color: "#FF0055", name: "Rejected", yAxisId: "left" },
          {
            dataKey: "rate",
            color: "#5F40EB",
            name: "Rate %",
            yAxisId: "right",
            strokeDasharray: "5 5",
          },
        ]}
      />
    </div>
  ),
};