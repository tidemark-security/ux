import type { Meta, StoryObj } from "@storybook/react-vite";
import { Database, FileText, Folder } from "lucide-react";

import { TreeView } from "../../src";

const meta = {
  title: "Data Display/TreeView",
  component: TreeView,
  tags: ["autodocs"],
} satisfies Meta<typeof TreeView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[360px] rounded-md border border-neutral-border bg-default-background p-3">
      <TreeView>
        <TreeView.Folder label="Detection package" icon={<Folder />}>
          <TreeView.Item label="manifest.json" icon={<FileText />} selected />
          <TreeView.Item label="sigma-rules.yml" icon={<FileText />} />
          <TreeView.Folder label="enrichment" icon={<Folder />}>
            <TreeView.Item label="virustotal.ts" icon={<Database />} />
            <TreeView.Item label="sandbox.ts" icon={<Database />} />
          </TreeView.Folder>
        </TreeView.Folder>
      </TreeView>
    </div>
  ),
};
