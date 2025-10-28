import { LucideIcon } from "lucide-react";
import { PCard, PCardContent, PCardHeader, PCardTitle } from "@/components/ui";

export const MetricCard = ({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  helper?: string;
}) => (
  <PCard className="relative overflow-hidden">
    <PCardHeader className="flex flex-row items-center justify-between">
      <div>
        <PCardTitle className="text-base text-heritage/80">{label}</PCardTitle>
        <p className="text-3xl font-semibold text-heritage">{value}</p>
      </div>
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest/90 text-white shadow-soft">
        <Icon size={22} />
      </span>
    </PCardHeader>
    {helper ? (
      <PCardContent>
        <p className="text-xs text-ink/60">{helper}</p>
      </PCardContent>
    ) : null}
  </PCard>
);
