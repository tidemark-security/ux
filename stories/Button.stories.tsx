import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Download, Plus } from "lucide-react";

import { Button, IconButton, LinkButton } from "../src";

const variantOptions = [
  "brand-primary",
  "brand-secondary",
  "brand-tertiary",
  "neutral-primary",
  "neutral-secondary",
  "neutral-tertiary",
  "destructive-primary",
  "destructive-secondary",
  "destructive-tertiary",
] as const;

const sizeOptions = ["small", "medium", "large"] as const;

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
    variant: {
      control: "select",
      options: variantOptions,
    },
    size: {
      control: "inline-radio",
      options: sizeOptions,
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BrandPrimary: Story = {
  args: {
    variant: "brand-primary",
    children: "Launch workflow",
    icon: <Plus />,
  },
};

export const BrandSecondary: Story = {
  args: {
    variant: "brand-secondary",
    children: "Download report",
    iconRight: <Download />,
  },
};

export const BrandTertiary: Story = {
  args: {
    variant: "brand-tertiary",
    children: "Open playbook",
  },
};

export const NeutralPrimary: Story = {
  args: {
    variant: "neutral-primary",
    children: "Review details",
  },
};

export const NeutralSecondary: Story = {
  args: {
    variant: "neutral-secondary",
    children: "Attach evidence",
  },
};

export const NeutralTertiary: Story = {
  args: {
    variant: "neutral-tertiary",
    children: "View activity",
  },
};

export const DestructivePrimary: Story = {
  args: {
    variant: "destructive-primary",
    children: "Delete integration",
  },
};

export const DestructiveSecondary: Story = {
  args: {
    variant: "destructive-secondary",
    children: "Remove analyst",
  },
};

export const DestructiveTertiary: Story = {
  args: {
    variant: "destructive-tertiary",
    children: "Clear filters",
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
      <Button variant="brand-primary" icon={<Plus />}>
        Create case
      </Button>
      <IconButton icon={<Download />} aria-label="Download" />
      <LinkButton iconRight={<ArrowRight />}>View changelog</LinkButton>
    </div>
  ),
};