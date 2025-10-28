import { fetchMock } from "@/lib/api";
import { AnalyticsCharts } from "@/components/charts/analytics-charts";
import { PCard, PCardHeader, PCardTitle, PCardContent } from "@/components/ui";

export default async function AdminAnalyticsPage() {
  const analytics = await fetchMock<{
    memberGrowth: { label: string; value: number }[];
    rankDistribution: { label: string; value: number }[];
    finance: { label: string; value: number }[];
    certificates: number;
  }>("analytics");

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl text-heritage">Analitik Organisasi</h1>
      <AnalyticsCharts
        memberGrowth={analytics.memberGrowth}
        rankDistribution={analytics.rankDistribution}
        finance={analytics.finance}
      />
      <PCard>
        <PCardHeader>
          <PCardTitle>Pusat Laporan</PCardTitle>
        </PCardHeader>
        <PCardContent className="space-y-2 text-sm text-ink/70">
          <p>• Feedback anggota: 28 tiket terbuka</p>
          <p>• Pelanggaran kode etik: 0 laporan aktif</p>
          <p>• Dokumen menunggu persetujuan: 4 file</p>
        </PCardContent>
      </PCard>
    </div>
  );
}
