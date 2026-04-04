import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Download, Plus } from "lucide-react";

import { Button, IconButton, LinkButton } from "../src";

const meta = {
  title: "Actions/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Launch workflow",
    variant: "brand-primary",
    size: "medium",
    loading: false,
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: <Plus />,
  },
};

export const Secondary: Story = {
  args: {
    variant: "brand-secondary",
    children: "Download report",
    iconRight: <Download />,
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive-primary",
    children: "Delete integration",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Syncing",
  },
};

export const ButtonFamily: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button icon={<Plus />}>Create case</Button>
      <IconButton icon={<Download />} aria-label="Download" />
      <LinkButton iconRight={<ArrowRight />}>View changelog</LinkButton>
    </div>
  ),
};