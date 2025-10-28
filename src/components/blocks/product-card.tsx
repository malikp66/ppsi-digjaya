import Image from "next/image";
import { PButton, PCard, PCardContent, PCardHeader, PCardTitle, PBadge } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";

export const ProductCard = ({
  title,
  price,
  category,
  seller,
  image,
}: {
  title: string;
  price: number;
  category: string;
  seller: string;
  image: string;
}) => (
  <PCard>
    <PCardHeader className="space-y-3">
      <div className="relative h-48 w-full overflow-hidden rounded-2xl">
        <Image src={image} alt={title} fill sizes="100vw" className="object-cover" />
      </div>
      <PBadge variant="outline">{category}</PBadge>
      <PCardTitle>{title}</PCardTitle>
      <p className="text-sm text-ink/60">{seller}</p>
    </PCardHeader>
    <PCardContent className="flex items-center justify-between">
      <span className="text-xl font-semibold text-heritage">
        {formatCurrency(price)}
      </span>
      <PButton variant="primary">Tambah ke keranjang</PButton>
    </PCardContent>
  </PCard>
);
