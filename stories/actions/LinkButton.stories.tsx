import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Plus } from "lucide-react";

import { LinkButton } from "../../src";

const variantOptions = ["brand", "neutral"] as const;
const sizeOptions = ["small", "medium", "large"] as const;

const meta = {
  title: "Actions/LinkButton",
  component: LinkButton,
  tags: ["autodocs"],
  args: {
    children: "View changelog",
    variant: "neutral",
    size: "medium",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: variantOptions,
    },
    size: {
      control: "inline-radio",
      options: sizeOptions,
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Brand: Story = {
  args: {
    variant: "brand",
  },
};

export const Neutral: Story = {
  args: {
    variant: "neutral",
  },
};

export const WithLeadingIcon: Story = {
  args: {
    variant: "brand",
    children: "Create case",
    icon: <Plus />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    children: "View changelog",
    iconRight: <ArrowRight />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const LinkButtonFamily: Story = {
  render: () => (
    <div className="space-y-4 p-2">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-neutral-900">Link Button</h3>
        <p className="text-sm text-neutral-600">
          All link button variants across sizes with and without icons, plus disabled states.
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
                  <LinkButton variant={variant} size={size}>
                    View changelog
                  </LinkButton>
                  <LinkButton variant={variant} size={size} icon={<Plus />}>
                    Create case
                  </LinkButton>
                  <LinkButton variant={variant} size={size} iconRight={<ArrowRight />}>
                    View changelog
                  </LinkButton>
                  <LinkButton variant={variant} size={size} icon={<Plus />} iconRight={<ArrowRight />}>
                    Create case
                  </LinkButton>
                  <LinkButton variant={variant} size={size} disabled>
                    View changelog
                  </LinkButton>
                  <LinkButton variant={variant} size={size} iconRight={<ArrowRight />} disabled>
                    View changelog
                  </LinkButton>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
};