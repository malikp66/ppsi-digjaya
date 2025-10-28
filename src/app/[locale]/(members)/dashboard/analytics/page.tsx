import { fetchMock } from "@/lib/api";
import { AnalyticsCharts } from "@/components/charts/analytics-charts";
import { PCard, PCardHeader, PCardTitle, PCardContent } from "@/components/ui";

export default async function MemberAnalyticsPage() {
  const analytics = await fetchMock<{
    memberGrowth: { label: string; value: number }[];
    rankDistribution: { label: string; value: number }[];
    finance: { label: string; value: number }[];
  }>("analytics");

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-heritage">Analitik Keanggotaan</h1>
      <AnalyticsCharts
        memberGrowth={analytics.memberGrowth}
        rankDistribution={analytics.rankDistribution}
        finance={analytics.finance}
      />
      <PCard>
        <PCardHeader>
          <PCardTitle>Insight</PCardTitle>
        </PCardHeader>
        <PCardContent className="space-y-2 text-sm text-ink/70">
          <p>• Pertumbuhan anggota stabil 10% per kuartal.</p>
          <p>• Sabuk hijau mendominasi (30%) memerlukan program akselerasi.</p>
          <p>• Dana pelatihan meningkat setelah digitalisasi.</p>
        </PCardContent>
      </PCard>
    </div>
  );
}
