"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, RefreshCw, Sparkles, X } from "lucide-react";

import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../utils/cn";
import { IconButton } from "../actions/IconButton";
import { AssistantMessage } from "./AssistantMessage";
import { ChatInput } from "./ChatInput";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { UserMessage } from "./UserMessage";
import type { AiChatMessage, AiChatProps, SuggestedPrompt } from "./types";

const DEFAULT_PROMPTS: SuggestedPrompt[] = [
  { id: "1", label: "Summarize the latest alert" },
  { id: "2", label: "Find related indicators" },
  { id: "3", label: "Suggest next steps" },
  { id: "4", label: "Draft an analyst note" },
];

function parseSuggestedPrompts(content: string): { cleanContent: string; prompts: SuggestedPrompt[] | null } {
  const regex = /<suggested_prompts>(.*?)<\/suggested_prompts>/s;
  const match = content.match(regex);

  if (!match) {
    return { cleanContent: content, prompts: null };
  }

  const prompts = match[1]
    .split("|")
    .map((label, index) => ({ id: `dynamic-${index}`, label: label.trim() }))
    .filter((prompt) => prompt.label.length > 0);

  return {
    cleanContent: content.replace(regex, "").trim(),
    prompts: prompts.length > 0 ? prompts : null,
  };
}

export function AiChat({
  title = "AI Assistant",
  messages: externalMessages,
  isLoading: externalIsLoading,
  error: externalError,
  suggestedPrompts,
  inputPlaceholder = "Ask me anything...",
  onSendMessage: externalOnSendMessage,
  onSuggestedPromptClick,
  onClose,
  onToolApprove,
  onToolDeny,
  onFeedbackPositive,
  onFeedbackNegative,
  onCopyMessage,
  initialSessionId,
  onSessionChange,
  isLazy = true,
  showHistoryButton = false,
  onHistoryClick,
  className = "",
  persistSessionKey,
  adapter,
}: AiChatProps) {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingBufferRef = useRef<Record<string, string>>({});
  const streamingFlushTimerRef = useRef<number | null>(null);
  const creatingSessionRef = useRef(false);
  const pendingMessageRef = useRef<string | null>(null);

  const isControlled = externalMessages !== undefined && externalOnSendMessage !== undefined;

  const [sessionId, setSessionId] = useState<string | null>(() => {
    if (initialSessionId) {
      return initialSessionId;
    }

    if (persistSessionKey && typeof window !== "undefined") {
      return window.localStorage.getItem(persistSessionKey);
    }

    return null;
  });
  const [internalMessages, setInternalMessages] = useState<AiChatMessage[]>([]);
  const [internalIsLoading, setInternalIsLoading] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(!isControlled);
  const [dynamicPrompts, setDynamicPrompts] = useState<SuggestedPrompt[] | null>(null);
  const hasInitializedRef = useRef(false);

  const flushStreamingBuffer = useCallback((assistantMessageId: string) => {
    const buffered = streamingBufferRef.current[assistantMessageId];
    if (!buffered) {
      return;
    }

    setInternalMessages((previous) =>
      previous.map((message) =>
        message.id === assistantMessageId ? { ...message, content: message.content + buffered } : message,
      ),
    );

    streamingBufferRef.current[assistantMessageId] = "";
  }, []);

  const stopStreamingFlushTimer = useCallback(() => {
    if (streamingFlushTimerRef.current !== null) {
      window.clearInterval(streamingFlushTimerRef.current);
      streamingFlushTimerRef.current = null;
    }
  }, []);

  const createSession = useCallback(async (seedMessage?: string): Promise<string | null> => {
    if (!adapter?.createSession || creatingSessionRef.current) {
      return sessionId;
    }

    creatingSessionRef.current = true;
    setIsInitializing(true);
    setInternalError(null);

    try {
      const titleSeed = seedMessage?.trim();
      const title = titleSeed ? titleSeed.slice(0, 100) : undefined;
      const nextSessionId = await adapter.createSession(title);
      setSessionId(nextSessionId);
      onSessionChange?.(nextSessionId);

      if (persistSessionKey && typeof window !== "undefined") {
        window.localStorage.setItem(persistSessionKey, nextSessionId);
      }

      return nextSessionId;
    } catch (error) {
      setInternalError(error instanceof Error ? error.message : "Failed to create session");
      return null;
    } finally {
      setIsInitializing(false);
      creatingSessionRef.current = false;
    }
  }, [adapter, onSessionChange, persistSessionKey, sessionId]);

  const loadSessionMessages = useCallback(async (existingSessionId: string) => {
    if (!adapter?.loadMessages) {
      return false;
    }

    try {
      const existingMessages = await adapter.loadMessages(existingSessionId);
      setInternalMessages(existingMessages);
      return true;
    } catch (error) {
      console.warn("Failed to load existing session messages:", error);
      return false;
    }
  }, [adapter]);

  const initializeSession = useCallback(async () => {
    if (isControlled || hasInitializedRef.current) {
      return;
    }

    hasInitializedRef.current = true;
    setIsInitializing(true);
    setInternalError(null);

    if (sessionId && adapter?.loadMessages) {
      const loaded = await loadSessionMessages(sessionId);
      if (loaded) {
        setIsInitializing(false);
        return;
      }

      if (persistSessionKey && typeof window !== "undefined") {
        window.localStorage.removeItem(persistSessionKey);
      }
      setSessionId(null);
    }

    if (isLazy || !adapter?.createSession) {
      setIsInitializing(false);
      return;
    }

    await createSession();
  }, [adapter, createSession, isControlled, isLazy, loadSessionMessages, persistSessionKey, sessionId]);

  useEffect(() => {
    void initializeSession();
  }, [initializeSession]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [externalMessages, internalMessages, externalIsLoading, internalIsLoading]);

  useEffect(() => {
    return () => {
      stopStreamingFlushTimer();
    };
  }, [stopStreamingFlushTimer]);

  const sendMessageInternal = useCallback(async (content: string) => {
    if (!adapter) {
      return;
    }

    let activeSessionId = sessionId;

    if (!activeSessionId) {
      if (creatingSessionRef.current) {
        pendingMessageRef.current = content;
        return;
      }

      activeSessionId = await createSession(content);
      if (!activeSessionId) {
        return;
      }
    }

    setInternalIsLoading(true);
    setInternalError(null);
    setDynamicPrompts(null);

    const userMessage: AiChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    };
    setInternalMessages((previous) => [...previous, userMessage]);

    const assistantMessageId = `assistant-${Date.now()}`;
    const assistantMessage: AiChatMessage = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    };
    setInternalMessages((previous) => [...previous, assistantMessage]);

    try {
      await adapter.streamMessage(activeSessionId, { message: content }, {
        onMessage: (data) => {
          streamingBufferRef.current[assistantMessageId] =
            (streamingBufferRef.current[assistantMessageId] || "") + data.content;

          if (streamingFlushTimerRef.current === null) {
            streamingFlushTimerRef.current = window.setInterval(() => {
              flushStreamingBuffer(assistantMessageId);
            }, 60);
          }
        },
        onComplete: (data) => {
          flushStreamingBuffer(assistantMessageId);
          stopStreamingFlushTimer();
          delete streamingBufferRef.current[assistantMessageId];

          const finalContent = data.content || "";
          const { cleanContent, prompts } = parseSuggestedPrompts(finalContent);

          if (prompts) {
            setDynamicPrompts(prompts);
          }

          setInternalMessages((previous) =>
            previous.map((message) =>
              message.id === assistantMessageId
                ? {
                    ...message,
                    id: data.messageId || message.id,
                    content: cleanContent,
                    isStreaming: false,
                  }
                : message,
            ),
          );
          setInternalIsLoading(false);
        },
      });
    } catch (error) {
      setInternalError(error instanceof Error ? error.message : "Failed to send message");
      stopStreamingFlushTimer();
      delete streamingBufferRef.current[assistantMessageId];
      setInternalMessages((previous) => previous.filter((message) => message.id !== assistantMessageId));
      setInternalIsLoading(false);
    }
  }, [adapter, createSession, flushStreamingBuffer, sessionId, stopStreamingFlushTimer]);

  useEffect(() => {
    if (pendingMessageRef.current && sessionId && !creatingSessionRef.current) {
      const message = pendingMessageRef.current;
      pendingMessageRef.current = null;
      void sendMessageInternal(message);
    }
  }, [sendMessageInternal, sessionId]);

  const handleSendMessage = useCallback((message: string) => {
    if (isControlled) {
      externalOnSendMessage?.(message);
      return;
    }

    void sendMessageInternal(message);
  }, [externalOnSendMessage, isControlled, sendMessageInternal]);

  const handleSuggestedPromptClick = useCallback((prompt: SuggestedPrompt) => {
    onSuggestedPromptClick?.(prompt);
    if (!onSuggestedPromptClick) {
      handleSendMessage(prompt.label);
    }
  }, [handleSendMessage, onSuggestedPromptClick]);

  const messages = isControlled ? externalMessages || [] : internalMessages;
  const isLoading = isControlled ? externalIsLoading ?? false : internalIsLoading;
  const error = isControlled ? externalError : internalError;
  const effectivePrompts = messages.length === 0 ? suggestedPrompts ?? DEFAULT_PROMPTS : dynamicPrompts ?? [];

  const headerIcon = useMemo(
    () => <Sparkles className={cn("text-heading-3 font-heading-3", isDarkTheme ? "text-brand-primary" : "text-default-font")} />,
    [isDarkTheme],
  );

  return (
    <div className={cn("flex h-full w-full flex-col overflow-hidden bg-default-background", className)}>
      <div className={cn("flex items-center justify-between border-b border-solid px-4 py-3", isDarkTheme ? "border-brand-primary" : "border-neutral-border")}>
        <div className="flex items-center gap-2">
          {headerIcon}
          <span className="text-heading-3 font-heading-3 text-default-font">{title}</span>
        </div>
        {onClose ? <IconButton icon={<X />} onClick={onClose} aria-label="Close AI chat" /> : null}
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
        {isInitializing ? (
          <div className="flex flex-1 items-center justify-center text-body font-body text-subtext-color">Preparing chat…</div>
        ) : null}

        {!isInitializing ? (
          <div className="flex w-full flex-col gap-4">
            {messages.map((message) =>
              message.role === "user" ? (
                <UserMessage key={message.id} message={message} />
              ) : (
                <AssistantMessage
                  key={message.id}
                  message={message}
                  onToolApprove={onToolApprove}
                  onToolDeny={onToolDeny}
                  onFeedbackPositive={onFeedbackPositive}
                  onFeedbackNegative={onFeedbackNegative}
                  onCopyMessage={onCopyMessage}
                />
              ),
            )}
          </div>
        ) : null}

        {error ? (
          <div className="flex items-start gap-3 rounded-md border border-error-600/40 bg-error-50 px-3 py-3">
            <AlertCircle className="mt-0.5 h-4 w-4 text-error-600" />
            <div className="flex grow flex-col gap-2">
              <span className="text-body font-body text-error-700">{error}</span>
              {!isControlled && adapter ? (
                <div>
                  <IconButton
                    size="small"
                    variant="destructive-tertiary"
                    icon={<RefreshCw />}
                    onClick={() => setInternalError(null)}
                    aria-label="Dismiss error"
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-solid border-neutral-border px-4 py-4">
        {!isInitializing && effectivePrompts.length > 0 ? (
          <div className="mb-4">
            <SuggestedPrompts prompts={effectivePrompts} onPromptClick={handleSuggestedPromptClick} />
          </div>
        ) : null}

        <ChatInput
          placeholder={inputPlaceholder}
          isLoading={isLoading}
          disabled={isInitializing}
          onSendMessage={handleSendMessage}
          showHistoryButton={showHistoryButton}
          onHistoryClick={onHistoryClick}
        />
      </div>
    </div>
  );
}

export default AiChat;