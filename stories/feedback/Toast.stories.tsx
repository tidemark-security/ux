import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

import { Toast } from "../../src";

const meta = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="grid gap-3">
      <Toast variant="neutral" icon={<Info />} title="Draft saved" description="Your changes are stored locally." />
      <Toast variant="success" icon={<CheckCircle2 />} title="Case linked" description="ALT-2048 was added to CAS-102." />
      <Toast variant="warning" icon={<AlertTriangle />} title="Review needed" description="A critical observable is waiting for approval." />
      <Toast variant="error" icon={<XCircle />} title="Upload failed" description="The file exceeded the configured limit." />
    </div>
  ),
};
