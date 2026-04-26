import type { Meta, StoryObj } from "@storybook/react-vite";
import { MoreHorizontal } from "lucide-react";

import { Button, DropdownMenu } from "../../src";

const meta = {
  title: "Overlays/DropdownMenu",
  component: DropdownMenu.Root,
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="neutral-secondary" icon={<MoreHorizontal />}>Actions</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.DropdownItem label="Open in case view" />
        <DropdownMenu.DropdownItem label="Queue enrichment" hint="E" showHint />
        <DropdownMenu.DropdownDivider />
        <DropdownMenu.DropdownItem label="Archive" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
};
