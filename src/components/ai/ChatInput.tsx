"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { History, Send, Sparkles } from "lucide-react";

import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../utils/cn";
import { IconButton } from "../actions/IconButton";
import type { ChatInputProps } from "./types";

export function ChatInput({
  placeholder = "Ask me anything...",
  isLoading = false,
  disabled = false,
  onSendMessage,
  showHistoryButton = false,
  onHistoryClick,
}: ChatInputProps) {
  const composerMinHeight = 40;
  const textareaMinHeight = 24;
  const textareaMaxHeight = 120;
  const composerVerticalPadding = 16;
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [composerHeight, setComposerHeight] = useState(composerMinHeight);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = `${textareaMinHeight}px`;

    const nextTextareaHeight = Math.max(
      Math.min(textarea.scrollHeight, textareaMaxHeight),
      textareaMinHeight,
    );

    textarea.style.height = `${nextTextareaHeight}px`;
    setComposerHeight(Math.max(nextTextareaHeight + composerVerticalPadding, composerMinHeight));
  }, [inputValue]);

  const handleSend = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue || isLoading || disabled) {
      return;
    }

    onSendMessage(trimmedValue);
    setInputValue("");
    requestAnimationFrame(() => textareaRef.current?.focus());
  }, [disabled, inputValue, isLoading, onSendMessage]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <div className="relative flex w-full items-end gap-2">
      <div className="relative grow" style={{ height: `${composerHeight}px` }}>
        <div aria-hidden="true" style={{ height: `${composerHeight}px` }} />
        <div className="absolute bottom-0 left-0 right-0 flex min-h-10 items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background px-3 py-2 focus-within:border-focus-border focus-within:ring-1 focus-within:ring-focus-border">
          <div className="flex min-h-6 shrink-0 items-center">
            <Sparkles className={cn("text-body font-body", isDarkTheme ? "text-brand-primary" : "text-default-font")} />
          </div>
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="min-h-6 w-full resize-none overflow-y-auto border-none bg-transparent py-0 text-body font-body leading-6 text-default-font outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:text-neutral-400"
          />
        </div>
      </div>
      <div className="flex h-10 shrink-0 items-center gap-1">
        <IconButton
          variant="brand-primary"
          size="large"
          icon={<Send />}
          onClick={handleSend}
          disabled={isLoading || disabled || !inputValue.trim()}
          aria-label="Send message"
        />
        {showHistoryButton && onHistoryClick ? (
          <IconButton
            size="large"
            variant="brand-tertiary"
            icon={<History />}
            onClick={onHistoryClick}
            disabled={isLoading || disabled}
            aria-label="Show chat history"
          />
        ) : null}
      </div>
    </div>
  );
}

export default ChatInput;