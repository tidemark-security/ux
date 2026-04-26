import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import { SemiDonutChart } from "../../src";

const dispositionData = [
  { name: "True Positive", value: 41, color: "#B6E600" },
  { name: "Benign Positive", value: 18, color: "#00E2C2" },
  { name: "False Positive", value: 9, color: "#FF0055" },
  { name: "Escalated", value: 6, color: "#5F40EB" },
];

const meta = {
  title: "Data Display/SemiDonutChart",
  component: SemiDonutChart,
  tags: ["autodocs"],
  args: {
    data: dispositionData,
    centerLabel: "Closed alerts",
    centerValue: 74,
  },
} satisfies Meta<typeof SemiDonutChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[420px] rounded-md border border-neutral-border bg-default-background p-4">
      <SemiDonutChart {...args} />
    </div>
  ),
};

export const ClickableLegend: Story = {
  args: {
    onSliceClick: fn(),
  },
  render: (args) => (
    <div className="w-[420px] rounded-md border border-neutral-border bg-default-background p-4">
      <SemiDonutChart {...args} />
    </div>
  ),
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: /true positive/i }));
    await expect(args.onSliceClick).toHaveBeenCalledWith(dispositionData[0]);
  },
};