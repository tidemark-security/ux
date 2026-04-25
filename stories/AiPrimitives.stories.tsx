import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { AiChat, AiLoadingScanline, AssistantMessage, ChatHistoryList, ChatInput, SuggestedPrompts, ToolApprovalCard, useTheme, type AiChatAdapter, type AiChatMessage, type ChatHistorySession, type SuggestedPrompt, type ToolApproval, UserMessage } from "../src";

const prompts: SuggestedPrompt[] = [
  { id: "1", label: "Summarize the latest alert" },
  { id: "2", label: "Find related indicators" },
  { id: "3", label: "Draft a triage note" },
];

const approval: ToolApproval = {
  id: "approval-1",
  toolName: "network_enrichment",
  description: "query external telemetry for this IP address",
  status: "pending",
};

const meta = {
  title: "AI/Primitives",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const PromptChips: Story = {
  render: () => {
    const [clicked, setClicked] = useState<string | null>(null);

    return (
      <div className="flex w-[640px] flex-col gap-4 rounded-md border border-neutral-border bg-default-background p-4">
        <SuggestedPrompts prompts={prompts} onPromptClick={(prompt) => setClicked(prompt.label)} />
        <pre className="rounded-md border border-neutral-border bg-neutral-50 p-3 text-caption font-caption text-default-font">
          {JSON.stringify({ clicked }, null, 2)}
        </pre>
      </div>
    );
  },
};

export const ApprovalCard: Story = {
  render: () => (
    <div className="w-[520px] rounded-md border border-neutral-border bg-default-background p-4">
      <ToolApprovalCard messageId="message-1" approval={approval} />
    </div>
  ),
};

export const InputComposer: Story = {
  render: () => {
    const [messages, setMessages] = useState<string[]>([]);

    return (
      <div className="flex w-[800px] flex-col overflow-hidden border border-neutral-border bg-default-background bevel-tr-3xl">
        <div className="flex w-full flex-col gap-4 px-6 py-6">
          <ChatInput
            showHistoryButton
            onHistoryClick={() => setMessages((current) => [...current, "history-clicked"])}
            onSendMessage={(message) => setMessages((current) => [...current, message])}
          />

          <div className="flex min-h-[52px] w-full items-center justify-between gap-4 border border-neutral-border bg-neutral-50 px-3 py-2 text-caption font-caption text-default-font">
            <span className="truncate">
              Send a message or open history to exercise the composer.
            </span>
            <span className="shrink-0 text-subtext-color">{messages.length} messages</span>
          </div>
        </div>
      </div>
    );
  },
};

export const Messages: Story = {
  render: () => {
    const userMessage: AiChatMessage = {
      id: "message-1",
      role: "user",
      content: "Summarize the impact of this alert and suggest next steps.",
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
    };

    const assistantMessage: AiChatMessage = {
      id: "message-2",
      role: "assistant",
      content: "### Summary\nThis alert looks tied to a suspicious PowerShell execution chain.\n\n- Review the parent process tree\n- Validate whether the host is expected to run this script\n- Consider isolating the endpoint if the activity is confirmed malicious",
      timestamp: new Date(Date.now() - 1000 * 60 * 9),
      toolApproval: approval,
    };

    return (
      <div className="flex w-[760px] flex-col gap-4 rounded-md border border-neutral-border bg-default-background p-4">
        <UserMessage message={userMessage} />
        <AssistantMessage message={assistantMessage} />
      </div>
    );
  },
};

export const LoadingScanline: Story = {
  render: () => {
    const { resolvedTheme } = useTheme();
    const isDarkTheme = resolvedTheme === "dark";

    return (
      <div className="w-[520px] rounded-md border border-neutral-border bg-default-background p-4">
        <div className={`flex w-full min-w-0 flex-col items-start gap-2 rounded-md px-3 py-3 ${isDarkTheme ? "bg-neutral-100" : "bg-neutral-200"}`}>
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center gap-2 text-caption font-caption text-default-font">
              <span>Generating response</span>
            </div>
            <AiLoadingScanline />
          </div>
        </div>
      </div>
    );
  },
};

export const HistoryList: Story = {
  render: () => {
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>("session-1");
    const [sessions, setSessions] = useState<ChatHistorySession[]>([
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
    ]);

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

export const AdapterDrivenChat: Story = {
  render: () => {
    const adapter: AiChatAdapter = {
      createSession: async () => `session-${Date.now()}`,
      loadMessages: async () => [],
      streamMessage: async (_sessionId, payload, handlers) => {
        handlers.onConnected?.();
        const response = `### Summary\nI reviewed your request: **${payload.message}**.\n\n- Investigate the linked process tree\n- Review adjacent alerts for the same host\n- Capture a concise triage note\n\n<suggested_prompts>Draft a triage note|Find related indicators|Show recent alerts for this host</suggested_prompts>`;
        const chunks = response.match(/.{1,32}/g) || [];

        for (const chunk of chunks) {
          await new Promise((resolve) => window.setTimeout(resolve, 60));
          handlers.onMessage?.({ content: chunk, partial: true });
        }

        handlers.onComplete?.({ messageId: `assistant-${Date.now()}`, content: response });
      },
    };

    return (
      <div className="h-[760px] w-[760px] rounded-md border border-neutral-border bg-default-background">
        <AiChat adapter={adapter} showHistoryButton />
      </div>
    );
  },
};