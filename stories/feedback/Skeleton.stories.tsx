import type { Meta, StoryObj } from "@storybook/react-vite";

import { SkeletonCircle, SkeletonText } from "../../src";

const meta = {
  title: "Feedback/Skeleton",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-[480px] gap-5 rounded-md border border-neutral-border bg-default-background p-4">
      <div className="flex items-center gap-3">
        <SkeletonCircle />
        <div className="grid flex-1 gap-2">
          <SkeletonText size="label" className="w-1/3" />
          <SkeletonText />
        </div>
      </div>
      <SkeletonText size="header" />
      <SkeletonText size="section-header" className="w-3/4" />
      <SkeletonText size="subheader" className="w-1/2" />
    </div>
  ),
};
