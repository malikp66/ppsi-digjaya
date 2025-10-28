import { Metadata } from "next";
import { SectionHeader, MetricCard } from "@/components/blocks";
import { PCard, PCardContent, PCardHeader, PCardTitle } from "@/components/ui";
import { fetchMock } from "@/lib/api";
import { Award, Users, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang PPSI",
};

export default async function AboutPage() {
  const analytics = await fetchMock<{
    activeDojos: number;
    certificates: number;
  }>("analytics");

  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Identitas"
        title="Organisasi Pencak Silat Jawa Barat"
        description="PPSI Digjaya menyatukan perguruan tradisional untuk membangun ekosistem digital, pendidikan, dan pemberdayaan ekonomi."
      />
      <div className="grid gap-6 md:grid-cols-3">
        <MetricCard
          icon={Users}
          label="Perguruan Aktif"
          value={`${analytics.activeDojos}`}
          helper="Tergabung dalam ekosistem digital"
        />
        <MetricCard
          icon={Award}
          label="Sertifikasi"
          value={`${analytics.certificates}`}
          helper="Tersinkron dengan database nasional"
        />
        <MetricCard
          icon={Globe2}
          label="Kolaborasi"
          value="12 Negara"
          helper="Jejaring diaspora pencak silat"
        />
      </div>
      <section className="grid gap-6 lg:grid-cols-2">
        <PCard>
          <PCardHeader>
            <PCardTitle>Visi</PCardTitle>
          </PCardHeader>
          <PCardContent className="space-y-3 text-sm text-ink/70">
            <p>
              Menjadi pusat inovasi pencak silat tradisional Jawa Barat yang inklusif,
              berdaya saing global, serta menjaga akar budaya leluhur.
            </p>
          </PCardContent>
        </PCard>
        <PCard>
          <PCardHeader>
            <PCardTitle>Misi</PCardTitle>
          </PCardHeader>
          <PCardContent className="space-y-2 text-sm text-ink/70">
            <ul className="list-disc space-y-2 pl-4">
              <li>Digitalisasi arsip jurus dan manuskrip perguruan.</li>
              <li>Program pelatihan blended dengan mentor nasional.</li>
              <li>Skema sertifikasi transparan dengan QR verifikasi.</li>
              <li>Marketplace dan donasi untuk keberlanjutan komunitas.</li>
            </ul>
          </PCardContent>
        </PCard>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <PCard>
          <PCardHeader>
            <PCardTitle>Struktur Pengurus</PCardTitle>
          </PCardHeader>
          <PCardContent className="space-y-2 text-sm text-ink/70">
            <p>Ketua Umum: H. Suryana</p>
            <p>Sekretaris Jenderal: Dian Kartika</p>
            <p>Direktur Digital: Rangga Saputra</p>
            <p>Kurator Budaya: Dr. Laksmi</p>
          </PCardContent>
        </PCard>
        <PCard>
          <PCardHeader>
            <PCardTitle>Kolaborasi Strategis</PCardTitle>
          </PCardHeader>
          <PCardContent className="space-y-2 text-sm text-ink/70">
            <p>UNESCO Intangible Heritage Programme</p>
            <p>Disbudpar Jawa Barat</p>
            <p>Komite Olahraga Nasional Indonesia</p>
            <p>Komunitas Diaspora Silat Eropa</p>
          </PCardContent>
        </PCard>
      </section>
    </div>
  );
}
