"use client";

import React from "react";
import { Check, Copy, ThumbsDown, ThumbsUp } from "lucide-react";

import { useTheme } from "../../contexts/ThemeContext";
import { IconButton } from "../actions/IconButton";
import { MarkdownContent } from "../data-display/MarkdownContent";
import { RelativeTime } from "../data-display/RelativeTime";
import { Tooltip } from "../overlays/Tooltip";
import { AiLoadingScanline } from "./AiLoadingScanline";
import { ToolApprovalCard } from "./ToolApprovalCard";
import type { AssistantMessageProps } from "./types";

function AssistantMessageComponent({
  message,
  onToolApprove,
  onToolDeny,
  onFeedbackPositive,
  onFeedbackNegative,
  onCopyMessage,
}: AssistantMessageProps) {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";
  const [copied, setCopied] = React.useState(false);
  const timestampIso = message.timestamp.toISOString();

  const handleCopy = async () => {
    if (onCopyMessage) {
      onCopyMessage(message.id, message.content);
    } else {
      await navigator.clipboard.writeText(message.content);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex w-full items-start gap-3 pr-8">
      <div className="flex min-w-0 grow shrink-0 basis-0 flex-col items-start gap-2">
        <div className={`flex w-full min-w-0 flex-col items-start gap-2 rounded-md px-3 py-3 ${isDarkTheme ? "bg-neutral-100" : "bg-neutral-200"}`}>
          <div className="w-full min-w-0 text-body font-body text-default-font [overflow-wrap:anywhere]">
            <MarkdownContent content={message.content} isStreamingFromAi={message.isStreaming === true} />
            {message.isStreaming ? (
              <div className="mt-2 flex w-full flex-col gap-1">
                <div className="flex items-center gap-2 text-caption font-caption text-subtext-color">
                  <span>Generating response</span>
                </div>
                <AiLoadingScanline />
              </div>
            ) : null}
          </div>
        </div>

        {message.toolApproval && message.toolApproval.status === "pending" ? (
          <ToolApprovalCard messageId={message.id} approval={message.toolApproval} onApprove={onToolApprove} onDeny={onToolDeny} />
        ) : null}

        <div className="flex w-full items-center">
          <div className="flex items-center gap-1">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <IconButton
                    size="small"
                    icon={message.feedback === "positive" ? <Check /> : <ThumbsUp />}
                    onClick={() => onFeedbackPositive?.(message.id)}
                    disabled={message.feedback === "positive"}
                    aria-label={message.feedback === "positive" ? "Positive feedback sent" : "Mark response as helpful"}
                  />
                </Tooltip.Trigger>
                <Tooltip.Content side="bottom" align="center" sideOffset={4}>
                  {message.feedback === "positive" ? "Feedback sent!" : "Good response"}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>

            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <IconButton
                    size="small"
                    icon={message.feedback === "negative" ? <Check /> : <ThumbsDown />}
                    onClick={() => onFeedbackNegative?.(message.id)}
                    disabled={message.feedback === "negative"}
                    aria-label={message.feedback === "negative" ? "Negative feedback sent" : "Mark response as unhelpful"}
                  />
                </Tooltip.Trigger>
                <Tooltip.Content side="bottom" align="center" sideOffset={4}>
                  {message.feedback === "negative" ? "Feedback sent!" : "Bad response"}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>

            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <IconButton
                    size="small"
                    icon={copied ? <Check /> : <Copy />}
                    onClick={handleCopy}
                    aria-label={copied ? "Response copied" : "Copy response"}
                  />
                </Tooltip.Trigger>
                <Tooltip.Content side="bottom" align="center" sideOffset={4}>
                  {copied ? "Copied!" : "Copy"}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-24 shrink-0 text-right text-caption font-caption text-subtext-color">
              <RelativeTime value={timestampIso} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const areAssistantMessagePropsEqual = (prevProps: AssistantMessageProps, nextProps: AssistantMessageProps): boolean => {
  return (
    prevProps.message === nextProps.message &&
    prevProps.onToolApprove === nextProps.onToolApprove &&
    prevProps.onToolDeny === nextProps.onToolDeny &&
    prevProps.onFeedbackPositive === nextProps.onFeedbackPositive &&
    prevProps.onFeedbackNegative === nextProps.onFeedbackNegative &&
    prevProps.onCopyMessage === nextProps.onCopyMessage
  );
};

export const AssistantMessage = React.memo(AssistantMessageComponent, areAssistantMessagePropsEqual);

export default AssistantMessage;