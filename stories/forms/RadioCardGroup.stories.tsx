import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, Bot, ShieldCheck } from "lucide-react";

import { RadioCardGroup } from "../../src";

const meta = {
  title: "Forms/RadioCardGroup",
  component: RadioCardGroup,
  tags: ["autodocs"],
  args: {
    value: "monitor",
  },
} satisfies Meta<typeof RadioCardGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Options: Story = {
  render: () => {
    const [value, setValue] = useState("monitor");

    return (
      <RadioCardGroup value={value} onValueChange={setValue} className="grid w-[680px] grid-cols-3 gap-3">
        <RadioCardGroup.RadioCard value="monitor">
          <Bell className="h-5 w-5" />
          <div className="grid gap-1">
            <span className="text-body-bold font-body-bold">Monitor</span>
            <span className="text-caption font-caption text-neutral-1000">Watch alerts and queue changes.</span>
          </div>
        </RadioCardGroup.RadioCard>
        <RadioCardGroup.RadioCard value="triage">
          <Bot className="h-5 w-5" />
          <div className="grid gap-1">
            <span className="text-body-bold font-body-bold">Triage</span>
            <span className="text-caption font-caption text-neutral-1000">Prioritize findings with AI support.</span>
          </div>
        </RadioCardGroup.RadioCard>
        <RadioCardGroup.RadioCard value="remediate">
          <ShieldCheck className="h-5 w-5" />
          <div className="grid gap-1">
            <span className="text-body-bold font-body-bold">Remediate</span>
            <span className="text-caption font-caption text-neutral-1000">Coordinate response actions.</span>
          </div>
        </RadioCardGroup.RadioCard>
      </RadioCardGroup>
    );
  },
};

export const Compact: Story = {
  render: () => {
    const [value, setValue] = useState("auto");

    return (
      <RadioCardGroup value={value} onValueChange={setValue} className="w-[420px] flex-col">
        <RadioCardGroup.RadioCard value="manual" hideRadio>
          <span className="text-body-bold font-body-bold">Manual review</span>
          <span className="text-caption font-caption text-neutral-1000">Require analyst approval before action.</span>
        </RadioCardGroup.RadioCard>
        <RadioCardGroup.RadioCard value="auto" hideRadio>
          <span className="text-body-bold font-body-bold">Auto approve low risk</span>
          <span className="text-caption font-caption text-neutral-1000">Only pause on high-impact changes.</span>
        </RadioCardGroup.RadioCard>
        <RadioCardGroup.RadioCard value="disabled" hideRadio disabled>
          <span className="text-body-bold font-body-bold">Locked policy</span>
          <span className="text-caption font-caption text-neutral-1000">Managed by workspace administrators.</span>
        </RadioCardGroup.RadioCard>
      </RadioCardGroup>
    );
  },
};
