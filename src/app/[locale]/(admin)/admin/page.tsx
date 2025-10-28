import { SectionHeader, EventCard, DonationCard } from "@/components/blocks";
import { PCard, PCardHeader, PCardTitle, PCardContent, PButton } from "@/components/ui";
import { fetchMock } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

export default async function AdminPage() {
  const finance = await fetchMock<{
    income: { label: string; amount: number }[];
    expenses: { label: string; amount: number }[];
    balance: number;
  }>("finance");
  const events = await fetchMock<
    { id: string; title: string; date: string; location: string; description: string; status: string }[]
  >("events");
  const donations = await fetchMock<
    { id: string; title: string; goal: number; collected: number; supporters: number; deadline: string }[]
  >("donations");

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Administrasi"
        title="Dasbor Organisasi & Keuangan"
        description="Pantau struktur organisasi, dokumen penting, dan kesehatan finansial PPSI."
      />
      <section className="grid gap-6 md:grid-cols-2">
        <PCard>
          <PCardHeader>
            <PCardTitle>Profil Organisasi</PCardTitle>
          </PCardHeader>
          <PCardContent className="space-y-2 text-sm text-ink/70">
            <p>Alamat: Sekretariat PPSI, Bandung</p>
            <p>Email: sekretariat@ppsi.id</p>
            <p>Telepon: +62 812-3333-4444</p>
            <PButton variant="outline">Unduh Company Profile</PButton>
          </PCardContent>
        </PCard>
        <PCard>
          <PCardHeader>
            <PCardTitle>Dokumen Penting</PCardTitle>
          </PCardHeader>
          <PCardContent className="space-y-2 text-sm text-ink/70">
            <p>• Rencana Strategis 2025 (PDF)</p>
            <p>• SOP Sertifikasi Nasional (PDF)</p>
            <p>• Laporan Keuangan Triwulan (PDF)</p>
            <PButton variant="outline">Kelola Dokumen</PButton>
          </PCardContent>
        </PCard>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        <PCard>
          <PCardHeader>
            <PCardTitle>Pendapatan</PCardTitle>
          </PCardHeader>
          <PCardContent className="space-y-2 text-sm text-ink/70">
            {finance.income.map((item) => (
              <div key={item.label} className="flex justify-between">
                <span>{item.label}</span>
                <span>{formatCurrency(item.amount)}</span>
              </div>
            ))}
          </PCardContent>
        </PCard>
        <PCard>
          <PCardHeader>
            <PCardTitle>Pengeluaran</PCardTitle>
          </PCardHeader>
          <PCardContent className="space-y-2 text-sm text-ink/70">
            {finance.expenses.map((item) => (
              <div key={item.label} className="flex justify-between">
                <span>{item.label}</span>
                <span>{formatCurrency(item.amount)}</span>
              </div>
            ))}
          </PCardContent>
        </PCard>
        <PCard>
          <PCardHeader>
            <PCardTitle>Saldo</PCardTitle>
          </PCardHeader>
          <PCardContent className="text-2xl font-semibold text-heritage">
            {formatCurrency(finance.balance)}
          </PCardContent>
        </PCard>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-display text-2xl text-heritage">Event Terdekat</h3>
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
        <div className="space-y-4">
          <h3 className="font-display text-2xl text-heritage">Kampanye Donasi</h3>
          {donations.map((donation) => (
            <DonationCard key={donation.id} {...donation} />
          ))}
        </div>
      </section>
    </div>
  );
}
