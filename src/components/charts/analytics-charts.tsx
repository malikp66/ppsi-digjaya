import { AreaChart, BarChart, PieChart } from "recharts";
import { PCard, PCardHeader, PCardTitle } from "@/components/ui";

type Datum = { label: string; value: number };

type Props = {
  memberGrowth: Datum[];
  rankDistribution: Datum[];
  finance: Datum[];
};

export const AnalyticsCharts = ({ memberGrowth, rankDistribution, finance }: Props) => (
  <div className="grid gap-6 lg:grid-cols-3">
    <PCard className="lg:col-span-2">
      <PCardHeader>
        <PCardTitle>Pertumbuhan Anggota</PCardTitle>
      </PCardHeader>
      <AreaChart data={memberGrowth} height={260} />
    </PCard>
    <PCard>
      <PCardHeader>
        <PCardTitle>Distribusi Sabuk</PCardTitle>
      </PCardHeader>
      <PieChart data={rankDistribution} height={260} />
    </PCard>
    <PCard className="lg:col-span-3">
      <PCardHeader>
        <PCardTitle>Tren Keuangan</PCardTitle>
      </PCardHeader>
      <BarChart data={finance} height={260} />
    </PCard>
  </div>
);
