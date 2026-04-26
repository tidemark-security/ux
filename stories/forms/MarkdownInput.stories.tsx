import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { MarkdownInput } from "../../src";

const initialValue = `# Investigation note

Summarize the alert, add evidence, and capture the next steps.

- Review parent process
- Validate endpoint owner
- Queue enrichment if needed
`;

const meta = {
  title: "Forms/MarkdownInput",
  component: MarkdownInput,
  tags: ["autodocs"],
  args: {
    variant: "default",
  },
} satisfies Meta<typeof MarkdownInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(initialValue);

    return (
      <div className="grid w-[820px] gap-3">
        <div className="h-[420px] rounded-md border border-neutral-border bg-default-background p-4">
          <MarkdownInput {...args} value={value} onChange={setValue} className="h-full" />
        </div>
        <pre className="max-h-[180px] overflow-auto rounded-md border border-neutral-border bg-neutral-50 p-3 text-caption font-caption text-default-font">
          {value}
        </pre>
      </div>
    );
  },
};

export const Compact: Story = {
  render: () => {
    const [value, setValue] = useState("Quick note about observed activity.");

    return (
      <div className="h-[280px] w-[720px] rounded-md border border-neutral-border bg-default-background p-4">
        <MarkdownInput value={value} onChange={setValue} variant="compact" className="h-full" />
      </div>
    );
  },
};

export const Empty: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="h-[420px] w-[820px] rounded-md border border-neutral-border bg-default-background p-4">
        <MarkdownInput {...args} value={value} onChange={setValue} className="h-full" autoFocus={false} />
      </div>
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Write a note...")).toBeVisible();
    await userEvent.click(canvas.getByRole("textbox", { name: "editable markdown" }));
    await expect(canvas.getByText("Write a note...")).not.toBeVisible();
  },
};

export const SourceMode: Story = {
  render: (args) => {
    const [value, setValue] = useState("Review the suspicious process tree.");

    return (
      <div className="h-[420px] w-[820px] rounded-md border border-neutral-border bg-default-background p-4">
        <MarkdownInput {...args} value={value} onChange={setValue} className="h-full" autoFocus={false} />
      </div>
    );
  },
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Markdown source view" }));

    const richTextEditor = canvasElement.querySelector(".mdxeditor-rich-text-editor");
    const sourceEditor = canvasElement.querySelector(".cm-sourceView");
    const codeMirrorEditor = canvasElement.querySelector(".cm-editor");

    await expect(richTextEditor).not.toBeVisible();
    await expect(sourceEditor).toBeVisible();
    await expect(codeMirrorEditor?.getBoundingClientRect().height).toBeGreaterThan(300);
  },
};