import { Metadata } from "next";
import { ProductCard, DonationCard, SectionHeader } from "@/components/blocks";
import { fetchMock } from "@/lib/api";

export const metadata: Metadata = {
  title: "Marketplace & Dukungan Sosial",
};

export default async function MarketPage() {
  const products = await fetchMock<
    {
      id: string;
      title: string;
      price: number;
      category: string;
      seller: string;
      images: string[];
      description: string;
      stock: number;
    }[]
  >("products");
  const donations = await fetchMock<
    {
      id: string;
      title: string;
      goal: number;
      collected: number;
      supporters: number;
      deadline: string;
    }[]
  >("donations");

  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Ekonomi Kreatif"
        title="Marketplace & Donasi Sosial"
        description="Dukung atlet, pelatih, dan usaha komunitas melalui transaksi yang transparan."
      />
      <section className="space-y-6">
        <h3 className="font-display text-2xl text-heritage">Produk Unggulan</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              seller={product.seller}
              image={product.images[0] ?? "/images/products/placeholder.jpg"}
            />
          ))}
        </div>
      </section>
      <section className="space-y-6">
        <h3 className="font-display text-2xl text-heritage">Donasi Transparan</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {donations.map((donation) => (
            <DonationCard key={donation.id} {...donation} />
          ))}
        </div>
      </section>
    </div>
  );
}
