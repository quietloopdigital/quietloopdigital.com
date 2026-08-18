import { NextResponse } from "next/server";

/**
 * Liveness/readiness probe. Kept deliberately dumb — no DB, no external
 * calls — so it answers even if something downstream is unhealthy, and a
 * failed response means "the Next.js process itself is not serving
 * requests," not "some dependency is slow."
 */
export async function GET() {
  return NextResponse.json(
    { status: "ok", service: "quietloopdigital.com", time: new Date().toISOString() },
    { status: 200 },
  );
}
