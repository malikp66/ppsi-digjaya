import { clamp, cn } from "@/lib/utils";

export const PProgress = ({ value }: { value: number }) => {
  const safe = clamp(value, 0, 100);
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-heritage/10">
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-forest to-prestige transition-all",
        )}
        style={{ width: `${safe}%` }}
      />
    </div>
  );
};
