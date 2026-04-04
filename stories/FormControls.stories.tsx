import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CalendarDays, Search } from "lucide-react";

import { Select, Switch, TextArea, TextField } from "../src";

const meta = {
  title: "Forms/Controls",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextInputs: Story = {
  render: () => (
    <div className="grid w-[420px] gap-4">
      <TextField label="Search" helpText="Supports human IDs and keywords" icon={<Search />}>
        <TextField.Input placeholder="ALT-2048" />
      </TextField>
      <TextField label="Scheduled time" variant="filled" icon={<CalendarDays />}>
        <TextField.Input value="2026-04-03 14:30" readOnly />
      </TextField>
      <TextArea label="Notes" helpText="Markdown is supported.">
        <TextArea.Input placeholder="Add analyst notes or remediation context" />
      </TextArea>
    </div>
  ),
};

export const SelectionControls: Story = {
  render: () => {
    const [priority, setPriority] = useState("medium");
    const [enabled, setEnabled] = useState(true);

    return (
      <div className="grid w-[420px] gap-4">
        <Select
          label="Priority"
          value={priority}
          onValueChange={setPriority}
          placeholder="Choose priority"
          helpText="Used for queue ordering"
        >
          <Select.Item value="low">Low</Select.Item>
          <Select.Item value="medium">Medium</Select.Item>
          <Select.Item value="high">High</Select.Item>
          <Select.Item value="critical">Critical</Select.Item>
        </Select>
        <div className="flex items-center justify-between rounded-md border border-neutral-border bg-default-background px-3 py-3">
          <div className="flex flex-col gap-1">
            <span className="text-caption-bold font-caption-bold text-default-font">Live enrichment</span>
            <span className="text-caption font-caption text-subtext-color">Toggle background enrichment polling</span>
          </div>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>
      </div>
    );
  },
};