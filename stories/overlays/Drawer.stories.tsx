import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PanelRightClose } from "lucide-react";

import { Button, Drawer } from "../../src";

const meta = {
  title: "Overlays/Drawer",
  component: Drawer,
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex gap-3">
        <Button variant="neutral-secondary" icon={<PanelRightClose />} onClick={() => setOpen(true)}>
          Open drawer
        </Button>
        <Drawer open={open} onOpenChange={setOpen}>
          <Drawer.Content className="w-[420px] p-5">
            <Drawer.Title className="text-heading-2 font-heading-2 text-default-font">Entity details</Drawer.Title>
            <Drawer.Description className="text-body font-body text-subtext-color">
              Side panels can host inspectors, forms, and workflow controls.
            </Drawer.Description>
            <div className="mt-4 grid gap-2">
              <div className="rounded-md border border-neutral-border p-3 text-body font-body text-default-font">
                Last enrichment: 3 minutes ago
              </div>
              <div className="rounded-md border border-neutral-border p-3 text-body font-body text-default-font">
                Assigned analyst: Taylor
              </div>
            </div>
          </Drawer.Content>
        </Drawer>
      </div>
    );
  },
};
