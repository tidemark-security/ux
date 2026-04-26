import type { Meta, StoryObj } from "@storybook/react-vite";

import { RelativeTime } from "../../src";

const meta = {
  title: "Data Display/RelativeTime",
  component: RelativeTime,
  tags: ["autodocs"],
  args: {
    value: new Date(Date.now() - 1000 * 60 * 5),
  },
} satisfies Meta<typeof RelativeTime>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TimelineExamples: Story = {
  render: () => (
    <div className="grid gap-3 rounded-md border border-neutral-border bg-default-background p-4 text-body font-body text-default-font">
      <div className="flex items-center justify-between gap-4">
        <span>Queued enrichment</span>
        <RelativeTime value={new Date(Date.now() - 1000 * 60 * 3)} />
      </div>
      <div className="flex items-center justify-between gap-4">
        <span>Policy updated</span>
        <RelativeTime value={new Date(Date.now() - 1000 * 60 * 62)} />
      </div>
      <div className="flex items-center justify-between gap-4">
        <span>Next review window</span>
        <RelativeTime value={new Date(Date.now() + 1000 * 60 * 90)} />
      </div>
    </div>
  ),
};