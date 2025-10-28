"use client";

import { useState } from "react";
import Image from "next/image";
import {
  PCard,
  PCardHeader,
  PCardTitle,
  PCardContent,
  PButton,
  PDialog,
  PInput,
} from "@/components/ui";
import { PProgress } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export type Course = {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  level: string;
  thumbnail: string;
  progress: number;
  schedule: string;
  transcript: string;
  feedback: string;
  nextSession: string;
};

export const TrainingView = ({ courses }: { courses: Course[] }) => {
  const [selected, setSelected] = useState<Course | null>(courses[0] ?? null);
  const [assignmentOpen, setAssignmentOpen] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-4">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => setSelected(course)}
            className={`w-full rounded-2xl border px-4 py-3 text-left transition ${selected?.id === course.id ? "border-forest bg-forest/10" : "border-transparent bg-white/80"}`}
          >
            <p className="text-sm font-semibold text-heritage">{course.title}</p>
            <p className="text-xs text-ink/60">{course.instructor}</p>
          </button>
        ))}
      </aside>
      {selected ? (
        <div className="space-y-6">
          <PCard>
            <PCardHeader className="space-y-3">
              <div className="relative h-48 w-full overflow-hidden rounded-2xl">
                <Image
                  src={selected.thumbnail}
                  alt={selected.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <PCardTitle>{selected.title}</PCardTitle>
              <p className="text-sm text-ink/60">
                {selected.instructor} • {selected.duration} • {selected.level}
              </p>
            </PCardHeader>
            <PCardContent className="space-y-4 text-sm text-ink/70">
              <div>
                <p className="text-xs uppercase tracking-wide text-ink/50">Progres</p>
                <PProgress value={selected.progress} />
              </div>
              <p>{selected.transcript}</p>
              <p className="text-xs text-ink/50">
                Sesi berikutnya: {formatDate(selected.nextSession)} ({selected.schedule})
              </p>
              <div className="flex gap-3">
                <PButton onClick={() => setAssignmentOpen(true)}>Unggah tugas</PButton>
                <PButton variant="outline">Lihat feedback</PButton>
              </div>
            </PCardContent>
          </PCard>
          <PCard>
            <PCardHeader>
              <PCardTitle>Rangkuman Feedback</PCardTitle>
            </PCardHeader>
            <PCardContent className="space-y-2 text-sm text-ink/70">
              <p>{selected.feedback}</p>
            </PCardContent>
          </PCard>
        </div>
      ) : null}
      <PDialog open={assignmentOpen} onOpenChange={setAssignmentOpen}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-heritage">Unggah tugas video</h3>
          <PInput type="url" placeholder="Tautan video latihan" />
          <textarea
            className="h-24 w-full rounded-2xl border border-heritage/20 bg-white/80 p-4 text-sm focus:border-prestige focus:outline-none"
            placeholder="Catatan untuk pelatih"
          />
          <PButton className="w-full" onClick={() => setAssignmentOpen(false)}>
            Kirim
          </PButton>
        </div>
      </PDialog>
    </div>
  );
};
