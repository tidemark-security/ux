"use client";

import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { AlertCircle, Edit2, History, Loader, MessageSquare, Plus, Trash2, X } from "lucide-react";

import { Button } from "../buttons/Button";
import { IconButton } from "../buttons/IconButton";
import { MenuCardBase, getMenuCardMetaClassName, getMenuCardTitleClassName } from "../cards/MenuCardBase";
import { RelativeTime } from "../data-display/RelativeTime";
import { IconWithBackground } from "../misc/IconWithBackground";
import { Dialog } from "../overlays/Dialog";
import { DropdownMenu } from "../overlays/DropdownMenu";
import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../utils/cn";
import { TIME_GROUP_LABELS, getTimeGroup, type TimeGroup } from "../../utils/dateFormatters";
import type { ChatHistoryListProps, ChatHistorySession } from "./types";

type SessionInteractionState =
  | { mode: "idle" }
  | { mode: "editing"; sessionId: string; title: string }
  | { mode: "deleting"; sessionId: string };

type SessionInteractionAction =
  | { type: "start-edit"; sessionId: string; title: string }
  | { type: "update-title"; title: string }
  | { type: "start-delete"; sessionId: string }
  | { type: "reset" };

function sessionInteractionReducer(
  state: SessionInteractionState,
  action: SessionInteractionAction,
): SessionInteractionState {
  switch (action.type) {
    case "start-edit":
      return { mode: "editing", sessionId: action.sessionId, title: action.title };
    case "update-title":
      if (state.mode !== "editing") return state;
      return { ...state, title: action.title };
    case "start-delete":
      return { mode: "deleting", sessionId: action.sessionId };
    case "reset":
      return { mode: "idle" };
    default:
      return state;
  }
}

function groupSessionsByTime(sessions: ChatHistorySession[]): Map<string, ChatHistorySession[]> {
  const groups = new Map<string, ChatHistorySession[]>();
  const groupOrder: TimeGroup[] = ["today", "yesterday", "week", "older"];

  groupOrder.forEach((key) => groups.set(TIME_GROUP_LABELS[key], []));

  sessions.forEach((session) => {
    const group = getTimeGroup(session.updatedAt);
    const label = TIME_GROUP_LABELS[group];
    groups.get(label)?.push(session);
  });

  groups.forEach((items, key) => {
    if (items.length === 0) {
      groups.delete(key);
    }
  });

  return groups;
}

function getSessionTitle(session: ChatHistorySession): string {
  if (session.title) {
    return session.title;
  }

  if (session.context?.title) {
    return session.context.title;
  }

  const date = typeof session.createdAt === "string" ? new Date(session.createdAt) : session.createdAt;
  return `Chat ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

interface ClearAllDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  sessionCount: number;
  loading: boolean;
}

function ClearAllDialog({ open, onClose, onConfirm, sessionCount, loading }: ClearAllDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <Dialog.Content className="max-w-sm p-6">
        <div className="flex flex-col gap-4">
          <IconWithBackground icon={<Trash2 />} variant="error" size="medium" />
          <div className="flex flex-col gap-1">
            <span className="text-heading-3 font-heading-3 text-default-font">Clear All Chats</span>
            <span className="text-body font-body text-subtext-color">
              Are you sure you want to delete all {sessionCount} chat{sessionCount !== 1 ? "s" : ""}? This action cannot be undone.
            </span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button variant="neutral-secondary" size="small" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="destructive-primary"
              size="small"
              icon={loading ? <Loader className="animate-spin" /> : <Trash2 />}
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? "Clearing..." : "Clear All"}
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

interface SessionItemProps {
  session: ChatHistorySession;
  isSelected: boolean;
  isDarkTheme: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  editTitle: string;
  editInputRef: React.RefObject<HTMLInputElement>;
  onEditTitleChange: (title: string) => void;
  onStartEdit: (event: React.MouseEvent) => void;
  onSaveEdit: (event: React.MouseEvent) => void;
  onCancelEdit: () => void;
  onEditKeyDown: (event: React.KeyboardEvent) => void;
  onStartDelete: (event: React.MouseEvent) => void;
  onConfirmDelete: (event: React.MouseEvent) => void;
  onCancelDelete: () => void;
  onClick: () => void;
}

function SessionItem({
  session,
  isSelected,
  isDarkTheme,
  isEditing,
  isDeleting,
  editTitle,
  editInputRef,
  onEditTitleChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditKeyDown,
  onStartDelete,
  onConfirmDelete,
  onCancelDelete,
  onClick,
}: SessionItemProps) {
  const variant = isSelected ? "selected" : "default";

  return (
    <MenuCardBase
      isDarkTheme={isDarkTheme}
      variant={variant}
      className="flex-row flex-nowrap items-center justify-between gap-3"
      onClick={onClick}
    >
      <div className="flex min-w-0 grow shrink basis-0 flex-col items-start justify-center gap-1">
        <span className={getMenuCardTitleClassName(isDarkTheme, variant, "w-full min-w-0 basis-auto shrink truncate")}>{getSessionTitle(session)}</span>
        <span className={getMenuCardMetaClassName(isDarkTheme, variant)}>
          {session.messageCount !== undefined && session.messageCount > 0 ? (
            <>
              {session.messageCount} message{session.messageCount !== 1 ? "s" : ""} • <RelativeTime value={session.updatedAt} />
            </>
          ) : (
            <RelativeTime value={session.updatedAt} />
          )}
        </span>
      </div>

      <div className={cn("flex shrink-0 self-center flex-row items-center gap-1 transition-opacity", isSelected || isEditing || isDeleting ? "opacity-100" : "opacity-0 group-hover/6c3f1f95:opacity-100")}>
        <DropdownMenu.Root
          open={isEditing}
          onOpenChange={(open) => {
            if (!open) {
              onCancelEdit();
            }
          }}
        >
          <DropdownMenu.Trigger asChild>
            <div onClick={(event) => event.stopPropagation()}>
              <IconButton variant="neutral-tertiary" size="small" icon={<Edit2 />} onClick={onStartEdit} />
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content side="bottom" align="end" sideOffset={6} onClick={(event) => event.stopPropagation()}>
            <div className="flex min-w-[240px] flex-col gap-2 px-2 py-2">
              <span className="text-caption-bold font-caption-bold text-default-font">Rename chat</span>
              <input
                ref={editInputRef}
                type="text"
                value={editTitle}
                onChange={(event) => onEditTitleChange(event.target.value)}
                onKeyDown={onEditKeyDown}
                onClick={(event) => event.stopPropagation()}
                className="w-full min-w-0 rounded border border-solid border-neutral-border bg-default-background px-2 py-1 text-body font-body text-default-font focus:border-focus-border focus:outline-none"
              />
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="neutral-secondary"
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    onCancelEdit();
                  }}
                >
                  Cancel
                </Button>
                <Button variant="brand-primary" size="small" onClick={onSaveEdit}>
                  Save
                </Button>
              </div>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <DropdownMenu.Root
          open={isDeleting}
          onOpenChange={(open) => {
            if (!open) {
              onCancelDelete();
            }
          }}
        >
          <DropdownMenu.Trigger asChild>
            <div onClick={(event) => event.stopPropagation()}>
              <IconButton variant="neutral-tertiary" size="small" icon={<Trash2 />} onClick={onStartDelete} />
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content side="bottom" align="end" sideOffset={6} onClick={(event) => event.stopPropagation()}>
            <div className="flex min-w-[220px] flex-col gap-2 px-2 py-2">
              <span className="text-caption-bold font-caption-bold text-default-font">Delete this chat?</span>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="neutral-secondary"
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    onCancelDelete();
                  }}
                >
                  Cancel
                </Button>
                <Button variant="destructive-secondary" size="small" onClick={onConfirmDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </MenuCardBase>
  );
}

export function ChatHistoryList({
  selectedSessionId,
  onSelectSession,
  onNewChat,
  onClose,
  onSessionsLoaded,
  refreshKey,
  className = "",
  title = "Chat History",
  newChatLabel = "New Chat",
  clearLabel = "Clear History",
  emptyTitle = "No chat history yet",
  emptyDescription = "Start a new conversation to begin",
  loadSessions,
  renameSession,
  deleteSession,
  clearSessions,
}: ChatHistoryListProps) {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  const [sessions, setSessions] = useState<ChatHistorySession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [interaction, dispatch] = useReducer(sessionInteractionReducer, { mode: "idle" });
  const editInputRef = useRef<HTMLInputElement>(null);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [clearAllLoading, setClearAllLoading] = useState(false);

  const editingSessionId = interaction.mode === "editing" ? interaction.sessionId : null;
  const editTitle = interaction.mode === "editing" ? interaction.title : "";
  const deletingSessionId = interaction.mode === "deleting" ? interaction.sessionId : null;

  const loadSessionItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await loadSessions();
      setSessions(data);
      onSessionsLoaded?.(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load chat history");
    } finally {
      setIsLoading(false);
    }
  }, [loadSessions, onSessionsLoaded]);

  useEffect(() => {
    loadSessionItems();
  }, [loadSessionItems, refreshKey]);

  useEffect(() => {
    if (editingSessionId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingSessionId]);

  const handleSaveEdit = async (sessionId: string, event: React.MouseEvent) => {
    event.stopPropagation();

    if (!editTitle.trim()) {
      dispatch({ type: "reset" });
      return;
    }

    try {
      await renameSession(sessionId, editTitle.trim());
      setSessions((previous) => previous.map((session) => (session.id === sessionId ? { ...session, title: editTitle.trim() } : session)));
    } catch (err) {
      console.error("Failed to update session title:", err);
    } finally {
      dispatch({ type: "reset" });
    }
  };

  const handleConfirmDelete = async (sessionId: string, event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      await deleteSession(sessionId);
      setSessions((previous) => previous.filter((session) => session.id !== sessionId));
      if (selectedSessionId === sessionId) {
        onSelectSession(null);
      }
    } catch (err) {
      console.error("Failed to delete session:", err);
    } finally {
      dispatch({ type: "reset" });
    }
  };

  const handleSessionClick = (sessionId: string) => {
    if (interaction.mode !== "idle") return;
    onSelectSession(sessionId);
  };

  const handleConfirmClearAll = async () => {
    setClearAllLoading(true);
    try {
      if (clearSessions) {
        await clearSessions();
      } else {
        await Promise.all(sessions.map((session) => deleteSession(session.id)));
      }
      setSessions([]);
      onSelectSession(null);
    } catch (err) {
      console.error("Failed to clear all chats:", err);
    } finally {
      setClearAllLoading(false);
      setShowClearAllModal(false);
    }
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center gap-2 py-12">
      <MessageSquare className="h-8 w-8 text-subtext-color" />
      <span className="text-center text-body font-body text-subtext-color">{emptyTitle}</span>
      <span className="text-center text-body font-body text-subtext-color">{emptyDescription}</span>
    </div>
  );

  const renderLoadingState = () => (
    <div className="flex items-center justify-center py-12">
      <Loader className="h-6 w-6 animate-spin text-subtext-color" />
    </div>
  );

  const renderErrorState = () => (
    <div className="flex flex-col items-center justify-center gap-2 py-12">
      <AlertCircle className="h-8 w-8 text-error-600" />
      <span className="text-center text-body font-body text-error-600">{error}</span>
      <Button variant="neutral-secondary" size="small" onClick={loadSessionItems}>
        Retry
      </Button>
    </div>
  );

  const renderSessionList = () => (
    <div className="flex w-full flex-col items-start gap-4">
      {Array.from(groupSessionsByTime(sessions)).map(([groupLabel, groupSessions], groupIndex) => (
        <React.Fragment key={groupLabel}>
          {groupIndex > 0 ? <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" /> : null}
          <div className="flex w-full flex-col items-start gap-2">
            <span className="text-caption-bold font-caption-bold text-subtext-color">{groupLabel}</span>
            {groupSessions.map((session) => (
              <SessionItem
                key={session.id}
                session={session}
                isSelected={session.id === selectedSessionId}
                isDarkTheme={isDarkTheme}
                isEditing={session.id === editingSessionId}
                isDeleting={session.id === deletingSessionId}
                editTitle={editTitle}
                editInputRef={editInputRef}
                onEditTitleChange={(value) => dispatch({ type: "update-title", title: value })}
                onStartEdit={(event) => {
                  event.stopPropagation();
                  dispatch({ type: "start-edit", sessionId: session.id, title: getSessionTitle(session) });
                }}
                onSaveEdit={(event) => handleSaveEdit(session.id, event)}
                onCancelEdit={() => dispatch({ type: "reset" })}
                onEditKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleSaveEdit(session.id, event as unknown as React.MouseEvent);
                  } else if (event.key === "Escape") {
                    dispatch({ type: "reset" });
                  }
                }}
                onStartDelete={(event) => {
                  event.stopPropagation();
                  dispatch({ type: "start-delete", sessionId: session.id });
                }}
                onConfirmDelete={(event) => handleConfirmDelete(session.id, event)}
                onCancelDelete={() => dispatch({ type: "reset" })}
                onClick={() => handleSessionClick(session.id)}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className={`flex h-full w-full flex-col items-start gap-0 ${className}`}>
      <div className={`flex w-full items-center justify-between border-b border-solid ${isDarkTheme ? "border-brand-primary" : "border-neutral-1000"} px-6 py-4`}>
        <div className="flex h-8 items-center gap-2">
          <History className={`text-heading-3 font-heading-3 ${isDarkTheme ? "text-brand-primary" : "text-default-font"}`} />
          <span className="text-heading-3 font-heading-3 text-default-font">{title}</span>
        </div>

        <div className="flex items-center gap-1">
          {onClose ? <IconButton icon={<X />} onClick={onClose} /> : null}
        </div>
      </div>

      <div className="w-full px-4 pt-4">
        <Button className="h-8 w-full" variant="brand-primary" size="medium" icon={<Plus />} onClick={onNewChat}>
          {newChatLabel}
        </Button>
      </div>

      <div className="w-full flex-1 overflow-y-auto px-4 py-4">
        {isLoading ? renderLoadingState() : error ? renderErrorState() : sessions.length === 0 ? renderEmptyState() : renderSessionList()}
      </div>

      <div className="flex w-full items-center justify-between border-t border-solid border-neutral-border px-4 pb-4 pt-4">
        <Button variant="destructive-secondary" size="medium" icon={<Trash2 />} onClick={() => setShowClearAllModal(true)} disabled={sessions.length === 0}>
          {clearLabel}
        </Button>
      </div>

      <ClearAllDialog
        open={showClearAllModal}
        onClose={() => setShowClearAllModal(false)}
        onConfirm={handleConfirmClearAll}
        sessionCount={sessions.length}
        loading={clearAllLoading}
      />
    </div>
  );
}