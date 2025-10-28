"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Sun, MoonStar } from "lucide-react";
import { useState } from "react";
import { PButton } from "@/components/ui";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/lib/stores/ui-store";

const links = [
  { href: "/", labelKey: "nav.home" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/culture", labelKey: "nav.culture" },
  { href: "/training", labelKey: "nav.training" },
  { href: "/certificates", labelKey: "nav.certificates" },
  { href: "/market", labelKey: "nav.market" },
  { href: "/admin", labelKey: "nav.admin" },
];

export const TopNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const { setLanguage, language } = useUIStore();

  return (
    <header className="sticky top-0 z-header border-b border-white/10 bg-white/80 backdrop-blur dark:bg-black/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest text-lg font-bold text-white shadow-soft">
            PPSI
          </span>
          <div>
            <p className="font-display text-lg text-heritage dark:text-prestige">
              PPSI Digjaya
            </p>
            <p className="text-xs text-ink/60">Pelestarian Silat Digital</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition",
                pathname === link.href
                  ? "bg-heritage/10 text-heritage shadow-soft"
                  : "text-ink/70 hover:text-heritage",
              )}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <button
            className="rounded-full bg-heritage/10 px-3 py-1 text-xs uppercase tracking-wide text-heritage focus-ring"
            onClick={() => {
              const nextLocale = language === "id" ? "su" : "id";
              setLanguage(nextLocale);
              router.push(`/${nextLocale}${pathname.replace(/^\/[^/]+/, "") || ""}`);
            }}
          >
            {language.toUpperCase()}
          </button>
          <button
            className="rounded-full bg-heritage/10 p-2 text-heritage focus-ring"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <MoonStar size={18} />}
          </button>
          <PButton href="/join" asChild>
            <Link href="/join">{t("nav.join")}</Link>
          </PButton>
        </div>
        <button
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <Menu />
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-white/90 px-4 py-4 backdrop-blur md:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium",
                  pathname === link.href
                    ? "bg-heritage/10 text-heritage"
                    : "text-ink/70 hover:bg-heritage/10 hover:text-heritage",
                )}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-3">
            <button
              className="rounded-full bg-heritage/10 px-3 py-1 text-xs uppercase tracking-wide text-heritage"
              onClick={() => {
                const nextLocale = language === "id" ? "su" : "id";
                setLanguage(nextLocale);
                router.push(`/${nextLocale}${pathname.replace(/^\/[^/]+/, "") || ""}`);
              }}
            >
              {language.toUpperCase()}
            </button>
            <button
              className="rounded-full bg-heritage/10 p-2 text-heritage"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={18} /> : <MoonStar size={18} />}
            </button>
          </div>
          <PButton className="mt-3 w-full" asChild>
            <Link href="/join">{t("nav.join")}</Link>
          </PButton>
        </div>
      ) : null}
    </header>
  );
};
