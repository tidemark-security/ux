import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info } from "lucide-react";

import { Button, Tooltip } from "../../src";

const meta = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Tooltip.Provider delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button variant="neutral-secondary" icon={<Info />}>Hover for details</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          Explains a non-obvious action without committing the page to persistent help copy.
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};