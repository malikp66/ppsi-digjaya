import type { ReactNode } from "react";
import { Providers } from "@/components/layout/providers";

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: "id" | "su" };
}) {
  return <Providers initialLocale={params.locale}>{children}</Providers>;
}
