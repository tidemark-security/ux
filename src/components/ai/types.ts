export type AiChatMessageRole = "user" | "assistant";

export interface ToolApproval {
  id: string;
  toolName: string;
  description: string;
  status: "pending" | "approved" | "denied";
}

export interface AiChatMessage {
  id: string;
  role: AiChatMessageRole;
  content: string;
  timestamp: Date;
  toolApproval?: ToolApproval;
  feedback?: "positive" | "negative";
  isStreaming?: boolean;
}

export interface SuggestedPrompt {
  id: string;
  label: string;
}

export interface SuggestedPromptsProps {
  prompts: SuggestedPrompt[];
  onPromptClick?: (prompt: SuggestedPrompt) => void;
}

export interface ToolApprovalCardProps {
  messageId: string;
  approval: ToolApproval;
  onApprove?: (messageId: string, approvalId: string) => void;
  onDeny?: (messageId: string, approvalId: string) => void;
}

export interface ChatInputProps {
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onSendMessage: (message: string) => void;
  showHistoryButton?: boolean;
  onHistoryClick?: () => void;
}

export interface UserMessageProps {
  message: AiChatMessage;
}

export interface AssistantMessageProps {
  message: AiChatMessage;
  onToolApprove?: (messageId: string, approvalId: string) => void;
  onToolDeny?: (messageId: string, approvalId: string) => void;
  onFeedbackPositive?: (messageId: string) => void;
  onFeedbackNegative?: (messageId: string) => void;
  onCopyMessage?: (messageId: string, content: string) => void;
}

export interface ChatHistorySession {
  id: string;
  title?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  messageCount?: number;
  context?: {
    title?: string | null;
  };
}

export interface ChatHistoryListProps {
  selectedSessionId: string | null;
  onSelectSession: (sessionId: string | null) => void;
  onNewChat: () => void;
  onClose?: () => void;
  onSessionsLoaded?: (sessions: ChatHistorySession[]) => void;
  refreshKey?: number;
  className?: string;
  title?: string;
  newChatLabel?: string;
  clearLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  loadSessions: () => Promise<ChatHistorySession[]>;
  renameSession: (sessionId: string, title: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  clearSessions?: () => Promise<void>;
}

export interface ChatStreamMessageEvent {
  content: string;
  partial?: boolean;
  timestamp?: string;
}

export interface ChatStreamCompleteEvent {
  messageId?: string;
  content?: string;
  partial?: boolean;
}

export interface AiChatStreamHandlers {
  onConnected?: () => void;
  onMessage?: (data: ChatStreamMessageEvent) => void;
  onComplete?: (data: ChatStreamCompleteEvent) => void;
}

export interface AiChatAdapter {
  createSession?: (title?: string) => Promise<string>;
  loadMessages?: (sessionId: string) => Promise<AiChatMessage[]>;
  streamMessage: (
    sessionId: string,
    payload: { message: string },
    handlers: AiChatStreamHandlers,
  ) => Promise<void>;
}

export interface AiChatProps {
  title?: string;
  messages?: AiChatMessage[];
  isLoading?: boolean;
  error?: string | null;
  suggestedPrompts?: SuggestedPrompt[];
  inputPlaceholder?: string;
  onSendMessage?: (message: string) => void;
  onSuggestedPromptClick?: (prompt: SuggestedPrompt) => void;
  onClose?: () => void;
  onToolApprove?: (messageId: string, approvalId: string) => void;
  onToolDeny?: (messageId: string, approvalId: string) => void;
  onFeedbackPositive?: (messageId: string) => void;
  onFeedbackNegative?: (messageId: string) => void;
  onCopyMessage?: (messageId: string, content: string) => void;
  initialSessionId?: string;
  onSessionChange?: (sessionId: string | null) => void;
  isLazy?: boolean;
  showHistoryButton?: boolean;
  onHistoryClick?: () => void;
  className?: string;
  persistSessionKey?: string;
  adapter?: AiChatAdapter;
}