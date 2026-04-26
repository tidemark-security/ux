import type { Meta, StoryObj } from "@storybook/react-vite";

import { Priority } from "../../src";

const meta = {
  title: "Status/Priority",
  component: Priority,
  tags: ["autodocs"],
} satisfies Meta<typeof Priority>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Priority priority="info" />
      <Priority priority="low" />
      <Priority priority="medium" />
      <Priority priority="high" />
      <Priority priority="critical" />
      <Priority priority="extreme" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-3">
      <Priority priority="high" size="mini" />
      <Priority priority="high" size="small" />
      <Priority priority="high" size="maxi" />
    </div>
  ),
};
