import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChatHistoryList, type ChatHistorySession } from "../../src";

const sampleSessions: ChatHistorySession[] = [
  {
    id: "session-1",
    title: "ALT-2031: suspicious PowerShell chain",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 10),
    messageCount: 8,
  },
  {
    id: "session-2",
    title: "Find related indicators for C2 domain",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 26),
    messageCount: 3,
  },
];

const meta = {
  title: "AI/ChatHistoryList",
  component: ChatHistoryList,
  tags: ["autodocs"],
} satisfies Meta<typeof ChatHistoryList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>("session-1");
    const [sessions, setSessions] = useState<ChatHistorySession[]>(sampleSessions);

    return (
      <div className="h-[720px] w-[420px] rounded-md border border-neutral-border bg-default-background">
        <ChatHistoryList
          selectedSessionId={selectedSessionId}
          onSelectSession={setSelectedSessionId}
          onNewChat={() => setSelectedSessionId(null)}
          loadSessions={async () => sessions}
          renameSession={async (sessionId, title) => {
            setSessions((current) => current.map((session) => (session.id === sessionId ? { ...session, title } : session)));
          }}
          deleteSession={async (sessionId) => {
            setSessions((current) => current.filter((session) => session.id !== sessionId));
          }}
          clearSessions={async () => {
            setSessions([]);
          }}
        />
      </div>
    );
  },
};

export const Empty: Story = {
  render: () => {
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

    return (
      <div className="h-[720px] w-[420px] rounded-md border border-neutral-border bg-default-background">
        <ChatHistoryList
          selectedSessionId={selectedSessionId}
          onSelectSession={setSelectedSessionId}
          onNewChat={() => setSelectedSessionId(null)}
          loadSessions={async () => []}
          renameSession={async () => {}}
          deleteSession={async () => {}}
          clearSessions={async () => {}}
        />
      </div>
    );
  },
};