import { cn } from "@/lib/utils";

export const SectionHeader = ({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) => (
  <div className={cn("space-y-2 text-center", className)}>
    {eyebrow ? (
      <p className="text-xs uppercase tracking-[0.3em] text-prestige">
        {eyebrow}
      </p>
    ) : null}
    <h2 className="font-display text-3xl text-heritage">{title}</h2>
    {description ? (
      <p className="text-sm text-ink/70 md:text-base">{description}</p>
    ) : null}
  </div>
);
