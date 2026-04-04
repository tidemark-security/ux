import { ShieldCheck, Sparkles } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { Accordion, IconWithBackground, Priority, State } from "../src";

const meta = {
  title: "Status/Misc Primitives",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const StatusChips: Story = {
  render: () => (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        <Priority priority="info" />
        <Priority priority="medium" />
        <Priority priority="critical" />
        <Priority priority="extreme" />
      </div>
      <div className="flex flex-wrap gap-2">
        <State state="new" />
        <State state="in_progress" />
        <State state="closed_true_positive" />
        <State state="tsk_done" />
      </div>
    </div>
  ),
};

export const IconTiles: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <IconWithBackground variant="brand" size="small" icon={<Sparkles />} />
      <IconWithBackground variant="accent-1" size="medium" icon={<ShieldCheck />} />
      <IconWithBackground variant="neutral" size="large" icon={<ShieldCheck />} />
    </div>
  ),
};

export const AccordionStory: Story = {
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