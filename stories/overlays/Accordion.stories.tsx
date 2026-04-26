import type { Meta, StoryObj } from "@storybook/react-vite";

import { Accordion } from "../../src";

const meta = {
  title: "Overlays/Accordion",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div className="w-[420px] rounded-md border border-neutral-border p-3">
      <Accordion
        defaultOpen
        trigger={
          <div className="flex w-full items-center justify-between">
            <span className="text-body-bold font-body-bold text-default-font">Detection context</span>
            <Accordion.Chevron />
          </div>
        }
      >
        <div className="text-body font-body text-subtext-color">
          This panel can collapse investigative context, enrichment output, or remediation notes.
        </div>
      </Accordion>
    </div>
  ),
};
