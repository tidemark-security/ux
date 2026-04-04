"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../utils/cn";

export interface MarkdownContentProps {
  content: string;
  className?: string;
  isStreamingFromAi?: boolean;
  linkStyle?: "badge" | "inline";
}

const sanitizeConfig = {
  tagNames: [
    "p",
    "br",
    "strong",
    "em",
    "u",
    "s",
    "del",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "a",
    "code",
    "pre",
    "blockquote",
    "hr",
    "input",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
  ],
  attributes: {
    a: ["href"],
    input: ["type", "checked", "disabled"],
    th: ["align"],
    td: ["align"],
    code: ["className"],
  },
  protocols: {
    href: ["http", "https", "mailto"],
  },
};

const MarkdownContentComponent: React.FC<MarkdownContentProps> = ({
  content,
  className,
  linkStyle = "inline",
}) => {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  if (!content || content.trim() === "") {
    return null;
  }

  return (
    <div className={cn("w-full min-w-0 [overflow-wrap:anywhere]", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeSanitize, sanitizeConfig]]}
        components={{
          h1: ({ children }) => <h1 className="mb-2 mt-2 text-[30px] font-semibold leading-[36px] first:mt-0 text-default-font">{children}</h1>,
          h2: ({ children }) => <h2 className="mb-2 mt-2 text-[20px] font-semibold leading-[24px] first:mt-0 text-default-font">{children}</h2>,
          h3: ({ children }) => <h3 className="mb-2 mt-2 text-[16px] font-semibold leading-[20px] first:mt-0 text-default-font">{children}</h3>,
          p: ({ children }) => <p className="my-3 text-sm leading-[1.6] first:mt-0 last:mb-0 [overflow-wrap:anywhere]">{children}</p>,
          ul: ({ children, className: listClassName }) => {
            const isTaskList = listClassName?.includes("contains-task-list");
            return <ul className={`mb-2 mt-2 space-y-0 text-sm leading-[1.6] [overflow-wrap:anywhere] ${isTaskList ? "list-none pl-0" : "list-disc pl-6"}`}>{children}</ul>;
          },
          ol: ({ children }) => <ol className="mb-2 mt-2 list-decimal space-y-0 pl-6 text-sm leading-[1.6] [overflow-wrap:anywhere]">{children}</ol>,
          li: ({ children, className: listItemClassName }) => {
            const isTaskItem = listItemClassName?.includes("task-list-item");
            if (isTaskItem) {
              return <li className="my-0 flex items-start gap-2 leading-[1.6] [overflow-wrap:anywhere]" style={{ listStyle: "none" }}>{children}</li>;
            }
            return <li className="my-0 leading-[1.6] [overflow-wrap:anywhere]">{children}</li>;
          },
          input: ({ type, checked, disabled }) => {
            if (type !== "checkbox") {
              return null;
            }

            return (
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                readOnly
                className="mt-[3px] h-4 w-4 flex-shrink-0 cursor-default appearance-none rounded border border-neutral-500 bg-transparent checked:border-brand-primary checked:bg-brand-primary relative before:absolute before:left-[4px] before:top-[1px] before:h-[9px] before:w-[5px] before:rotate-45 before:border-b-2 before:border-r-2 before:border-black before:content-[''] before:opacity-0 checked:before:opacity-100"
              />
            );
          },
          blockquote: ({ children }) => <blockquote className="my-4 border-l-[3px] border-brand-500 pl-4 leading-[1.6] text-default-font [overflow-wrap:anywhere]">{children}</blockquote>,
          code: ({ inline, className: codeClassName, children, ...rest }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) => {
            const isInline = inline !== false && !codeClassName;
            if (isInline) {
              return (
                <code
                  className={cn("rounded px-[6px] py-[2px] font-mono text-sm text-brand-300", isDarkTheme ? "bg-neutral-200" : "bg-neutral-600")}
                  {...rest}
                >
                  {children}
                </code>
              );
            }

            return (
              <pre className="my-4 overflow-x-auto rounded-md border border-neutral-border bg-neutral-100 p-3 text-sm text-default-font">
                <code className={codeClassName}>{children}</code>
              </pre>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                linkStyle === "inline" ? "underline underline-offset-2" : "rounded border border-neutral-border px-2 py-1 no-underline",
                isDarkTheme ? "text-brand-primary hover:text-brand-400" : "text-brand-700 hover:text-brand-800",
              )}
            >
              {children}
            </a>
          ),
          hr: () => <hr className="my-4 border-neutral-300" />,
          table: ({ children }) => (
            <div className="my-4 w-full min-w-0 overflow-x-auto">
              <table className="min-w-full border-collapse border border-neutral-border text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-neutral-100">{children}</thead>,
          tr: ({ children }) => <tr className="border-b border-neutral-border">{children}</tr>,
          th: ({ children }) => <th className="border border-neutral-border px-3 py-2 text-left font-semibold leading-[1.6] text-default-font">{children}</th>,
          td: ({ children }) => <td className="border border-neutral-border px-3 py-2 leading-[1.6] text-default-font [overflow-wrap:anywhere]">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export const MarkdownContent = React.memo(MarkdownContentComponent, (prevProps, nextProps) => {
  return prevProps.content === nextProps.content && prevProps.className === nextProps.className && prevProps.isStreamingFromAi === nextProps.isStreamingFromAi;
});

export default MarkdownContent;