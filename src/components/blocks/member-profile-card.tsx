import Image from "next/image";
import { PBadge, PCard, PCardContent, PCardHeader, PCardTitle } from "@/components/ui";

export const MemberProfileCard = ({
  name,
  dojo,
  rank,
  achievements,
  badges,
  avatar,
}: {
  name: string;
  dojo: string;
  rank: string;
  achievements: string[];
  badges: string[];
  avatar: string;
}) => (
  <PCard className="flex flex-col items-center text-center">
    <PCardHeader className="flex flex-col items-center gap-3">
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-prestige shadow-soft">
        <Image src={avatar} alt={name} fill sizes="96px" className="object-cover" />
      </div>
      <PCardTitle>{name}</PCardTitle>
      <p className="text-sm text-ink/60">{dojo}</p>
      <PBadge variant="outline">{rank}</PBadge>
    </PCardHeader>
    <PCardContent className="space-y-3 text-sm text-ink/70">
      <div className="flex flex-wrap justify-center gap-2">
        {badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full bg-prestige/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-heritage"
          >
            {badge}
          </span>
        ))}
      </div>
      <ul className="space-y-1">
        {achievements.map((achievement) => (
          <li key={achievement}>• {achievement}</li>
        ))}
      </ul>
    </PCardContent>
  </PCard>
);
