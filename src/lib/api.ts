import { sleep } from "./utils";

type Endpoint =
  | "members"
  | "dojos"
  | "courses"
  | "certificates"
  | "products"
  | "donations"
  | "events"
  | "testimonials"
  | "stories"
  | "finance"
  | "analytics";

const cache = new Map<string, unknown>();

async function loadFixture(endpoint: Endpoint) {
  if (cache.has(endpoint)) {
    return cache.get(endpoint);
  }
  const data = await import(`@/data/fixtures/${endpoint}.json`).then(
    (module) => module.default,
  );
  cache.set(endpoint, data);
  return data;
}

export async function fetchMock<T>(endpoint: Endpoint): Promise<T> {
  await sleep(350 + Math.random() * 200);
  const data = await loadFixture(endpoint);
  return data as T;
}

export async function fetchMockById<T extends { id: string }>(
  endpoint: Endpoint,
  id: string,
): Promise<T | null> {
  const data = (await fetchMock<T[]>(endpoint)) || [];
  return data.find((item) => item.id === id) ?? null;
}
