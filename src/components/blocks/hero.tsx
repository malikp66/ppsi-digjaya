"use client";

import { useEffect, useRef } from "react";
import { PButton } from "@/components/ui";
import { useGSAP } from "@/lib/hooks/use-gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";
import { useTranslations } from "next-intl";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gsap = useGSAP();
  const prefersReducedMotion = usePrefersReducedMotion();
  const t = useTranslations("hero");

  useEffect(() => {
    if (!gsap || !containerRef.current || prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 24,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.from(".hero-buttons", {
        y: 18,
        opacity: 0,
        delay: 0.2,
        duration: 0.45,
        ease: "power2.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [gsap, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden rounded-[28px] bg-heritage/80 px-6 py-16 text-white shadow-soft md:px-12"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.svg"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-heritage/80 via-forest/70 to-transparent" />
      <div className="relative z-10 max-w-2xl space-y-6">
        <h1 className="hero-title font-display text-4xl leading-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="text-lg text-white/80 md:text-xl">{t("subtitle")}</p>
        <div className="hero-buttons flex flex-wrap gap-4">
          <PButton asChild>
            <a href="#culture">{t("explore")}</a>
          </PButton>
          <PButton variant="outline" className="text-white" asChild>
            <a href="/join">{t("join")}</a>
          </PButton>
        </div>
      </div>
    </section>
  );
};
