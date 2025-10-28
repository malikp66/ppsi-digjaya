import { fetchMock } from "@/lib/api";
import { MapWidget } from "@/components/blocks";
import { PCard, PCardHeader, PCardTitle, PCardContent } from "@/components/ui";

export default async function MapPage() {
  const dojos = await fetchMock<
    { id: string; name: string; members: number; coordinates: [number, number]; region: string }[]
  >("dojos");

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-heritage">Peta Perguruan</h1>
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
          <PCardTitle>Rangkuman Wilayah</PCardTitle>
        </PCardHeader>
        <PCardContent className="space-y-2 text-sm text-ink/70">
          {dojos.map((dojo) => (
            <div key={dojo.id} className="flex items-center justify-between">
              <span>{dojo.name}</span>
              <span>{dojo.region} • {dojo.members} anggota</span>
            </div>
          ))}
        </PCardContent>
      </PCard>
    </div>
  );
}
