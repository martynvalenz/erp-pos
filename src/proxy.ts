// src/proxy.ts
import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";
import {
  API_PREFIX,
  AUTH_ROUTES_PREFIX,
  LOGIN_ROUTE,
  PROTECTED_PREFIX,
} from "@/config/routes";
import { addCorsHeaders, createCorsPreflightResponse } from "@/lib/cors";

const PUBLIC_API_ROUTES = ["/api/healthcheck"];

const PROTECTED_API_PREFIXES = ["/api/v1/protected"];

function isAuthRoute(pathname: string) {
  return (
    pathname === AUTH_ROUTES_PREFIX ||
    pathname.startsWith(`${AUTH_ROUTES_PREFIX}/`)
  );
}

function isProtectedAppRoute(pathname: string) {
  return (
    pathname === PROTECTED_PREFIX || pathname.startsWith(`${PROTECTED_PREFIX}/`)
  );
}

function isPublicApiRoute(pathname: string) {
  return PUBLIC_API_ROUTES.includes(pathname);
}

function isProtectedApiRoute(pathname: string) {
  return PROTECTED_API_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function createLoginRedirect(request: NextRequest) {
  const loginUrl = new URL(LOGIN_ROUTE, request.url);

  const callbackUrl = request.nextUrl.pathname + request.nextUrl.search;

  loginUrl.searchParams.set("callbackUrl", callbackUrl);

  return NextResponse.redirect(loginUrl);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isApiRoute = pathname.startsWith(API_PREFIX);

  if (isApiRoute && request.method === "OPTIONS") {
    return createCorsPreflightResponse(request);
  }

  const sessionCookie = getSessionCookie(request);
  const isLoggedIn = Boolean(sessionCookie);

  /**
   * Public API routes
   * Example: /api/healthcheck
   */
  if (isPublicApiRoute(pathname)) {
    const response = NextResponse.next();
    return addCorsHeaders(response, request);
  }

  /**
   * Protected API routes
   * Example: /api/v1/protected/*
   *
   * This is only a cookie check.
   * You should still validate the session inside the API route.
   */
  if (isProtectedApiRoute(pathname)) {
    if (!isLoggedIn) {
      const response = NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );

      return addCorsHeaders(response, request);
    }

    const response = NextResponse.next();
    return addCorsHeaders(response, request);
  }

  /**
   * Other API routes
   * Example: /api/auth/*
   *
   * Let Better Auth and your public APIs work normally.
   */
  if (isApiRoute) {
    const response = NextResponse.next();
    return addCorsHeaders(response, request);
  }

  /**
   * Auth pages
   * Example: /auth/login
   *
   * A session cookie is only a coarse signal here. It may be stale or
   * invalid, so do not redirect away from the login page based on cookie
   * presence alone. The page/server session lookup is the source of truth.
   */
  if (isAuthRoute(pathname)) {
    return NextResponse.next();
  }

  /**
   * Protected app pages
   * Example: /main/*
   */
  if (isProtectedAppRoute(pathname)) {
    if (!isLoggedIn) {
      return createLoginRedirect(request);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/main/:path*", "/api/:path*"],
};
