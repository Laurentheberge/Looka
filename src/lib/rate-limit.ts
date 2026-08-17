import { NextRequest, NextResponse } from "next/server";

/**
 * Simple in-memory rate limiter for API routes.
 * In production, replace with Upstash Redis or similar.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, {
      count: 1,
      resetAt: now + config.windowMs,
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetAt: now + config.windowMs,
    };
  }

  entry.count++;

  return {
    allowed: entry.count <= config.maxRequests,
    remaining: Math.max(0, config.maxRequests - entry.count),
    resetAt: entry.resetAt,
  };
}

export function rateLimitResponse(resetAt: number): NextResponse {
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: {
        "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
      },
    }
  );
}

/**
 * Rate limit configs per route
 */
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  "/api/chat": { windowMs: 60_000, maxRequests: 20 },
  "/api/summarize": { windowMs: 60_000, maxRequests: 10 },
  "/api/practice": { windowMs: 60_000, maxRequests: 10 },
  "/api/study-plan": { windowMs: 60_000, maxRequests: 5 },
  "/api/payment/initiate": { windowMs: 300_000, maxRequests: 3 },
  "/api/payment/verify": { windowMs: 60_000, maxRequests: 10 },
  "/api/payment/webhook": { windowMs: 60_000, maxRequests: 100 },
};
