"use client";

import { useState } from "react";
import { PCard, PCardContent, PCardHeader, PCardTitle, PInput, PButton, PBadge } from "@/components/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchMock } from "@/lib/api";
import { formatDate } from "@/lib/utils";

const schema = z.object({
  number: z.string().nonempty("Nomor sertifikat wajib diisi"),
});

type Certificate = {
  id: string;
  holder: string;
  level: string;
  issuedAt: string;
  validUntil: string;
  qr: string;
};

export default function VerifyPage() {
  const form = useForm<{ number: string }>({
    defaultValues: { number: "" },
    resolver: zodResolver(schema),
  });
  const [result, setResult] = useState<Certificate | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: { number: string }) => {
    const data = await fetchMock<Certificate[]>("certificates");
    const found = data.find((certificate) => certificate.id === values.number);
    if (found) {
      setResult(found);
      setError(null);
    } else {
      setResult(null);
      setError("Sertifikat tidak ditemukan");
    }
  };

  return (
    <div className="space-y-8">
      <PCard>
        <PCardHeader>
          <PCardTitle>Verifikasi Sertifikat PPSI</PCardTitle>
        </PCardHeader>
        <form
          className="space-y-4 p-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-heritage">Nomor Sertifikat</label>
            <PInput
              placeholder="Misal: cert-001"
              {...form.register("number")}
            />
            {form.formState.errors.number ? (
              <p className="text-xs text-accent">{form.formState.errors.number.message}</p>
            ) : null}
          </div>
          <PButton type="submit" className="w-full">
            Verifikasi
          </PButton>
        </form>
      </PCard>
      {result ? (
        <PCard className="bg-white/90">
          <PCardHeader>
            <PCardTitle>{result.holder}</PCardTitle>
            <p className="text-sm text-ink/60">{result.level}</p>
          </PCardHeader>
          <PCardContent className="space-y-2 text-sm text-ink/70">
            <p>Diterbitkan: {formatDate(result.issuedAt)}</p>
            <p>Berlaku hingga: {formatDate(result.validUntil)}</p>
            <PBadge variant="gold">Valid</PBadge>
          </PCardContent>
        </PCard>
      ) : null}
      {error ? <p className="text-sm text-accent">{error}</p> : null}
    </div>
  );
}
