// src/lib/cors.ts
import { type NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = ["http://localhost:4000"];

export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true;

  return (
    ALLOWED_ORIGINS.includes(origin) || origin.startsWith("http://localhost")
  );
}

export function getAllowedOrigin(origin: string | null): string {
  if (!origin) return ALLOWED_ORIGINS[0];

  if (process.env.NODE_ENV === "development") {
    return origin;
  }

  if (isOriginAllowed(origin)) {
    return origin;
  }

  return ALLOWED_ORIGINS[0];
}

export function addCorsHeaders(
  response: NextResponse,
  request?: NextRequest,
): NextResponse {
  const origin = request?.headers.get("origin") ?? null;

  response.headers.set("Access-Control-Allow-Origin", getAllowedOrigin(origin));
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept, Origin",
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Max-Age", "86400");

  return response;
}

export function createCorsPreflightResponse(
  request?: NextRequest,
): NextResponse {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response, request);
}
