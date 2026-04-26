import type { Meta, StoryObj } from "@storybook/react-vite";
import { ShieldCheck, Sparkles } from "lucide-react";

import { IconWithBackground } from "../../src";

const meta = {
  title: "Data Display/IconWithBackground",
  component: IconWithBackground,
  tags: ["autodocs"],
} satisfies Meta<typeof IconWithBackground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <IconWithBackground variant="brand" size="small" icon={<Sparkles />} />
      <IconWithBackground variant="accent-1" size="medium" icon={<ShieldCheck />} />
      <IconWithBackground variant="neutral" size="large" icon={<ShieldCheck />} />
    </div>
  ),
};
