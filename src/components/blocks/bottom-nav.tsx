"use client";

import Link from "next/link";
import { Home, Users, Map, LineChart, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", icon: Home, label: "Beranda" },
  { href: "/dashboard/members", icon: Users, label: "Anggota" },
  { href: "/dashboard/map", icon: Map, label: "Peta" },
  { href: "/dashboard/analytics", icon: LineChart, label: "Data" },
  { href: "/dashboard/certifications", icon: Shield, label: "Sertif" }
];

export const BottomNav = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-4 left-1/2 z-overlay w-[92%] max-w-xl -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 shadow-soft backdrop-blur lg:hidden">
      <ul className="flex items-center justify-between text-xs">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-full px-3 py-1",
                  active ? "text-forest" : "text-ink/60",
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
