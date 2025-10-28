import { CalendarDays } from "lucide-react";
import { PButton, PCard, PCardContent, PCardHeader, PCardTitle } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export const EventCard = ({
  title,
  date,
  location,
  description,
  status,
}: {
  title: string;
  date: string;
  location: string;
  description: string;
  status: string;
}) => (
  <PCard>
    <PCardHeader>
      <PCardTitle className="flex items-center gap-2 text-lg">
        <CalendarDays size={18} className="text-prestige" />
        {title}
      </PCardTitle>
      <p className="text-sm text-ink/60">{formatDate(date)}</p>
      <p className="text-sm text-ink/70">{location}</p>
    </PCardHeader>
    <PCardContent className="space-y-4 text-sm text-ink/70">
      <p>{description}</p>
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-heritage/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-heritage">
          {status}
        </span>
        <PButton variant="outline">Detail</PButton>
      </div>
    </PCardContent>
  </PCard>
);
