import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, Filter, FolderKanban, Sparkles } from "lucide-react";

import { ToggleGroup } from "../../src";

const meta = {
  title: "Forms/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleSelect: Story = {
  render: () => {
    const [value, setValue] = useState("alerts");

    return (
      <ToggleGroup value={value} onValueChange={setValue}>
        <ToggleGroup.Item icon={<Bell />} value="alerts">
          Alerts
        </ToggleGroup.Item>
        <ToggleGroup.Item icon={<FolderKanban />} value="cases">
          Cases
        </ToggleGroup.Item>
        <ToggleGroup.Item icon={<Sparkles />} value="assist">
          Assist
        </ToggleGroup.Item>
      </ToggleGroup>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["triage", "review"]);

    return (
      <div className="grid gap-3">
        <ToggleGroup type="multiple" value={value} onValueChange={setValue}>
          <ToggleGroup.Item icon={<Filter />} value="triage">
            Triage
          </ToggleGroup.Item>
          <ToggleGroup.Item icon={<Sparkles />} value="review">
            Review
          </ToggleGroup.Item>
          <ToggleGroup.Item icon={null} value="disabled" disabled>
            Disabled
          </ToggleGroup.Item>
        </ToggleGroup>
        <pre className="rounded-md border border-neutral-border bg-neutral-50 p-3 text-caption font-caption text-default-font">
          {JSON.stringify({ value }, null, 2)}
        </pre>
      </div>
    );
  },
};