import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DateRange } from "react-day-picker";

import { Calendar, DateRangePicker } from "../../../src";

const meta = {
  title: "Patterns/Forms/Date Controls",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const CalendarRange: Story = {
  render: () => {
    const [selected, setSelected] = useState<DateRange | undefined>();

    return (
      <div className="rounded-md border border-neutral-border bg-default-background p-4">
        <Calendar mode="range" selected={selected} onSelect={setSelected as never} />
      </div>
    );
  },
};

export const RelativeDateRangePicker: Story = {
  render: () => {
    const [value, setValue] = useState<{
      start: string;
      end: string;
      preset?: string;
    } | null>(null);

    return (
      <div className="flex w-[520px] flex-col gap-3">
        <DateRangePicker value={value} onChange={setValue} />
        <pre className="overflow-auto rounded-md border border-neutral-border bg-neutral-50 p-3 text-caption font-caption text-default-font">
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    );
  },
};