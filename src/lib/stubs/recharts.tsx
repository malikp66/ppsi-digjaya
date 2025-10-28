"use client";

import React from "react";

type ChartBaseProps = {
  data: Array<Record<string, number | string>>;
  width?: number | string;
  height?: number;
  children?: React.ReactNode;
  className?: string;
};

export const ResponsiveContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`relative w-full h-full ${className ?? ""}`}>{children}</div>
);

const colors = ["#14532d", "#d4af37", "#c62828", "#3b2f2f"];

const Bars = ({
  data,
  dataKey,
  labelKey,
  color,
}: {
  data: Array<Record<string, number | string>>;
  dataKey: string;
  labelKey: string;
  color: string;
}) => {
  const max = Math.max(...data.map((item) => Number(item[dataKey] || 0)));
  return (
    <div className="flex h-full w-full gap-4 items-end">
      {data.map((item, index) => {
        const value = Number(item[dataKey] || 0);
        const height = max === 0 ? 0 : Math.max((value / max) * 100, 4);
        return (
          <div key={index} className="flex-1 text-center">
            <div
              className="mx-auto w-full rounded-t-full bg-gradient-to-t from-heritage/80 to-forest shadow-soft"
              style={{ height: `${height}%`, backgroundColor: color }}
            />
            <p className="mt-2 text-sm font-medium text-ink/70">
              {String(item[labelKey] ?? "")}
            </p>
            <p className="text-base font-semibold text-ink">{value}</p>
          </div>
        );
      })}
    </div>
  );
};

const PieSegments = ({
  data,
  dataKey,
}: {
  data: Array<Record<string, number | string>>;
  dataKey: string;
}) => {
  const total = data.reduce((acc, item) => acc + Number(item[dataKey] || 0), 0);
  let startAngle = 0;
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      {data.map((item, index) => {
        const value = Number(item[dataKey] || 0);
        const angle = total === 0 ? 0 : (value / total) * Math.PI * 2;
        const x1 = 60 + 50 * Math.cos(startAngle);
        const y1 = 60 + 50 * Math.sin(startAngle);
        const x2 = 60 + 50 * Math.cos(startAngle + angle);
        const y2 = 60 + 50 * Math.sin(startAngle + angle);
        const largeArc = angle > Math.PI ? 1 : 0;
        const path = `M60,60 L${x1},${y1} A50,50 0 ${largeArc} 1 ${x2},${y2} z`;
        startAngle += angle;
        return <path key={index} d={path} fill={colors[index % colors.length]} />;
      })}
    </svg>
  );
};

export const BarChart = ({
  data,
  height = 240,
  className,
  dataKey = "value",
  labelKey = "label",
  color = colors[0],
}: ChartBaseProps & { dataKey?: string; labelKey?: string; color?: string }) => (
  <div
    className={`relative w-full overflow-hidden rounded-xl bg-white/80 p-6 shadow-soft backdrop-blur ${className ?? ""}`}
    style={{ height }}
  >
    <Bars data={data} dataKey={dataKey} labelKey={labelKey} color={color} />
  </div>
);

export const AreaChart = ({
  data,
  height = 240,
  dataKey = "value",
  labelKey = "label",
  className,
  color = colors[1],
}: ChartBaseProps & { dataKey?: string; labelKey?: string; color?: string }) => {
  const max = Math.max(...data.map((item) => Number(item[dataKey] || 0)));
  const pathPoints = data
    .map((item, index) => {
      const value = Number(item[dataKey] || 0);
      const x = (index / Math.max(1, data.length - 1)) * 100;
      const y = 100 - (max === 0 ? 0 : (value / max) * 100);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-white/80 p-6 shadow-soft backdrop-blur ${className ?? ""}`}
      style={{ height }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <polyline
          fill={`${color}22`}
          stroke={color}
          strokeWidth={2}
          points={`0,100 ${pathPoints} 100,100`}
        />
      </svg>
      <div className="mt-4 flex justify-between text-sm text-ink/70">
        {data.map((item, index) => (
          <span key={index}>{String(item[labelKey] ?? "")}</span>
        ))}
      </div>
    </div>
  );
};

export const PieChart = ({
  data,
  dataKey = "value",
  className,
  height = 240,
}: ChartBaseProps & { dataKey?: string }) => (
  <div
    className={`flex h-full w-full items-center justify-center rounded-xl bg-white/80 p-6 shadow-soft backdrop-blur ${className ?? ""}`}
    style={{ height }}
  >
    <PieSegments data={data} dataKey={dataKey} />
  </div>
);

export const Pie = () => null;
export const Cell = () => null;
export const Tooltip = () => null;
export const Legend = () => null;
export const CartesianGrid = () => null;
export const XAxis = () => null;
export const YAxis = () => null;
