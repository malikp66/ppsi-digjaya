import * as React from "react";
import { cn } from "@/lib/utils";

export const PTable = ({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) => (
  <div className="overflow-hidden rounded-2xl border border-heritage/10 shadow-soft">
    <table
      className={cn(
        "w-full min-w-max divide-y divide-heritage/10 bg-white/80 text-left text-sm text-ink",
        className,
      )}
      {...props}
    />
  </div>
);

export const PTableHead = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn("bg-heritage/5 text-xs uppercase tracking-wide", className)} {...props} />
);

export const PTableHeaderCell = ({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn("px-5 py-3 font-semibold text-heritage", className)} {...props} />
);

export const PTableBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn("divide-y divide-heritage/10", className)} {...props} />
);

export const PTableRow = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn("transition hover:bg-heritage/5", className)} {...props} />
);

export const PTableCell = ({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn("px-5 py-4 text-sm", className)} {...props} />
);
