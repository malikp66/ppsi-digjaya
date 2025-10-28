"use client";

import { useMemo, useState } from "react";
import { PTabs, FilterPanel, PCard, PCardHeader, PCardTitle, PCardContent, PButton } from "@/components/ui";
import { FilterOption } from "@/components/blocks";
import Link from "next/link";

export type Story = {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  region: string;
  era: string;
  school: string;
  summary: string;
  thumbnail: string;
};

type Props = {
  stories: Story[];
};

const tabOptions = [
  { value: "origin", label: "Asal Usul & Tokoh" },
  { value: "achievements", label: "Prestasi Silat" },
  { value: "videos", label: "Video Arsip" },
  { value: "scripts", label: "Naskah & Filosofi" },
];

export const CultureView = ({ stories }: Props) => {
  const [tab, setTab] = useState("origin");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    category: "Semua",
    region: "Semua",
    era: "Semua",
  });

  const filters: FilterOption[] = [
    {
      id: "category",
      label: "Kategori",
      options: [
        { label: "Semua", value: "Semua" },
        ...Array.from(new Set(stories.map((story) => story.category))).map((value) => ({
          label: value,
          value,
        })),
      ],
    },
    {
      id: "region",
      label: "Wilayah",
      options: [
        { label: "Semua", value: "Semua" },
        ...Array.from(new Set(stories.map((story) => story.region))).map((value) => ({
          label: value,
          value,
        })),
      ],
    },
    {
      id: "era",
      label: "Era",
      options: [
        { label: "Semua", value: "Semua" },
        ...Array.from(new Set(stories.map((story) => story.era))).map((value) => ({
          label: value,
          value,
        })),
      ],
    },
  ];

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchCategory =
        filterValues.category === "Semua" || story.category === filterValues.category;
      const matchRegion =
        filterValues.region === "Semua" || story.region === filterValues.region;
      const matchEra = filterValues.era === "Semua" || story.era === filterValues.era;
      return matchCategory && matchRegion && matchEra;
    });
  }, [stories, filterValues]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <PTabs tabs={tabOptions} value={tab} onValueChange={setTab}>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredStories.map((story) => (
              <PCard key={story.id} className="text-left">
                <PCardHeader>
                  <PCardTitle>{story.title}</PCardTitle>
                  <p className="text-xs text-ink/50">
                    {story.author} • {story.region}
                  </p>
                </PCardHeader>
                <PCardContent className="space-y-3 text-sm text-ink/70">
                  <p>{story.summary}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span>{story.category}</span>
                    <span>{story.era}</span>
                  </div>
                  <PButton variant="outline" asChild>
                    <Link href={`./${story.id}`}>Baca selengkapnya</Link>
                  </PButton>
                </PCardContent>
              </PCard>
            ))}
          </div>
        </PTabs>
      </div>
      <FilterPanel
        filters={filters}
        values={filterValues}
        onChange={(id, value) => setFilterValues((prev) => ({ ...prev, [id]: value }))}
      />
    </div>
  );
};
