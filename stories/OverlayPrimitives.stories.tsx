import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MoreHorizontal, PanelRightClose } from "lucide-react";

import { Button, Dialog, Drawer, DropdownMenu } from "../src";

const meta = {
  title: "Overlays/Primitives",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const DialogAndDrawer: Story = {
  render: () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
      <div className="flex gap-3">
        <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
        <Button variant="neutral-secondary" icon={<PanelRightClose />} onClick={() => setDrawerOpen(true)}>
          Open drawer
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Dialog.Content className="w-[480px] p-5">
            <Dialog.Title className="text-heading-2 font-heading-2 text-default-font">Escalation approval</Dialog.Title>
            <Dialog.Description className="text-body font-body text-subtext-color">
              Review the action and confirm whether this workflow should proceed.
            </Dialog.Description>
            <div className="mt-3 flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button variant="neutral-secondary">Cancel</Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button>Approve</Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog>

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
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

export const DropdownMenuStory: Story = {
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