import path from "node:path";
import { promises as fs } from "node:fs";

type Messages = Record<string, unknown>;

async function loadMessages(locale: string): Promise<Messages> {
  const filePath = path.join(process.cwd(), "src/messages", `${locale}.json`);
  const file = await fs.readFile(filePath, "utf-8");
  return JSON.parse(file) as Messages;
}

function resolveMessage(messages: Messages, key: string): string {
  const parts = key.split(".");
  let current: Messages | string | undefined = messages;
  for (const part of parts) {
    if (typeof current === "string") break;
    current = current?.[part] as Messages | string | undefined;
  }
  return typeof current === "string" ? current : key;
}

export async function getMessages(locale: string) {
  return loadMessages(locale);
}

export async function getTranslator({
  locale,
  namespace,
}: {
  locale: string;
  namespace?: string;
}) {
  const messages = await loadMessages(locale);
  return (key: string, values?: Record<string, string | number>) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    let message = resolveMessage(messages, fullKey);
    if (values) {
      Object.entries(values).forEach(([token, value]) => {
        message = message.replaceAll(`{${token}}`, String(value));
      });
    }
    return message;
  };
}
