"use client";

import React from "react";

type Messages = Record<string, string | Messages>;

type IntlContextValue = {
  locale: string;
  messages: Messages;
};

const IntlContext = React.createContext<IntlContextValue | undefined>(undefined);

export const NextIntlClientProvider = ({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Messages;
}) => {
  const value = React.useMemo(() => ({ locale, messages }), [locale, messages]);
  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
};

function getMessage(messages: Messages, key: string): string {
  const parts = key.split(".");
  let current: Messages | string | undefined = messages;
  for (const part of parts) {
    if (typeof current === "string") break;
    current = current?.[part];
  }
  return typeof current === "string" ? current : key;
}

export const useTranslations = (namespace?: string) => {
  const context = React.useContext(IntlContext);
  if (!context) {
    throw new Error("useTranslations must be used within NextIntlClientProvider");
  }
  return (key: string, values?: Record<string, string | number>) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    let message = getMessage(context.messages, fullKey);
    if (values) {
      Object.entries(values).forEach(([token, value]) => {
        message = message.replaceAll(`{${token}}`, String(value));
      });
    }
    return message;
  };
};

export const useLocale = () => {
  const context = React.useContext(IntlContext);
  if (!context) {
    throw new Error("useLocale must be used within NextIntlClientProvider");
  }
  return context.locale;
};
