import type { Meta, StoryObj } from "@storybook/react-vite";
import { Download } from "lucide-react";

import { IconButton } from "../../src";

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
  title: "Actions/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    variant: "neutral-tertiary",
    size: "medium",
    icon: <Download />,
    "aria-label": "Download report",
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
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BrandPrimary: Story = {
  args: {
    variant: "brand-primary",
  },
};

export const BrandSecondary: Story = {
  args: {
    variant: "brand-secondary",
  },
};

export const BrandTertiary: Story = {
  args: {
    variant: "brand-tertiary",
  },
};

export const NeutralPrimary: Story = {
  args: {
    variant: "neutral-primary",
  },
};

export const NeutralSecondary: Story = {
  args: {
    variant: "neutral-secondary",
  },
};

export const NeutralTertiary: Story = {
  args: {
    variant: "neutral-tertiary",
  },
};

export const DestructivePrimary: Story = {
  args: {
    variant: "destructive-primary",
  },
};

export const DestructiveSecondary: Story = {
  args: {
    variant: "destructive-secondary",
  },
};

export const DestructiveTertiary: Story = {
  args: {
    variant: "destructive-tertiary",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const IconButtonFamily: Story = {
  render: () => (
    <div className="space-y-4 p-2">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-neutral-900">Icon Button</h3>
        <p className="text-sm text-neutral-600">
          All icon button variants across sizes with enabled, disabled, and loading states.
        </p>
      </div>
      <div className="space-y-6">
        {variantOptions.map((variant) => (
          <div key={variant} className="space-y-3 rounded-xl border border-neutral-200 p-4">
            <div className="text-sm font-medium text-neutral-900">{variant}</div>
            {sizeOptions.map((size) => (
              <div key={`${variant}-${size}`} className="space-y-2">
                <div className="text-xs uppercase tracking-[0.08em] text-neutral-500">{size}</div>
                <div className="flex flex-wrap items-center gap-3">
                  <IconButton
                    variant={variant}
                    size={size}
                    icon={<Download />}
                    aria-label={`${variant} ${size} download report`}
                  />
                  <IconButton
                    variant={variant}
                    size={size}
                    icon={<Download />}
                    aria-label={`${variant} ${size} download report disabled`}
                    disabled
                  />
                  <IconButton
                    variant={variant}
                    size={size}
                    icon={<Download />}
                    aria-label={`${variant} ${size} download report loading`}
                    loading
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
};