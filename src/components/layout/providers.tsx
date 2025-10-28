"use client";

import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { useEffect } from "react";
import { PToastProvider } from "@/components/ui";
import idMessages from "@/messages/id.json";
import suMessages from "@/messages/su.json";
import { useUIStore } from "@/lib/stores/ui-store";

const messagesMap: Record<string, Record<string, unknown>> = {
  id: idMessages,
  su: suMessages,
};

export const Providers = ({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: "id" | "su";
}) => {
  const { language, setLanguage } = useUIStore();
  useEffect(() => {
    if (initialLocale) {
      setLanguage(initialLocale);
    }
  }, [initialLocale, setLanguage]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (process.env.NEXT_PUBLIC_PWA_ENABLED !== "true") return;
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .catch((error) => console.warn("SW registration failed", error));
    }
  }, []);
  const messages = messagesMap[initialLocale ?? language] ?? idMessages;

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <NextIntlClientProvider
        locale={initialLocale ?? language}
        messages={messages}
      >
        <PToastProvider>{children}</PToastProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
};
