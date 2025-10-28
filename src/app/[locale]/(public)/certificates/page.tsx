import { Metadata } from "next";
import { CertificateCard, SectionHeader, QRCard } from "@/components/blocks";
import { PCard, PCardContent, PCardHeader, PCardTitle, PInput, PButton } from "@/components/ui";
import { fetchMock } from "@/lib/api";

export const metadata: Metadata = {
  title: "Pusat Sertifikat",
};

export default async function CertificatePage() {
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
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Legitimasi"
        title="Pusat Sertifikasi PPSI"
        description="Validasi sertifikat anggota dengan kode QR dan pantau status verifikasi."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <CertificateCard key={certificate.id} {...certificate} />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <PCard>
          <PCardHeader>
            <PCardTitle>Verifikasi Sertifikat</PCardTitle>
          </PCardHeader>
          <PCardContent className="space-y-3 text-sm text-ink/70">
            <p>Masukkan nomor sertifikat untuk memastikan keaslian.</p>
            <PInput placeholder="Contoh: PPSI-CERT-001" />
            <PButton className="w-full">Periksa</PButton>
          </PCardContent>
        </PCard>
        <QRCard value={certificates[0]?.qr ?? "PPSI"} label="QR contoh" />
      </div>
    </div>
  );
}
