import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowDownUp } from "lucide-react";

import { Badge, Table } from "../../src";

const meta = {
  title: "Data Display/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
