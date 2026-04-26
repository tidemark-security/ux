import type { Meta, StoryObj } from "@storybook/react-vite";

import { State } from "../../src";

const meta = {
  title: "Status/State",
  component: State,
  tags: ["autodocs"],
} satisfies Meta<typeof State>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlertStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <State state="new" />
      <State state="in_progress" />
      <State state="escalated" />
      <State state="closed_true_positive" />
      <State state="closed_duplicate" />
    </div>
  ),
};

export const TaskStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <State state="tsk_todo" />
      <State state="tsk_in_progress" />
      <State state="tsk_done" />
    </div>
  ),
};
