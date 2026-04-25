import type { Meta, StoryObj } from "@storybook/react";
import { AlertTriangle, CheckCircle2, Info, RefreshCcw, XCircle } from "lucide-react";

import { Alert, Button, Progress, SkeletonCircle, SkeletonText, Toast } from "../src";

const meta = {
  title: "Feedback/Primitives",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Alerts: Story = {
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

export const Toasts: Story = {
  render: () => (
    <div className="grid gap-3">
      <Toast variant="neutral" icon={<Info />} title="Draft saved" description="Your changes are stored locally." />
      <Toast variant="success" icon={<CheckCircle2 />} title="Case linked" description="ALT-2048 was added to CAS-102." />
      <Toast variant="warning" icon={<AlertTriangle />} title="Review needed" description="A critical observable is waiting for approval." />
      <Toast variant="error" icon={<XCircle />} title="Upload failed" description="The file exceeded the configured limit." />
    </div>
  ),
};

export const Skeletons: Story = {
  render: () => (
    <div className="grid w-[480px] gap-5 rounded-md border border-neutral-border bg-default-background p-4">
      <div className="flex items-center gap-3">
        <SkeletonCircle />
        <div className="grid flex-1 gap-2">
          <SkeletonText size="label" className="w-1/3" />
          <SkeletonText />
        </div>
      </div>
      <SkeletonText size="header" />
      <SkeletonText size="section-header" className="w-3/4" />
      <SkeletonText size="subheader" className="w-1/2" />
    </div>
  ),
};

export const ProgressStates: Story = {
  render: () => (
    <div className="grid w-[480px] gap-4">
      <div className="grid gap-2">
        <span className="text-caption-bold font-caption-bold text-default-font">Queued</span>
        <Progress value={18} aria-label="Queued progress" />
      </div>
      <div className="grid gap-2">
        <span className="text-caption-bold font-caption-bold text-default-font">Enriching</span>
        <Progress value={64} aria-label="Enriching progress" />
      </div>
      <div className="grid gap-2">
        <span className="text-caption-bold font-caption-bold text-default-font">Retrying</span>
        <Progress value={42} aria-label="Retrying progress">
          <Progress.Indicator className="bg-warning-600" style={{ transform: "translateX(-58%)" }} />
        </Progress>
        <div className="flex items-center gap-1 text-caption font-caption text-subtext-color">
          <RefreshCcw className="h-3 w-3" /> Next attempt scheduled
        </div>
      </div>
    </div>
  ),
};
