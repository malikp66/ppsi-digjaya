"use client";

import { useEffect, useRef } from "react";
import { PCard, PCardContent, PCardHeader, PCardTitle } from "@/components/ui";
import { toCanvas } from "qrcode";

export const QRCard = ({ value, label }: { value: string; label: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    toCanvas(canvasRef.current, value, { size: 180 });
  }, [value]);

  return (
    <PCard className="items-center text-center">
      <PCardHeader>
        <PCardTitle>{label}</PCardTitle>
      </PCardHeader>
      <PCardContent className="flex flex-col items-center gap-3">
        <canvas ref={canvasRef} className="rounded-3xl bg-white p-4 shadow-soft" />
        <span className="rounded-full bg-heritage/10 px-3 py-1 text-xs font-semibold text-heritage">
          {value}
        </span>
      </PCardContent>
    </PCard>
  );
};
