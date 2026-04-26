import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

import { Alert, Button } from "../../src";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="grid w-[640px] gap-3">
      <Alert
        variant="neutral"
        icon={<Info />}
        title="Investigation queued"
        description="The enrichment worker will update this record when new context is available."
      />
      <Alert
        variant="success"
        icon={<CheckCircle2 />}
        title="Policy saved"
        description="Changes are active for future alerts."
        actions={<Button size="small" variant="neutral-secondary">View</Button>}
      />
      <Alert
        variant="warning"
        icon={<AlertTriangle />}
        title="Review required"
        description="A critical observable needs analyst approval before remediation."
      />
      <Alert variant="error" icon={<XCircle />} title="Connection failed" description="Check the integration credentials." />
    </div>
  ),
};
