import { Metadata } from "next";
import { SectionHeader } from "@/components/blocks";
import { fetchMock } from "@/lib/api";
import { TrainingView, type Course } from "@/components/training/training-view";

export const metadata: Metadata = {
  title: "Pelatihan Digital",
};

export default async function TrainingPage() {
  const courses = await fetchMock<Course[]>("courses");
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Program Latihan"
        title="E-Learning Pencak Silat"
        description="Akses modul teknis, jadwal evaluasi, dan unggahan tugas video langsung dari pelatih PPSI."
      />
      <TrainingView courses={courses} />
    </div>
  );
}
