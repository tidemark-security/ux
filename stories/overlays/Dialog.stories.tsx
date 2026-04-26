import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Dialog } from "../../src";

const meta = {
  title: "Overlays/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex gap-3">
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
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
      </div>
    );
  },
};
