import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "../../src";

const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Compact checkbox control for dense operational selection flows. It keeps native input semantics while matching Tidemark light and dark mode visual states.",
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

function SelectionList() {
  const [selectedIds, setSelectedIds] = useState(new Set([1, 3]));
  const rows = [
    { id: 1, label: "ALT-0000035", detail: "DNS Beacon Pattern" },
    { id: 2, label: "ALT-0000057", detail: "Data Exfiltration via Cloud Storage" },
    { id: 3, label: "ALT-0000132", detail: "Privilege Escalation Attempt" },
  ];
  const selectedCount = rows.filter((row) => selectedIds.has(row.id)).length;
  const allSelected = selectedCount === rows.length;
  const partiallySelected = selectedCount > 0 && !allSelected;

  const setRowSelected = (id: number, checked: boolean) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  return (
    <div className="flex w-[460px] flex-col gap-3 border border-neutral-border bg-default-background p-4">
      <div className="flex items-center gap-3 border-b border-neutral-border pb-3">
        <Checkbox
          aria-label="Select all alerts"
          checked={allSelected}
          indeterminate={partiallySelected}
          size="small"
          onCheckedChange={(checked) => {
            setSelectedIds(new Set(checked ? rows.map((row) => row.id) : []));
          }}
        />
        <span className="text-caption font-caption text-subtext-color">
          {selectedCount} of {rows.length} alerts selected
        </span>
      </div>

      {rows.map((row) => (
        <div key={row.id} className="flex items-center gap-3">
          <Checkbox
            aria-label={`Select ${row.label}`}
            checked={selectedIds.has(row.id)}
            size="small"
            onCheckedChange={(checked) => setRowSelected(row.id, checked)}
          />
          <span className="flex min-w-0 flex-col">
            <span className="text-caption-bold font-caption-bold text-default-font">{row.label}</span>
            <span className="truncate text-caption font-caption text-subtext-color">{row.detail}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export const AlertSelection: Story = {
  render: () => <SelectionList />,
};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-6 border border-neutral-border bg-default-background p-6">
      <Checkbox aria-label="Unchecked" size="small" />
      <Checkbox aria-label="Checked" checked size="small" />
      <Checkbox aria-label="Indeterminate" checked={false} indeterminate size="small" />
      <Checkbox aria-label="Disabled" disabled size="small" />
      <Checkbox aria-label="Disabled checked" checked disabled size="small" />
    </div>
  ),
};
