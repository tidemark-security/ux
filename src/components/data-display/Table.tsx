"use client";

import React from "react";

import { IconWrapper } from "../../utils/IconWrapper";
import { cn } from "../../utils/cn";

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode;
  clickable?: boolean;
  className?: string;
}

const Row = React.forwardRef<HTMLTableRowElement, TableRowProps>(function Row(
  { children, clickable = false, className, ...otherProps },
  ref,
) {
  return (
    <tr
      className={cn(
        "group/table-row border-t border-solid border-neutral-border",
        { "hover:bg-neutral-50": clickable },
        className,
      )}
      ref={ref}
      {...otherProps}
    >
      {children}
    </tr>
  );
});

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
  children?: React.ReactNode;
  className?: string;
}

const Cell = React.forwardRef<HTMLDivElement, TableCellProps>(function Cell(
  { children, className, ...otherProps },
  ref,
) {
  return (
    <td {...otherProps}>
      <div className={cn("flex h-12 w-full items-center gap-1 px-3", className)} ref={ref}>
        {children}
      </div>
    </td>
  );
});

export interface TableHeaderRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode;
  className?: string;
}

const HeaderRow = React.forwardRef<HTMLTableRowElement, TableHeaderRowProps>(function HeaderRow(
  { children, className, ...otherProps },
  ref,
) {
  return (
    <tr className={className} ref={ref} {...otherProps}>
      {children}
    </tr>
  );
});

export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const HeaderCell = React.forwardRef<HTMLDivElement, TableHeaderCellProps>(function HeaderCell(
  { children, icon = null, className, ...otherProps },
  ref,
) {
  return (
    <th {...otherProps}>
      <div className={cn("flex h-8 w-full items-center gap-1 px-3", className)} ref={ref}>
        {children ? (
          <span className="whitespace-nowrap text-caption-bold font-caption-bold text-subtext-color">
            {children}
          </span>
        ) : null}
        {icon ? <IconWrapper className="text-caption font-caption text-subtext-color">{icon}</IconWrapper> : null}
      </div>
    </th>
  );
});

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  header?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const TableRoot = React.forwardRef<HTMLTableElement, TableProps>(function TableRoot(
  { header, children, className, ...otherProps },
  ref,
) {
  return (
    <table className={cn("w-full", className)} ref={ref} {...otherProps}>
      <thead>{header}</thead>
      <tbody className="border-b border-solid border-neutral-border">{children}</tbody>
    </table>
  );
});

export const Table = Object.assign(TableRoot, {
  Row,
  Cell,
  HeaderRow,
  HeaderCell,
});
