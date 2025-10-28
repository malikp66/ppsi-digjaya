"use client";

import { useEffect, useMemo, useRef } from "react";
import { PCard, PCardHeader, PCardTitle } from "@/components/ui";

type Cluster = {
  id: string;
  name: string;
  members: number;
  coordinates: [number, number];
};

export const MapWidget = ({ clusters }: { clusters: Cluster[] }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const width = canvas.width;
    const height = canvas.height;
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#f0ebe1";
    context.fillRect(0, 0, width, height);
    clusters.forEach((cluster) => {
      const x = ((cluster.coordinates[0] + 180) / 360) * width;
      const y = ((-cluster.coordinates[1] + 90) / 180) * height;
      const radius = Math.max(6, Math.min(20, cluster.members / 12));
      context.beginPath();
      context.fillStyle = "rgba(20, 83, 45, 0.75)";
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    });
  }, [clusters]);

  const stats = useMemo(() => {
    const totalMembers = clusters.reduce((acc, cluster) => acc + cluster.members, 0);
    return {
      dojos: clusters.length,
      members: totalMembers,
      highlight: clusters[0]?.name ?? "",
    };
  }, [clusters]);

  return (
    <PCard>
      <PCardHeader>
        <PCardTitle>Peta Perguruan Aktif</PCardTitle>
      </PCardHeader>
      <div className="flex flex-col gap-4">
        <canvas ref={canvasRef} width={600} height={320} className="w-full rounded-2xl" />
        <div className="flex flex-wrap gap-4 text-sm text-ink/70">
          <span className="rounded-full bg-forest/10 px-3 py-1 font-semibold text-forest">
            {stats.dojos} perguruan
          </span>
          <span className="rounded-full bg-prestige/10 px-3 py-1 font-semibold text-heritage">
            {stats.members} anggota
          </span>
          <span className="rounded-full bg-heritage/10 px-3 py-1 font-semibold text-heritage">
            Fokus: {stats.highlight}
          </span>
        </div>
      </div>
    </PCard>
  );
};
