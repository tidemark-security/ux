"use client";

import React, { useMemo, useState } from "react";
import { CheckSquare, ChevronDown, Search, Square, User, UserPlus, UserX } from "lucide-react";

import { Button } from "../actions/Button";
import { TextField } from "./TextField";
import { DropdownMenu } from "../overlays/DropdownMenu";

export interface AssigneeOption {
  userId: string | number;
  username: string;
  email?: string | null;
}

export interface AssigneeSelectorProps {
  mode?: "assign" | "filter";
  currentAssignee?: string | null;
  selectedAssignees?: string[] | null;
  currentUser: string | null;
  users: AssigneeOption[];
  isLoadingUsers?: boolean;
  disabled?: boolean;
  size?: "small" | "medium";
  onUnassign?: () => void;
  onAssignToMe?: () => void;
  onAssignToUser?: (username: string) => void;
  onSelectionChange?: (assignees: string[] | null) => void;
  maxUsers?: number;
  className?: string;
  dropdownClassName?: string;
}

export function AssigneeSelector({
  mode = "assign",
  currentAssignee,
  selectedAssignees,
  currentUser,
  users,
  isLoadingUsers = false,
  disabled = false,
  size = "small",
  onUnassign,
  onAssignToMe,
  onAssignToUser,
  onSelectionChange,
  maxUsers,
  className,
  dropdownClassName,
}: AssigneeSelectorProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isAssignedToCurrentUser = mode === "assign" && currentUser && currentAssignee === currentUser;

  const selected = useMemo(() => {
    if (mode !== "filter") {
      return [] as string[];
    }

    return selectedAssignees || [];
  }, [mode, selectedAssignees]);

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    const search = searchQuery.toLowerCase();
    return users.filter(
      (user) => user.username.toLowerCase().includes(search) || user.email?.toLowerCase().includes(search),
    );
  }, [users, searchQuery]);

  const displayUsers = maxUsers ? filteredUsers.slice(0, maxUsers) : filteredUsers;

  const buttonLabel = useMemo(() => {
    if (disabled) return "Updating...";

    if (mode === "assign") {
      return currentAssignee ? `${currentAssignee}${isAssignedToCurrentUser ? " (You)" : ""}` : "Unassigned";
    }

    if (selected.length === 0) return "Assignee";
    if (selected.length === 1) {
      if (selected[0] === "__unassigned__") return "Unassigned";
      const user = users.find((item) => item.username === selected[0]);
      return user ? user.username : selected[0];
    }
    if (selected.length === 2) {
      return selected.map((value) => (value === "__unassigned__" ? "Unassigned" : value)).join(", ");
    }
    return `${selected.length} assignees`;
  }, [currentAssignee, disabled, isAssignedToCurrentUser, mode, selected, users]);

  const handleToggle = (username: string) => {
    if (mode !== "filter" || !onSelectionChange) return;

    const nextSelection = selected.includes(username)
      ? selected.filter((value) => value !== username)
      : [...selected, username];

    onSelectionChange(nextSelection.length > 0 ? nextSelection : null);
  };

  const handleAssign = (action: "unassign" | "assignToMe" | string) => {
    if (mode !== "assign") return;

    if (action === "unassign" && onUnassign) {
      onUnassign();
      setDropdownOpen(false);
      return;
    }

    if (action === "assignToMe" && onAssignToMe) {
      onAssignToMe();
      setDropdownOpen(false);
      return;
    }

    if (onAssignToUser) {
      onAssignToUser(action);
      setDropdownOpen(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setDropdownOpen(open);
    if (!open) {
      setSearchQuery("");
    }
  };

  return (
    <DropdownMenu.Root modal={false} open={dropdownOpen} onOpenChange={handleOpenChange}>
      <DropdownMenu.Trigger asChild>
        <Button
          className={className || (size === "medium" ? "h-auto w-auto flex-none self-stretch" : "h-8 w-auto")}
          variant="neutral-secondary"
          size={size}
          icon={<User />}
          iconRight={<ChevronDown />}
          disabled={disabled}
        >
          {buttonLabel}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content side="bottom" align="start" sideOffset={4} className={`max-h-[400px] overflow-y-auto ${dropdownClassName || ""}`}>
        {users.length > 0 ? (
          <div className="w-full border-b border-neutral-border px-2 py-2">
            <TextField className="h-8 w-full" variant="filled" label="" helpText="" icon={<Search />}>
              <TextField.Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => event.stopPropagation()}
              />
            </TextField>
          </div>
        ) : null}

        {mode === "assign" ? (
          <>
            {currentAssignee && onUnassign ? (
              <>
                <DropdownMenu.DropdownItem icon={<UserX />} label="Unassign" onClick={() => handleAssign("unassign")} />
                <DropdownMenu.DropdownDivider />
              </>
            ) : null}
            {currentUser && onAssignToMe && !isAssignedToCurrentUser ? (
              <>
                <DropdownMenu.DropdownItem icon={<UserPlus />} label="Assign to me" onClick={() => handleAssign("assignToMe")} />
                <DropdownMenu.DropdownDivider />
              </>
            ) : null}
          </>
        ) : (
          <>
            <DropdownMenu.DropdownItem
              icon={selected.includes("__unassigned__") ? <CheckSquare /> : <Square />}
              hint="Items with no assignee"
              label="Unassigned"
              onClick={() => handleToggle("__unassigned__")}
              onSelect={(event) => event.preventDefault()}
            />
            {users.length > 0 ? <DropdownMenu.DropdownDivider /> : null}
          </>
        )}

        {isLoadingUsers ? (
          <DropdownMenu.DropdownItem icon={null} label="Loading users..." />
        ) : displayUsers.length > 0 ? (
          displayUsers.map((user) => {
            const isSelected = mode === "filter" && selected.includes(user.username);
            const isCurrent = user.username === currentAssignee;

            return (
              <DropdownMenu.DropdownItem
                key={user.userId}
                icon={mode === "filter" ? (isSelected ? <CheckSquare /> : <Square />) : <User />}
                label={user.username}
                hint={
                  mode === "assign"
                    ? isCurrent
                      ? "Current"
                      : user.username === currentUser
                        ? "You"
                        : user.email || undefined
                    : user.email || undefined
                }
                showHint={!!(mode === "assign" ? isCurrent || user.username === currentUser || user.email : user.email)}
                onClick={() => (mode === "filter" ? handleToggle(user.username) : handleAssign(user.username))}
                onSelect={(event) => {
                  if (mode === "filter") {
                    event.preventDefault();
                  }
                }}
              />
            );
          })
        ) : (
          <DropdownMenu.DropdownItem icon={null} label={searchQuery ? "No users found" : "No users available"} />
        )}

        {mode === "filter" && selected.length > 0 ? (
          <>
            <DropdownMenu.DropdownDivider />
            <DropdownMenu.DropdownItem icon={<UserX />} label="Clear selection" onClick={() => onSelectionChange?.(null)} />
          </>
        ) : null}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}