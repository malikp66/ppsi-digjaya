import { NextResponse } from "next/server";

const allowedResources = new Set([
  "members",
  "dojos",
  "courses",
  "certificates",
  "products",
  "donations",
  "events",
  "testimonials",
  "stories",
  "finance",
  "analytics",
]);

export async function GET(
  _request: Request,
  { params }: { params: { resource: string } },
) {
  const { resource } = params;
  if (!allowedResources.has(resource)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const data = await import(`@/data/fixtures/${resource}.json`).then(
    (module) => module.default,
  );
  return NextResponse.json({ data });
}
