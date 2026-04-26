import type { Meta, StoryObj } from "@storybook/react-vite";

import { MarkdownContent } from "../../src";

const sampleMarkdown = `# Analyst Summary

This alert appears tied to a suspicious PowerShell execution chain.

## Recommended steps

- Review the parent process tree
- Validate whether the host is expected to run this script
- Capture a concise triage note

### Evidence

| Field | Value |
| --- | --- |
| Host | WS-1042 |
| User | analyst@tidemark.ai |
| Severity | High |

> Treat this as suspicious until the execution path is validated.

Use \`Get-Process\` to inspect the parent command.

- [ ] Confirm user intent
- [x] Queue enrichment

[Open case](https://example.com/cases/CAS-102)
`;

const meta = {
  title: "Data Display/MarkdownContent",
  component: MarkdownContent,
  tags: ["autodocs"],
  args: {
    content: sampleMarkdown,
  },
} satisfies Meta<typeof MarkdownContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[720px] rounded-md border border-neutral-border bg-default-background p-5">
      <MarkdownContent {...args} />
    </div>
  ),
};

export const BadgeLinks: Story = {
  args: {
    content: "Review [endpoint telemetry](https://example.com) and [recent notes](https://example.com/notes).",
    linkStyle: "badge",
  },
  render: (args) => (
    <div className="w-[560px] rounded-md border border-neutral-border bg-default-background p-5">
      <MarkdownContent {...args} />
    </div>
  ),
};