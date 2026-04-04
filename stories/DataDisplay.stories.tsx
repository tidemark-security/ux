import type { Meta, StoryObj } from "@storybook/react";

import { Tag } from "../src";

const meta = {
  title: "Data Display/Tag",
  component: Tag,
  tags: ["autodocs"],
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag tagText="Default" />
      <Tag tagText="P0" p="0" />
      <Tag tagText="P1" p="1" />
      <Tag tagText="P2" p="2" />
      <Tag tagText="P3" p="3" />
      <Tag tagText="P4" p="4" />
      <Tag tagText="P5" p="5" />
    </div>
  ),
};

export const Removable: Story = {
  args: {
    tagText: "sigma-rule",
    showDelete: true,
    p: "4",
  },
};