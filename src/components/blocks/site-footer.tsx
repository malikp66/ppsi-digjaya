import Link from "next/link";
import { useTranslations } from "next-intl";

const quickLinks = [
  { href: "/culture", label: "Arsip Budaya" },
  { href: "/training", label: "Pelatihan Digital" },
  { href: "/dashboard", label: "Dasbor Anggota" },
  { href: "/market", label: "Marketplace" }
];

export const SiteFooter = () => {
  const t = useTranslations("footer");
  return (
    <footer className="mt-16 border-t border-heritage/10 bg-heritage/5">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <h4 className="font-display text-lg text-heritage">{t("tagline")}</h4>
          <p className="text-sm text-ink/70">
            Platform terpadu untuk anggota, pengurus, dan pemerhati pencak silat
            Jawa Barat.
          </p>
        </div>
        <div>
          <h5 className="text-sm font-semibold uppercase tracking-wide text-heritage">
            {t("contact")}
          </h5>
          <ul className="mt-3 space-y-2 text-sm text-ink/80">
            <li>{t("email")}</li>
            <li>{t("phone")}</li>
            <li>@ppsiofficial</li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm font-semibold uppercase tracking-wide text-heritage">
            {t("links")}
          </h5>
          <ul className="mt-3 space-y-2 text-sm text-ink/80">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-heritage">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
          <p className="text-sm font-semibold text-heritage">
            Tetap terhubung
          </p>
          <p className="mt-2 text-sm text-ink/70">
            Dapatkan kabar latihan, festival budaya, dan pelatihan daring terbaru.
          </p>
          <form className="mt-4 space-y-3">
            <input
              type="email"
              placeholder="Email Anda"
              className="h-11 w-full rounded-full border border-heritage/20 bg-white/90 px-4 text-sm focus:border-prestige focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white shadow-soft"
            >
              Langganan
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-ink/60">
        © {new Date().getFullYear()} PPSI Digjaya. All rights reserved.
      </div>
    </footer>
  );
};
