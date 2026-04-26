import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar } from "../../src";

const meta = {
  title: "Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="x-small">JD</Avatar>
      <Avatar size="small" variant="success">AN</Avatar>
      <Avatar size="medium" variant="warning">SO</Avatar>
      <Avatar size="large" variant="error">IR</Avatar>
      <Avatar size="x-large" variant="neutral" square>
        TM
      </Avatar>
      <Avatar size="large" image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces" imageAlt="Analyst avatar" />
    </div>
  ),
};
