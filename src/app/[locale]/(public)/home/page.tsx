import { Metadata } from "next";
import { Hero, SectionHeader, MetricCard, TestimonialCarousel } from "@/components/blocks";
import { PCard, PCardContent, PCardHeader, PCardTitle } from "@/components/ui";
import { fetchMock } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { Users, Award, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Beranda | PPSI Digjaya",
};

export default async function HomePage() {
  const analytics = await fetchMock<{
    memberGrowth: { label: string; value: number }[];
    rankDistribution: { label: string; value: number }[];
    certificates: number;
    activeDojos: number;
    finance: { label: string; value: number }[];
  }>("analytics");
  const donations = await fetchMock<
    { id: string; title: string; collected: number; goal: number }[]
  >("donations");

  const totalCollected = donations.reduce((acc, item) => acc + item.collected, 0);

  return (
    <div className="space-y-16">
      <Hero />
      <section className="grid gap-6 md:grid-cols-3">
        <MetricCard
          icon={Users}
          label="Anggota Terdaftar"
          value={`${analytics.memberGrowth.at(-1)?.value ?? 0}+`}
          helper="Aktif mengikuti program digital"
        />
        <MetricCard
          icon={Award}
          label="Sertifikat Terbit"
          value={`${analytics.certificates}`}
          helper="Diverifikasi oleh pengurus pusat"
        />
        <MetricCard
          icon={Globe2}
          label="Dukungan Komunitas"
          value={formatCurrency(totalCollected)}
          helper="Penggalangan dana budaya dan atlet"
        />
      </section>
      <section id="culture" className="space-y-8">
        <SectionHeader
          eyebrow="Budaya Hidup"
          title="Pelestarian Tradisi di Era Digital"
          description="Eksplorasi arsip perguruan, tokoh inspiratif, dan inovasi digital PPSI."
        />
        <div className="grid gap-6 md:grid-cols-3">
          <PCard>
            <PCardHeader>
              <PCardTitle>Digital Membership</PCardTitle>
            </PCardHeader>
            <PCardContent>
              <p className="text-sm text-ink/70">
                Registrasi anggota berbasis geolokasi, progress latihan, dan gamifikasi
                pencapaian sabuk.
              </p>
            </PCardContent>
          </PCard>
          <PCard>
            <PCardHeader>
              <PCardTitle>Cultural Archive</PCardTitle>
            </PCardHeader>
            <PCardContent>
              <p className="text-sm text-ink/70">
                Koleksi manuskrip, video, dan naskah filosofi dalam dua bahasa dengan
                filter era dan wilayah.
              </p>
            </PCardContent>
          </PCard>
          <PCard>
            <PCardHeader>
              <PCardTitle>Training Hub</PCardTitle>
            </PCardHeader>
            <PCardContent>
              <p className="text-sm text-ink/70">
                Modul latihan terpandu, evaluasi video, serta kalender jadwal coach nasional.
              </p>
            </PCardContent>
          </PCard>
        </div>
      </section>
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Suara Komunitas"
          title="Para pendekar berbagi pengalaman"
          description="Cerita anggota dan pelatih yang bertumbuh bersama PPSI."
        />
        <TestimonialCarousel />
      </section>
    </div>
  );
}
