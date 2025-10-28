import { Metadata } from "next";
import { JoinForm } from "@/components/join/join-form";
import { SectionHeader } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Gabung PPSI",
};

export default function JoinPage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Registrasi"
        title="Menjadi Bagian Komunitas Digital PPSI"
        description="Lengkapi data pribadi, perguruan, dan minat Anda untuk mengakses materi eksklusif."
      />
      <JoinForm />
    </div>
  );
}
