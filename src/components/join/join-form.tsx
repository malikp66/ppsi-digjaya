"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PCard, PCardContent, PCardHeader, PCardTitle, PInput, PButton, PProgress, PSelect } from "@/components/ui";
import { useToast } from "@/components/ui/p-toast";

const schema = z.object({
  name: z.string().nonempty("Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  dojo: z.string().nonempty("Pilih perguruan"),
  belt: z.string().nonempty("Pilih sabuk"),
  city: z.string().nonempty("Kota wajib diisi"),
  profession: z.string().nonempty("Profesi wajib diisi"),
  interest: z.string().nonempty("Minat wajib diisi"),
});

type FormValues = z.infer<typeof schema>;

const steps = [
  {
    id: 1,
    title: "Data Pribadi",
    fields: ["name", "email"],
  },
  {
    id: 2,
    title: "Perguruan & Sabuk",
    fields: ["dojo", "belt"],
  },
  {
    id: 3,
    title: "Lokasi",
    fields: ["city"],
  },
  {
    id: 4,
    title: "Profesional & Minat",
    fields: ["profession", "interest"],
  },
];

const dojoOptions = [
  { label: "Padepokan Gajah Putih", value: "Padepokan Gajah Putih" },
  { label: "Sasana Ligar", value: "Sasana Ligar" },
  { label: "Pencak Rengganis", value: "Pencak Rengganis" },
];

const beltOptions = [
  { label: "Putih", value: "Putih" },
  { label: "Hijau", value: "Hijau" },
  { label: "Coklat", value: "Coklat" },
  { label: "Hitam", value: "Hitam" },
];

const labels: Record<keyof FormValues, string> = {
  name: "Nama Lengkap",
  email: "Email",
  dojo: "Perguruan",
  belt: "Tingkat Sabuk",
  city: "Kota Domisili",
  profession: "Profesi",
  interest: "Minat",
};

export const JoinForm = () => {
  const { push } = useToast();
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      dojo: dojoOptions[0].value,
      belt: beltOptions[0].value,
      city: "",
      profession: "",
      interest: "",
    },
    resolver: zodResolver(schema),
  });
  const [step, setStep] = useState(0);

  const currentStep = steps[step];
  const progress = Math.round(((step + 1) / steps.length) * 100);

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prev = () => setStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = (values: FormValues) => {
    push({
      title: "Pendaftaran diterima",
      description: `${values.name} akan dihubungi oleh admin PPSI`,
      variant: "success",
    });
    form.reset();
    setStep(0);
  };

  return (
    <PCard>
      <PCardHeader>
        <PCardTitle>Gabung PPSI</PCardTitle>
        <p className="text-sm text-ink/60">Isi data untuk bergabung sebagai anggota digital PPSI.</p>
      </PCardHeader>
      <PCardContent className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink/50">
            Langkah {step + 1} dari {steps.length}
          </p>
          <PProgress value={progress} />
        </div>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {currentStep.fields.map((field) => (
            <div key={field} className="space-y-2 text-sm">
              <label className="font-semibold text-heritage" htmlFor={field}>
                {labels[field as keyof FormValues]}
              </label>
              {field === "dojo" ? (
                <PSelect
                  id={field}
                  options={dojoOptions}
                  value={form.watch("dojo")}
                  onChange={(event) => form.setValue("dojo", event.target.value)}
                />
              ) : field === "belt" ? (
                <PSelect
                  id={field}
                  options={beltOptions}
                  value={form.watch("belt")}
                  onChange={(event) => form.setValue("belt", event.target.value)}
                />
              ) : (
                <PInput
                  id={field}
                  placeholder={`Masukkan ${field}`}
                  {...form.register(field as keyof FormValues)}
                />
              )}
              {form.formState.errors[field as keyof FormValues] ? (
                <p className="text-xs text-accent">
                  {form.formState.errors[field as keyof FormValues]?.message as string}
                </p>
              ) : null}
            </div>
          ))}
          <div className="flex justify-between">
            <PButton type="button" variant="outline" onClick={prev} disabled={step === 0}>
              Kembali
            </PButton>
            {step === steps.length - 1 ? (
              <PButton type="submit">Kirim</PButton>
            ) : (
              <PButton type="button" onClick={next}>
                Lanjut
              </PButton>
            )}
          </div>
        </form>
      </PCardContent>
    </PCard>
  );
};
