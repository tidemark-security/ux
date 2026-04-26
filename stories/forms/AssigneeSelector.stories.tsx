import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { AssigneeSelector } from "../../src";

const users = [
  { userId: 1, username: "alex", email: "alex@tidemark.ai" },
  { userId: 2, username: "riley", email: "riley@tidemark.ai" },
  { userId: 3, username: "sam", email: "sam@tidemark.ai" },
];

const meta = {
  title: "Forms/AssigneeSelector",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const AssignMode: Story = {
  render: () => {
    const [assignee, setAssignee] = useState<string | null>("alex");

    return (
      <div className="flex w-[420px] flex-col gap-3 rounded-md border border-neutral-border bg-default-background p-4">
        <AssigneeSelector
          mode="assign"
          size="medium"
          currentAssignee={assignee}
          currentUser="riley"
          users={users}
          onUnassign={() => setAssignee(null)}
          onAssignToMe={() => setAssignee("riley")}
          onAssignToUser={setAssignee}
        />
        <pre className="rounded-md border border-neutral-border bg-neutral-50 p-3 text-caption font-caption text-default-font">
          {JSON.stringify({ assignee }, null, 2)}
        </pre>
      </div>
    );
  },
};

export const FilterMode: Story = {
  render: () => {
    const [selectedAssignees, setSelectedAssignees] = useState<string[] | null>(["alex"]);

    return (
      <div className="flex w-[420px] flex-col gap-3 rounded-md border border-neutral-border bg-default-background p-4">
        <AssigneeSelector
          mode="filter"
          selectedAssignees={selectedAssignees}
          currentUser="riley"
          users={users}
          onSelectionChange={setSelectedAssignees}
        />
        <pre className="rounded-md border border-neutral-border bg-neutral-50 p-3 text-caption font-caption text-default-font">
          {JSON.stringify({ selectedAssignees }, null, 2)}
        </pre>
      </div>
    );
  },
};