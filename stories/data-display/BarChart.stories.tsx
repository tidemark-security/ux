import type { Meta, StoryObj } from "@storybook/react-vite";

import { BarChart } from "../../src";

const incidentVolumeData = [
  { name: "Mon", alerts: 42, cases: 6 },
  { name: "Tue", alerts: 36, cases: 5 },
  { name: "Wed", alerts: 51, cases: 8 },
  { name: "Thu", alerts: 47, cases: 7 },
  { name: "Fri", alerts: 39, cases: 4 },
];

const dispositionData = [
  { name: "Email", accepted: 18, rejected: 7 },
  { name: "Endpoint", accepted: 25, rejected: 5 },
  { name: "Network", accepted: 14, rejected: 6 },
  { name: "Identity", accepted: 11, rejected: 4 },
];

const meta = {
  title: "Data Display/BarChart",
  component: BarChart,
  tags: ["autodocs"],
  args: {
    data: incidentVolumeData,
    dataKeys: ["alerts", "cases"],
    xAxisKey: "name",
  },
} satisfies Meta<typeof BarChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[720px] rounded-md border border-neutral-border bg-default-background p-4">
      <BarChart {...args} />
    </div>
  ),
};

export const Stacked: Story = {
  args: {
    data: dispositionData,
    dataKeys: ["accepted", "rejected"],
    stacked: true,
    colors: ["#B6E600", "#FF0055"],
  },
  render: (args) => (
    <div className="w-[720px] rounded-md border border-neutral-border bg-default-background p-4">
      <BarChart {...args} />
    </div>
  ),
};

export const VerticalComparison: Story = {
  args: {
    data: [
      { analyst: "Taylor", alerts: 48, cases: 7 },
      { analyst: "Riley", alerts: 43, cases: 6 },
      { analyst: "Jordan", alerts: 39, cases: 5 },
      { analyst: "Casey", alerts: 34, cases: 4 },
    ],
    layout: "vertical",
    yAxisKey: "analyst",
    series: [
      { dataKey: "alerts", name: "Alerts Triaged", color: "#FF0055" },
      { dataKey: "cases", name: "Cases Closed", color: "#00FFD9" },
    ],
    xAxisProps: { type: "number" },
    yAxisProps: { type: "category", width: 100, tick: { fontSize: 12 } },
  },
  render: (args) => (
    <div className="w-[720px] rounded-md border border-neutral-border bg-default-background p-4">
      <BarChart {...args} />
    </div>
  ),
};