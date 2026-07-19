import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { DateRangePicker, type DateRangeValue } from "../../src";

const meta = {
  title: "Forms/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
} satisfies Meta<typeof DateRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<DateRangeValue | null>(null);

    return (
      <div className="flex w-[420px] flex-col gap-3 rounded-md border border-neutral-border bg-default-background p-4">
        <DateRangePicker value={value} onChange={setValue} />
        <pre className="rounded-md border border-neutral-border bg-neutral-50 p-3 text-caption font-caption text-default-font">
          {JSON.stringify({ value }, null, 2)}
        </pre>
      </div>
    );
  },
};

export const Toolbar: Story = {
  render: () => {
    const [value, setValue] = useState<DateRangeValue | null>(null);

    return (
      <div className="flex w-[420px] flex-col gap-3 rounded-md border border-neutral-border bg-default-background p-4">
        <div className="w-40 overflow-hidden rounded-md bg-[color-mix(in_srgb,rgb(var(--color-neutral-100))_88%,black)]">
          <DateRangePicker presentation="toolbar" value={value} onChange={setValue} />
        </div>
        <pre className="rounded-md border border-neutral-border bg-neutral-50 p-3 text-caption font-caption text-default-font">
          {JSON.stringify({ value }, null, 2)}
        </pre>
      </div>
    );
  },
};
