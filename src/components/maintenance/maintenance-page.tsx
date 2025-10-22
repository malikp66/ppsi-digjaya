'use client';

import Link from "next/link";
import { useEffect, useMemo, useState, type ElementType } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Youtube,
} from "lucide-react";

type MaintenancePageProps = {
  deadline: string;
};

type Countdown = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const ZERO_STATE: Countdown = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

export function MaintenancePage({ deadline }: MaintenancePageProps) {
  const targetTime = useMemo(() => new Date(deadline).getTime(), [deadline]);
  const [countdown, setCountdown] = useState<Countdown>(ZERO_STATE);

  useEffect(() => {
    function updateCountdown() {
      const now = Date.now();
      const diff = Math.max(targetTime - now, 0);
      if (!Number.isFinite(diff) || diff <= 0) {
        setCountdown(ZERO_STATE);
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setCountdown({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    }

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, [targetTime]);

  const isPastDeadline = targetTime <= Date.now();

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-foreground"
      style={{
        backgroundImage: "url('/silat.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,13,18,0.85)_0%,rgba(8,13,18,0.92)_35%,rgba(8,13,18,0.9)_100%)]" />
      <div className="relative z-10 flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 sm:px-12 lg:px-16">
        <header className="flex items-center justify-between text-xs uppercase tracking-[0.5rem] text-primary/80 sm:text-sm">
          <span className="font-semibold">PPSI DIGJAYA</span>
          <nav className="flex gap-6 text-[0.7rem] tracking-[0.35rem] text-muted-foreground sm:text-xs">
            {/* <Link className="transition-colors hover:text-primary" href="#about">
              About
            </Link>
            <Link
              className="transition-colors hover:text-primary"
              href="#contact"
            >
              Contact
            </Link> */}
          </nav>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center gap-8 text-center text-sm sm:text-base">
          <div className="space-y-5 sm:space-y-7">
            <p className="text-xs uppercase tracking-[0.65rem] text-primary/70 sm:text-sm">
              Under Development
            </p>
            <h1 className="text-4xl font-semibold uppercase tracking-[0.8rem] text-primary drop-shadow md:text-6xl">
              Coming Soon
            </h1>
            <p className="mx-auto max-w-2xl text-balance text-muted-foreground">
              Kami sedang menyiapkan pengalaman digital terbaru. Tetap terhubung
              dan aktifkan pengingat agar tidak melewatkan peluncuran demo pada
              16 November 2025.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {(
              [
                ["Days", countdown.days],
                ["Hours", countdown.hours],
                ["Minutes", countdown.minutes],
                ["Seconds", countdown.seconds],
              ] as const
            ).map(([label, value]) => (
              <div
                key={label}
                className="flex min-w-[110px] flex-col items-center rounded-lg border border-white/10 bg-white/5 px-6 py-4 text-primary backdrop-blur"
              >
                <span className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {value}
                </span>
                <span className="mt-1 text-xs uppercase tracking-[0.4rem] text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <Button
            className="flex items-center gap-2 rounded-full border border-primary/70 bg-transparent px-8 py-3 text-primary hover:border-primary hover:bg-primary/10"
            variant="outline"
            asChild
          >
            <Link href="mailto:yessikurniawan@gmail.com">
              <Mail className="h-4 w-4" />
              Notify Me
            </Link>
          </Button>

          {isPastDeadline && (
            <span className="text-xs uppercase tracking-[0.35rem] text-destructive">
              Maintenance window has ended.
            </span>
          )}
        </main>

        <footer className="flex flex-col gap-6 pt-10 text-xs uppercase tracking-[0.35rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Website by PPSI Digjaya. All Rights Reserved.</span>
          <div className="flex items-center justify-center gap-5 text-primary">
            <SocialLink
              ariaLabel="Hubungi kami"
              href="tel:+628112119718"
              icon={Phone}
            />
            <SocialLink
              ariaLabel="Kirim email"
              href="mailto:yessikurniawan@gmail.com"
              icon={Mail}
            />
            {/* <SocialLink
              ariaLabel="Instagram"
              href="https://instagram.com"
              icon={Instagram}
            />
            <SocialLink
              ariaLabel="Facebook"
              href="https://facebook.com"
              icon={Facebook}
            />
            <SocialLink
              ariaLabel="Youtube"
              href="https://youtube.com"
              icon={Youtube}
            /> */}
          </div>
        </footer>
      </div>
    </div>
  );
}

type SocialLinkProps = {
  href: string;
  icon: ElementType;
  ariaLabel: string;
};

function SocialLink({ href, icon: Icon, ariaLabel }: SocialLinkProps) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      aria-label={ariaLabel}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-primary transition-colors hover:border-primary hover:bg-primary/10",
      )}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      <Icon className="h-4 w-4" />
    </Link>
  );
}
