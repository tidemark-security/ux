import type { Meta, StoryObj } from "@storybook/react";
import { ArrowDownUp, CheckCircle2, Database, FileText, Folder, Server, ShieldAlert, UserRound } from "lucide-react";

import { Avatar, Badge, Table, TreeView } from "../src";

const meta = {
  title: "Data Display/Primitives",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Avatars: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="x-small">JD</Avatar>
      <Avatar size="small" variant="success">AN</Avatar>
      <Avatar size="medium" variant="warning">SO</Avatar>
      <Avatar size="large" variant="error">IR</Avatar>
      <Avatar size="x-large" variant="neutral" square>
        TM
      </Avatar>
      <Avatar size="large" image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces" imageAlt="Analyst avatar" />
    </div>
  ),
};

export const Badges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge icon={<ShieldAlert />}>Brand</Badge>
      <Badge variant="neutral" icon={<UserRound />}>Assigned</Badge>
      <Badge variant="success" icon={<CheckCircle2 />}>Resolved</Badge>
      <Badge variant="warning">Needs review</Badge>
      <Badge variant="error">Blocked</Badge>
      <Badge compact icon={<Server />} role="img" aria-label="Server" />
    </div>
  ),
};

export const TableStory: Story = {
  name: "Table",
  render: () => (
    <div className="w-[680px] rounded-md border border-neutral-border bg-default-background p-4">
      <Table
        header={
          <Table.HeaderRow>
            <Table.HeaderCell icon={<ArrowDownUp />}>Name</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Owner</Table.HeaderCell>
          </Table.HeaderRow>
        }
      >
        <Table.Row clickable>
          <Table.Cell>Endpoint isolation</Table.Cell>
          <Table.Cell><Badge variant="warning">Pending</Badge></Table.Cell>
          <Table.Cell>Security Ops</Table.Cell>
        </Table.Row>
        <Table.Row clickable>
          <Table.Cell>Credential rotation</Table.Cell>
          <Table.Cell><Badge variant="success">Complete</Badge></Table.Cell>
          <Table.Cell>Identity</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>SIEM export</Table.Cell>
          <Table.Cell><Badge variant="neutral">Draft</Badge></Table.Cell>
          <Table.Cell>Platform</Table.Cell>
        </Table.Row>
      </Table>
    </div>
  ),
};

export const Tree: Story = {
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
