import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { AiChat, AssistantMessage, ChatHistoryList, ChatInput, SuggestedPrompts, type AiChatAdapter, type AiChatMessage, type ChatHistorySession, type SuggestedPrompt, type ToolApproval, UserMessage } from "../../../src";

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
  title: "Patterns/AI/Workflows",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const InvestigationCopilot: Story = {
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

    const adapter: AiChatAdapter = {
      createSession: async () => `session-${Date.now()}`,
      loadMessages: async () => [],
      streamMessage: async (_sessionId, payload, handlers) => {
        handlers.onConnected?.();
        const response = `### Triage summary\nI reviewed **${payload.message}**.\n\n- Investigate the linked process tree\n- Check adjacent alerts on the same host\n- Add a short analyst note for the queue handoff\n\n<suggested_prompts>Draft a triage note|Find related indicators|Show recent alerts for this host</suggested_prompts>`;
        const chunks = response.match(/.{1,32}/g) || [];

        for (const chunk of chunks) {
          await new Promise((resolve) => window.setTimeout(resolve, 60));
          handlers.onMessage?.({ content: chunk, partial: true });
        }

        handlers.onComplete?.({ messageId: `assistant-${Date.now()}`, content: response });
      },
    };

    return (
      <div className="flex h-[820px] w-full overflow-hidden rounded-xl border border-neutral-border bg-default-background shadow-sm">
        <div className="w-[380px] shrink-0 border-r border-neutral-border bg-default-background">
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

        <div className="grid min-w-0 grow grid-cols-[minmax(0,1fr)_320px] bg-page-background mobile:grid-cols-1">
          <div className="min-w-0 border-r border-neutral-border bg-default-background">
            <AiChat adapter={adapter} showHistoryButton title="Investigation copilot" />
          </div>

          <aside className="grid content-start gap-4 p-6">
            <div className="rounded-lg border border-neutral-border bg-default-background p-4">
              <span className="text-body-bold font-body-bold text-default-font">Suggested workflow</span>
              <p className="mt-2 text-body font-body text-subtext-color">Use the history rail to revisit prior sessions while the live copilot stays focused on the current investigation.</p>
            </div>
            <div className="rounded-lg border border-neutral-border bg-default-background p-4">
              <span className="text-body-bold font-body-bold text-default-font">Analyst notes</span>
              <p className="mt-2 text-body font-body text-subtext-color">This side panel can carry queue notes, host context, or policy guidance alongside the assistant.</p>
            </div>
          </aside>
        </div>
      </div>
    );
  },
};

export const ApprovalReviewLoop: Story = {
  render: () => {
    const [clickedPrompt, setClickedPrompt] = useState<string | null>(null);

    const userMessage: AiChatMessage = {
      id: "message-1",
      role: "user",
      content: "Summarize the impact of this alert and suggest next steps.",
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
    };

    const assistantMessage: AiChatMessage = {
      id: "message-2",
      role: "assistant",
      content: "### Review summary\nThis alert looks tied to a suspicious PowerShell execution chain.\n\n- Validate whether the host is expected to run this script\n- Confirm whether outbound traffic matched the C2 indicator\n- Approve the enrichment step if external telemetry is needed",
      timestamp: new Date(Date.now() - 1000 * 60 * 9),
      toolApproval: approval,
    };

    return (
      <div className="grid h-[820px] w-full grid-cols-[minmax(0,1fr)_320px] overflow-hidden rounded-xl border border-neutral-border bg-default-background shadow-sm mobile:grid-cols-1">
        <div className="grid min-w-0 gap-4 border-r border-neutral-border p-6">
          <div className="grid gap-4 rounded-lg border border-neutral-border bg-page-background p-4">
            <UserMessage message={userMessage} />
            <AssistantMessage message={assistantMessage} />
          </div>

          <div className="rounded-lg border border-neutral-border bg-page-background p-4">
            <SuggestedPrompts prompts={prompts} onPromptClick={(prompt) => setClickedPrompt(prompt.label)} />
          </div>

          <div className="rounded-lg border border-neutral-border bg-page-background p-4">
            <ChatInput onSendMessage={() => {}} showHistoryButton onHistoryClick={() => {}} />
          </div>

          <div className="rounded-lg border border-neutral-border bg-page-background p-3 text-caption font-caption text-subtext-color">
            {clickedPrompt ? `Selected next step: ${clickedPrompt}` : "Select a follow-up prompt to simulate the next analyst action."}
          </div>
        </div>
        <aside className="grid content-start gap-4 bg-neutral-50 p-6">
          <div className="rounded-lg border border-neutral-border bg-default-background p-4">
            <span className="text-body-bold font-body-bold text-default-font">Reviewer guidance</span>
            <p className="mt-2 text-body font-body text-subtext-color">This pattern shows how message surfaces, approvals, prompts, and the composer fit into a single analyst loop.</p>
          </div>
          <div className="rounded-lg border border-neutral-border bg-default-background p-4">
            <span className="text-body-bold font-body-bold text-default-font">Outcome</span>
            <p className="mt-2 text-body font-body text-subtext-color">Use the right rail for runbook steps, approval criteria, or linked evidence while the conversation continues on the left.</p>
          </div>
        </aside>
      </div>
    );
  },
};