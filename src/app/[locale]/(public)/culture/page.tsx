import { Metadata } from "next";
import { SectionHeader } from "@/components/blocks";
import { fetchMock } from "@/lib/api";
import { CultureView, type Story } from "@/components/culture/culture-view";

export const metadata: Metadata = {
  title: "Hub Pelestarian Budaya",
};

export default async function CulturePage() {
  const stories = await fetchMock<Story[]>("stories");
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Pelestarian"
        title="Hub Budaya Pencak Silat"
        description="Kurasi artikel sejarah, prestasi atlet, dan multimedia arsip PPSI."
      />
      <CultureView stories={stories} />
    </div>
  );
}
