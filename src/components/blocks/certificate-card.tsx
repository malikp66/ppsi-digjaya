import { PBadge, PCard, PCardContent, PCardHeader, PCardTitle, PProgress } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export const CertificateCard = ({
  holder,
  level,
  issuedAt,
  validUntil,
  status = "Aktif",
}: {
  holder: string;
  level: string;
  issuedAt: string;
  validUntil: string;
  status?: string;
}) => (
  <PCard className="bg-[url('/images/paper-texture.svg')] bg-cover bg-center">
    <PCardHeader>
      <PBadge variant="gold">Sertifikat Resmi</PBadge>
      <PCardTitle className="mt-2 text-2xl">{holder}</PCardTitle>
      <p className="text-sm text-ink/60">{level}</p>
    </PCardHeader>
    <PCardContent className="space-y-4 text-sm text-ink/70">
      <div className="flex flex-wrap gap-3">
        <span className="rounded-full bg-heritage/10 px-3 py-1">
          Diterbitkan: {formatDate(issuedAt)}
        </span>
        <span className="rounded-full bg-prestige/10 px-3 py-1">
          Berlaku hingga: {formatDate(validUntil)}
        </span>
        <span className="rounded-full bg-forest/10 px-3 py-1 text-forest">{status}</span>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-ink/50">
          Keaslian
        </p>
        <PProgress value={94} />
      </div>
    </PCardContent>
  </PCard>
);
