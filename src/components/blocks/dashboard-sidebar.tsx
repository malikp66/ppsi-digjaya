"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Ringkasan" },
  { href: "/dashboard/members", label: "Anggota" },
  { href: "/dashboard/map", label: "Peta" },
  { href: "/dashboard/analytics", label: "Analitik" },
  { href: "/dashboard/certifications", label: "Sertifikasi" }
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <aside className="sticky top-24 hidden w-64 flex-col gap-4 rounded-3xl bg-white/80 p-6 shadow-soft backdrop-blur lg:flex">
      <button
        className="mb-4 flex items-center gap-2 text-sm font-semibold text-heritage"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Menu size={16} /> Menu
      </button>
      <nav className={cn("flex flex-col gap-2", !open && "hidden")}
    >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-medium",
              pathname === item.href
                ? "bg-forest text-white shadow-soft"
                : "text-ink/70 hover:bg-heritage/10 hover:text-heritage",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
