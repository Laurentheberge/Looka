import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, rateLimitResponse, RATE_LIMITS } from "@/lib/rate-limit";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply to API routes
  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Find matching rate limit config
  const config = RATE_LIMITS[pathname];
  if (!config) {
    return NextResponse.next();
  }

  // Use IP + path as rate limit key
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "anonymous";
  const key = `${ip}:${pathname}`;

  const { allowed, remaining, resetAt } = checkRateLimit(key, config);

  if (!allowed) {
    return rateLimitResponse(resetAt);
  }

  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Remaining", String(remaining));
  response.headers.set("X-RateLimit-Reset", String(Math.ceil(resetAt / 1000)));

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
