"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  MDXEditor,
  type MDXEditorMethods,
  RemoteMDXEditorRealmProvider,
  useRemoteMDXEditorRealm,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  linkPlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeMirrorEditor,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  remoteRealmPlugin,
  diffSourcePlugin,
  viewMode$,
  applyFormat$,
  applyListType$,
  removeLink$,
  convertSelectionToNode$,
  activeEditor$,
} from "@mdxeditor/editor";
import { $createParagraphNode, $getSelection, $isRangeSelection } from "lexical";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { TOGGLE_LINK_COMMAND, $isLinkNode } from "@lexical/link";
import {
  Bold,
  Check,
  Code2,
  Eye,
  FileText,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  Link as LinkIcon,
  List,
  ListChecks,
  ListOrdered,
  MessageSquare,
  Strikethrough,
  Trash2,
  Type,
  X,
} from "lucide-react";

import "@mdxeditor/editor/style.css";
import "./MarkdownInput.css";

import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../utils/cn";
import { IconButton } from "../actions/IconButton";
import { TextField } from "./TextField";
import { DropdownMenu } from "../overlays/DropdownMenu";

export interface MarkdownInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  variant?: "default" | "compact";
  value?: string;
  onChange?: (value?: string) => void;
  autoFocus?: boolean;
}

type ToolbarApi = {
  toggleBold?: () => void;
  toggleItalic?: () => void;
  toggleStrikethrough?: () => void;
  insertInlineCode?: () => void;
  toggleBulletList?: () => void;
  toggleCheckList?: () => void;
  toggleOrderedList?: () => void;
  setViewMode?: (mode: "rich-text" | "source" | "diff") => void;
  setBlockType?: (type: string) => void;
  insertLink?: (url: string) => void;
  getLinkAtCursor?: () => string | null;
  removeLink?: () => void;
};

interface ToolbarControllerProps {
  editorId: string;
  toolbarApiRef: React.MutableRefObject<ToolbarApi | null>;
}

interface LinkPopupProps {
  visible: boolean;
  initialUrl?: string;
  onSubmit: (url: string) => void;
  onCancel: () => void;
  onRemove?: () => void;
  anchorElement?: HTMLElement;
}

function LinkPopup({
  visible,
  initialUrl = "",
  onSubmit,
  onCancel,
  onRemove,
  anchorElement,
}: LinkPopupProps) {
  const [url, setUrl] = useState(initialUrl);
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  useEffect(() => {
    if (visible && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible, onCancel]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };

    const timer = window.setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible, onCancel]);

  const popupStyle: React.CSSProperties = anchorElement
    ? {
        position: "fixed",
        left: `${anchorElement.getBoundingClientRect().left}px`,
        top: `${anchorElement.getBoundingClientRect().bottom + 8}px`,
      }
    : {
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      };

  const handleSubmit = (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!url.trim()) {
      return;
    }
    onSubmit(url.trim());
    setUrl("");
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={popupRef}
      style={popupStyle}
      className="z-[var(--z-popover)] flex min-w-[320px] flex-col items-start rounded-md border border-solid border-neutral-200 bg-neutral-50 px-1 py-1 shadow-neutral-200-shadow-medium"
    >
      <div className="w-full border-b border-neutral-border px-2 py-2">
        <TextField className="h-8 w-full" variant="filled" label="" helpText="" icon={<LinkIcon />}>
          <TextField.Input
            ref={inputRef}
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => {
              event.stopPropagation();
              if (event.key === "Enter") {
                handleSubmit(event);
              }
            }}
            placeholder="Enter URL (e.g., https://example.com)"
          />
        </TextField>
      </div>
      <div className="flex w-full items-center justify-end gap-2 px-2 py-2">
        {onRemove && initialUrl ? (
          <IconButton
            aria-label="Remove link"
            icon={<Trash2 />}
            onClick={onRemove}
            size="small"
            variant="destructive-primary"
          />
        ) : null}
        <div className="flex-1" />
        <IconButton
          aria-label="Cancel link"
          icon={<X />}
          onClick={onCancel}
          size="small"
          variant="neutral-secondary"
        />
        <IconButton
          aria-label="Apply link"
          icon={<Check />}
          onClick={() => handleSubmit()}
          size="small"
          variant="brand-primary"
          type="button"
        />
      </div>
    </div>
  );
}

const ToolbarController: React.FC<ToolbarControllerProps> = ({ editorId, toolbarApiRef }) => {
  const realm = useRemoteMDXEditorRealm(editorId);

  useEffect(() => {
    if (!realm) {
      return;
    }

    toolbarApiRef.current = {
      toggleBold: () => realm.pub(applyFormat$, "bold"),
      toggleItalic: () => realm.pub(applyFormat$, "italic"),
      toggleStrikethrough: () => realm.pub(applyFormat$, "strikethrough"),
      insertInlineCode: () => realm.pub(applyFormat$, "code"),
      toggleBulletList: () => realm.pub(applyListType$, "bullet"),
      toggleCheckList: () => realm.pub(applyListType$, "check"),
      toggleOrderedList: () => realm.pub(applyListType$, "number"),
      setViewMode: (mode: "rich-text" | "source" | "diff") => realm.pub(viewMode$, mode),
      setBlockType: (type: string) => {
        switch (type) {
          case "paragraph":
            realm.pub(convertSelectionToNode$, () => $createParagraphNode());
            break;
          case "quote":
            realm.pub(convertSelectionToNode$, () => $createQuoteNode());
            break;
          default:
            if (type.startsWith("h")) {
              realm.pub(convertSelectionToNode$, () =>
                $createHeadingNode(type as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"),
              );
            }
        }
      },
      insertLink: (url: string) => {
        const editor = realm.getValue(activeEditor$);
        if (editor) {
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
        }
      },
      getLinkAtCursor: () => {
        const editor = realm.getValue(activeEditor$);
        if (!editor) {
          return null;
        }

        let linkUrl: string | null = null;
        editor.getEditorState().read(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const node = selection.anchor.getNode();
            const parent = node.getParent();

            if ($isLinkNode(node)) {
              linkUrl = node.getURL();
            } else if ($isLinkNode(parent)) {
              linkUrl = parent.getURL();
            }
          }
        });

        return linkUrl;
      },
      removeLink: () => realm.pub(removeLink$, undefined),
    };

    return () => {
      toolbarApiRef.current = null;
    };
  }, [editorId, realm, toolbarApiRef]);

  return null;
};

export const MarkdownInput = React.forwardRef<HTMLDivElement, MarkdownInputProps>(
  function MarkdownInput(
    { variant = "default", className, value, onChange, autoFocus = false, ...otherProps },
    ref,
  ) {
    const { resolvedTheme } = useTheme();
    const mdxEditorRef = useRef<MDXEditorMethods>(null);
    const toolbarApiRef = useRef<ToolbarApi | null>(null);
    const editorIdRef = useRef(`markdown-editor-${Math.random().toString(36).slice(2)}`);
    const linkButtonRef = useRef<HTMLDivElement>(null);
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const editorId = editorIdRef.current;
    const [currentViewMode, setCurrentViewMode] = useState<"rich-text" | "source">("rich-text");
    const [linkPopupVisible, setLinkPopupVisible] = useState(false);
    const [currentLinkUrl, setCurrentLinkUrl] = useState<string>("");

    const focusEditor = () => {
      mdxEditorRef.current?.focus();
    };

    const handleLinkClick = () => {
      setCurrentLinkUrl(toolbarApiRef.current?.getLinkAtCursor?.() || "");
      setLinkPopupVisible(true);
    };

    const handleLinkSubmit = (url: string) => {
      toolbarApiRef.current?.insertLink?.(url);
      setLinkPopupVisible(false);
      setCurrentLinkUrl("");
      focusEditor();
    };

    const handleLinkCancel = () => {
      setLinkPopupVisible(false);
      setCurrentLinkUrl("");
      focusEditor();
    };

    const handleLinkRemove = () => {
      toolbarApiRef.current?.removeLink?.();
      setLinkPopupVisible(false);
      setCurrentLinkUrl("");
      focusEditor();
    };

    useEffect(() => {
      const sourceEditor = editorContainerRef.current?.querySelector<HTMLElement>(
        ".cm-content[role='textbox']",
      );

      if (sourceEditor) {
        sourceEditor.setAttribute("aria-label", "Markdown source editor");
      }
    }, [currentViewMode]);

    return (
      <RemoteMDXEditorRealmProvider>
        <ToolbarController editorId={editorId} toolbarApiRef={toolbarApiRef} />
        <div
          className={cn(
            "group/6750cb22 flex w-full flex-col items-start gap-4 rounded-md min-h-0",
            variant === "compact" && "gap-1",
            className,
          )}
          ref={ref}
          {...otherProps}
        >
          <div className="flex w-full flex-none items-center gap-1">
            <IconButton size="small" icon={<Bold />} aria-label="Bold" title="Bold" onClick={() => { toolbarApiRef.current?.toggleBold?.(); focusEditor(); }} />
            <IconButton size="small" icon={<Italic />} aria-label="Italic" title="Italic" onClick={() => { toolbarApiRef.current?.toggleItalic?.(); focusEditor(); }} />
            <IconButton size="small" icon={<Strikethrough />} aria-label="Strikethrough" title="Strikethrough" onClick={() => { toolbarApiRef.current?.toggleStrikethrough?.(); focusEditor(); }} />
            <div className="flex w-px flex-none self-stretch bg-neutral-border" />
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent hover:bg-neutral-100 active:bg-neutral-100"
                  aria-label="Text style"
                  title="Text style"
                >
                  <Heading className="text-body font-body text-neutral-700" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content side="bottom" align="start" sideOffset={4}>
                <DropdownMenu.DropdownItem icon={<Type />} label="Paragraph" onClick={() => { focusEditor(); toolbarApiRef.current?.setBlockType?.("paragraph"); }} />
                <DropdownMenu.DropdownItem icon={<MessageSquare />} label="Quote" onClick={() => { focusEditor(); toolbarApiRef.current?.setBlockType?.("quote"); }} />
                <DropdownMenu.DropdownDivider />
                <DropdownMenu.DropdownItem icon={<Heading1 />} label="Heading 1" onClick={() => { focusEditor(); toolbarApiRef.current?.setBlockType?.("h1"); }} />
                <DropdownMenu.DropdownItem icon={<Heading2 />} label="Heading 2" onClick={() => { focusEditor(); toolbarApiRef.current?.setBlockType?.("h2"); }} />
                <DropdownMenu.DropdownItem icon={<Heading3 />} label="Heading 3" onClick={() => { focusEditor(); toolbarApiRef.current?.setBlockType?.("h3"); }} />
                <DropdownMenu.DropdownItem icon={<Heading4 />} label="Heading 4" onClick={() => { focusEditor(); toolbarApiRef.current?.setBlockType?.("h4"); }} />
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            <div ref={linkButtonRef}>
              <IconButton size="small" icon={<LinkIcon />} aria-label="Insert link" title="Insert link" onClick={handleLinkClick} />
            </div>
            <div className="flex w-px flex-none self-stretch bg-neutral-border" />
            <IconButton size="small" icon={<List />} aria-label="Bullet list" title="Bullet list" onClick={() => { toolbarApiRef.current?.toggleBulletList?.(); focusEditor(); }} />
            <IconButton size="small" icon={<ListChecks />} aria-label="Checklist" title="Checklist" onClick={() => { toolbarApiRef.current?.toggleCheckList?.(); focusEditor(); }} />
            <IconButton size="small" icon={<ListOrdered />} aria-label="Numbered list" title="Numbered list" onClick={() => { toolbarApiRef.current?.toggleOrderedList?.(); focusEditor(); }} />
            <div className="flex w-px flex-none self-stretch bg-neutral-border" />
            <IconButton size="small" icon={<Code2 />} aria-label="Inline code" title="Inline code" onClick={() => { toolbarApiRef.current?.insertInlineCode?.(); focusEditor(); }} />
            <div className="flex-1" />
            <IconButton
              size="small"
              icon={<Eye />}
              aria-label="Rich text view"
              title="Rich text view"
              variant={currentViewMode === "rich-text" ? "brand-primary" : "neutral-secondary"}
              onClick={() => {
                toolbarApiRef.current?.setViewMode?.("rich-text");
                setCurrentViewMode("rich-text");
              }}
            />
            <IconButton
              size="small"
              icon={<FileText />}
              aria-label="Markdown source view"
              title="Markdown source view"
              variant={currentViewMode === "source" ? "brand-primary" : "neutral-secondary"}
              onClick={() => {
                toolbarApiRef.current?.setViewMode?.("source");
                setCurrentViewMode("source");
              }}
            />
          </div>

          <LinkPopup
            visible={linkPopupVisible}
            initialUrl={currentLinkUrl}
            onSubmit={handleLinkSubmit}
            onCancel={handleLinkCancel}
            onRemove={currentLinkUrl ? handleLinkRemove : undefined}
            anchorElement={linkButtonRef.current || undefined}
          />

          <div
            ref={editorContainerRef}
            className="flex w-full flex-1 min-h-0 flex-col items-start overflow-hidden border border-solid border-neutral-border focus-within:border-focus-border"
          >
            <MDXEditor
              ref={mdxEditorRef}
              markdown={value || ""}
              onChange={onChange}
              placeholder="Write a note..."
              autoFocus={autoFocus}
              plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                linkPlugin(),
                codeBlockPlugin({
                  defaultCodeBlockLanguage: "txt",
                  codeBlockEditorDescriptors: [{ priority: -10, match: () => true, Editor: CodeMirrorEditor }],
                }),
                codeMirrorPlugin({
                  codeBlockLanguages: {
                    txt: "Plain Text",
                    js: "JavaScript",
                    ts: "TypeScript",
                    py: "Python",
                    jsx: "JavaScript (React)",
                    tsx: "TypeScript (React)",
                    css: "CSS",
                    json: "JSON",
                    html: "HTML",
                    md: "Markdown",
                    bash: "Bash",
                    sh: "Shell",
                    sql: "SQL",
                    yaml: "YAML",
                    xml: "XML",
                  },
                }),
                thematicBreakPlugin(),
                tablePlugin(),
                markdownShortcutPlugin(),
                diffSourcePlugin({ viewMode: "rich-text" }),
                remoteRealmPlugin({ editorId }),
              ]}
              contentEditableClassName={resolvedTheme === "dark" ? "prose prose-invert" : "prose"}
              className={cn(
                "mdx-editor-timeline grid min-h-0 w-full flex-1 self-stretch overflow-y-auto",
                resolvedTheme === "dark" ? "dark-theme" : "light-theme",
              )}
            />
          </div>
        </div>
      </RemoteMDXEditorRealmProvider>
    );
  },
);