import type { Meta, StoryObj } from "@storybook/react-vite";

import { AiChat, type AiChatAdapter } from "../../src";

const meta = {
  title: "AI/AiChat",
  component: AiChat,
  tags: ["autodocs"],
} satisfies Meta<typeof AiChat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AdapterDriven: Story = {
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