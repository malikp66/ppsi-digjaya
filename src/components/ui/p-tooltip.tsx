"use client";

import * as React from "react";

export const PTooltip = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-heritage px-3 py-1 text-xs text-white shadow-soft transition-opacity ${visible ? "opacity-100" : "opacity-0"}`}
      >
        {label}
      </span>
    </span>
  );
};
