import { MetricCard, MemberProfileCard, MapWidget } from "@/components/blocks";
import { AnalyticsCharts } from "@/components/charts/analytics-charts";
import { fetchMock } from "@/lib/api";
import { Users, Award, MapPin } from "lucide-react";
import { PCard, PCardContent, PCardHeader, PCardTitle } from "@/components/ui";

export default async function DashboardPage() {
  const members = await fetchMock<
    {
      id: string;
      name: string;
      dojo: string;
      rank: string;
      achievements: string[];
      badges: string[];
      avatar: string;
    }[]
  >("members");
  const analytics = await fetchMock<{
    memberGrowth: { label: string; value: number }[];
    rankDistribution: { label: string; value: number }[];
    finance: { label: string; value: number }[];
    certificates: number;
    activeDojos: number;
  }>("analytics");
  const dojos = await fetchMock<
    { id: string; name: string; members: number; coordinates: [number, number] }[]
  >("dojos");

  return (
    <div className="space-y-8">
      <section className="grid gap-6 md:grid-cols-3">
        <MetricCard
          icon={Users}
          label="Total Anggota"
          value={`${analytics.memberGrowth.at(-1)?.value ?? 0}`}
          helper="Terhubung secara digital"
        />
        <MetricCard
          icon={Award}
          label="Sertifikat"
          value={`${analytics.certificates}`}
          helper="Butuh pembaruan 12 anggota"
        />
        <MetricCard
          icon={MapPin}
          label="Perguruan"
          value={`${analytics.activeDojos}`}
          helper="Aktif melaporkan kegiatan"
        />
      </section>
      <AnalyticsCharts
        memberGrowth={analytics.memberGrowth}
        rankDistribution={analytics.rankDistribution}
        finance={analytics.finance}
      />
      <section className="grid gap-6 lg:grid-cols-2">
        <MapWidget
          clusters={dojos.map((dojo) => ({
            id: dojo.id,
            name: dojo.name,
            members: dojo.members,
            coordinates: dojo.coordinates,
          }))}
        />
        <PCard>
          <PCardHeader>
            <PCardTitle>Badge Sorotan</PCardTitle>
          </PCardHeader>
          <PCardContent className="grid gap-4">
            {members.slice(0, 2).map((member) => (
              <MemberProfileCard key={member.id} {...member} />
            ))}
          </PCardContent>
        </PCard>
      </section>
    </div>
  );
}
