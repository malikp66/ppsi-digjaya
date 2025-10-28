import { formatCurrency } from "@/lib/utils";
import { PButton, PCard, PCardContent, PCardHeader, PCardTitle, PProgress } from "@/components/ui";

export const DonationCard = ({
  title,
  goal,
  collected,
  supporters,
  deadline,
}: {
  title: string;
  goal: number;
  collected: number;
  supporters: number;
  deadline: string;
}) => {
  const percentage = Math.round((collected / goal) * 100);
  return (
    <PCard>
      <PCardHeader>
        <PCardTitle>{title}</PCardTitle>
        <p className="text-xs uppercase tracking-wide text-ink/50">
          Dukungan: {supporters} orang
        </p>
      </PCardHeader>
      <PCardContent className="space-y-4 text-sm text-ink/70">
        <div>
          <PProgress value={percentage} />
          <div className="mt-2 flex justify-between text-xs">
            <span>{formatCurrency(collected)}</span>
            <span>Target {formatCurrency(goal)}</span>
          </div>
        </div>
        <p>Batas waktu: {deadline}</p>
        <PButton className="w-full">Donasi sekarang</PButton>
      </PCardContent>
    </PCard>
  );
};
