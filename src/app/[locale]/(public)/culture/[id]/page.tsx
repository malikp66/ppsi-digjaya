import { notFound } from "next/navigation";
import { fetchMockById } from "@/lib/api";
import { SectionHeader } from "@/components/blocks";
import { PCard, PCardContent, PCardHeader, PCardTitle, PBadge } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export default async function CultureDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const story = await fetchMockById<{
    id: string;
    title: string;
    author: string;
    date: string;
    category: string;
    region: string;
    era: string;
    school: string;
    body: string;
  }>("stories", params.id);

  if (!story) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow={story.category}
        title={story.title}
        description={`${story.author} • ${formatDate(story.date)}`}
      />
      <div className="flex flex-wrap gap-3 text-sm text-ink/60">
        <PBadge variant="outline">{story.region}</PBadge>
        <PBadge variant="outline">{story.era}</PBadge>
        <PBadge variant="outline">{story.school}</PBadge>
      </div>
      <PCard>
        <PCardHeader>
          <PCardTitle>Ringkasan</PCardTitle>
        </PCardHeader>
        <PCardContent className="space-y-4 text-sm leading-relaxed text-ink/80">
          <p>{story.body}</p>
          <p>
            Versi Basa Sunda:
            <br />
            {story.body.replace("PPSI", "PPSI (Basa Sunda)")}
          </p>
        </PCardContent>
      </PCard>
    </div>
  );
}
