import { SectionHeader, MetricCard, CertificateCard, ProductCard, DonationCard } from "@/components/blocks";
import { PButton, PBadge, PCard, PCardContent, PCardHeader, PCardTitle } from "@/components/ui";
import { Users } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Storybook"
        title="Galeri Komponen PPSI"
        description="Rangkuman elemen UI untuk konsistensi desain di seluruh platform."
      />
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard icon={Users} label="Contoh Metric" value="320" helper="Anggota aktif" />
        <CertificateCard
          holder="Contoh Anggota"
          level="Pendekar"
          issuedAt="2024-01-01"
          validUntil="2026-01-01"
        />
        <PCard>
          <PCardHeader>
            <PCardTitle>Button Variants</PCardTitle>
          </PCardHeader>
          <PCardContent className="flex flex-wrap gap-3">
            <PButton>Primary</PButton>
            <PButton variant="secondary">Secondary</PButton>
            <PButton variant="accent">Accent</PButton>
            <PButton variant="outline">Outline</PButton>
            <PButton variant="ghost">Ghost</PButton>
          </PCardContent>
        </PCard>
        <ProductCard
          title="Seragam Latihan"
          price={350000}
          category="Merch"
          seller="UMKM Silat"
          image="/images/products/seragam-1.svg"
        />
        <DonationCard
          title="Contoh Donasi"
          goal={25000000}
          collected={15000000}
          supporters={100}
          deadline="2025-08-01"
        />
        <PCard>
          <PCardHeader>
            <PCardTitle>Badges</PCardTitle>
          </PCardHeader>
          <PCardContent className="flex flex-wrap gap-2">
            <PBadge variant="gold">Gold</PBadge>
            <PBadge variant="bronze">Bronze</PBadge>
            <PBadge variant="silver">Silver</PBadge>
            <PBadge variant="outline">Outline</PBadge>
          </PCardContent>
        </PCard>
      </section>
    </div>
  );
}
