import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCircle2, Server, ShieldAlert, UserRound } from "lucide-react";

import { Badge } from "../../src";

const meta = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge icon={<ShieldAlert />}>Brand</Badge>
      <Badge variant="neutral" icon={<UserRound />}>Assigned</Badge>
      <Badge variant="success" icon={<CheckCircle2 />}>Resolved</Badge>
      <Badge variant="warning">Needs review</Badge>
      <Badge variant="error">Blocked</Badge>
      <Badge compact icon={<Server />} role="img" aria-label="Server" />
    </div>
  ),
};
