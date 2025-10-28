"use client";

import { PCard, PCardContent, PCardHeader, PCardTitle, PSelect } from "@/components/ui";

export type FilterOption = {
  id: string;
  label: string;
  options: { label: string; value: string }[];
};

export const FilterPanel = ({
  filters,
  values,
  onChange,
}: {
  filters: FilterOption[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
}) => (
  <PCard className="sticky top-28">
    <PCardHeader>
      <PCardTitle>Filter</PCardTitle>
    </PCardHeader>
    <PCardContent className="space-y-4">
      {filters.map((filter) => (
        <label key={filter.id} className="space-y-2 text-sm">
          <span className="font-medium text-heritage">{filter.label}</span>
          <PSelect
            options={filter.options}
            value={values[filter.id] ?? filter.options[0]?.value}
            onChange={(event) => onChange(filter.id, event.target.value)}
          />
        </label>
      ))}
    </PCardContent>
  </PCard>
);
