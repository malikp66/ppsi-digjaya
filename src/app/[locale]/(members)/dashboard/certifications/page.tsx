import { fetchMock } from "@/lib/api";
import { CertificateCard } from "@/components/blocks";
import { PCard, PCardHeader, PCardTitle, PCardContent, PButton } from "@/components/ui";

export default async function CertificationsPage() {
  const certificates = await fetchMock<
    {
      id: string;
      holder: string;
      level: string;
      issuedAt: string;
      validUntil: string;
      qr: string;
    }[]
  >("certificates");

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-heritage">Manajemen Sertifikat</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {certificates.map((certificate) => (
          <CertificateCard key={certificate.id} {...certificate} />
        ))}
      </div>
      <PCard>
        <PCardHeader>
          <PCardTitle>Panel Verifikasi</PCardTitle>
        </PCardHeader>
        <PCardContent className="flex flex-wrap gap-3 text-sm text-ink/70">
          <PButton variant="outline">Ekspor CSV</PButton>
          <PButton variant="accent">Tandai Sudah Diverifikasi</PButton>
          <PButton>Generate QR Baru</PButton>
        </PCardContent>
      </PCard>
    </div>
  );
}
