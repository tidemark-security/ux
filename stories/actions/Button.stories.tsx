import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Download, Plus } from "lucide-react";

import { Button } from "../../src";

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
  render: () => {
    const buttonLabels: Record<(typeof variantOptions)[number], string> = {
      "brand-primary": "Launch workflow",
      "brand-secondary": "Download report",
      "brand-tertiary": "Open playbook",
      "neutral-primary": "Review details",
      "neutral-secondary": "Attach evidence",
      "neutral-tertiary": "View activity",
      "destructive-primary": "Delete integration",
      "destructive-secondary": "Remove analyst",
      "destructive-tertiary": "Clear filters",
    };

    return (
      <div className="space-y-4 p-2">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-neutral-900">Button</h3>
          <p className="text-sm text-neutral-600">
            All variants across sizes, icon placements, disabled, and loading states.
          </p>
        </div>
        <div className="space-y-6">
          {variantOptions.map((variant) => (
            <div key={variant} className="space-y-3 rounded-xl border border-neutral-200 p-4">
              <div className="text-sm font-medium text-neutral-900">{variant}</div>
              {sizeOptions.map((size) => (
                <div key={`${variant}-${size}`} className="space-y-2">
                  <div className="text-xs uppercase tracking-[0.08em] text-neutral-500">
                    {size}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant={variant} size={size}>
                      {buttonLabels[variant]}
                    </Button>
                    <Button variant={variant} size={size} icon={<Plus />}>
                      {buttonLabels[variant]}
                    </Button>
                    <Button variant={variant} size={size} iconRight={<ArrowRight />}>
                      {buttonLabels[variant]}
                    </Button>
                    <Button variant={variant} size={size} disabled>
                      {buttonLabels[variant]}
                    </Button>
                    <Button variant={variant} size={size} icon={<Plus />} disabled>
                      {buttonLabels[variant]}
                    </Button>
                    <Button variant={variant} size={size} loading>
                      Syncing
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  },
};