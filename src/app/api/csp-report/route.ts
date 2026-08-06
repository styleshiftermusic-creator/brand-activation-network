import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const dynamic = "force-dynamic";

// Rate limiting setup
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken ? new Redis({
    url: redisUrl,
    token: redisToken,
}) : null;

const ratelimit = redis ? new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 reports per minute per IP
    analytics: true,
}) : null;

export async function POST(req: Request) {
    try {
        // IP Rate Limiting (degrades gracefully if Redis is unavailable)
        const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
        if (ratelimit) {
            try {
                const { success } = await ratelimit.limit(ip);
                if (!success) {
                    console.warn(`Rate limit exceeded for CSP Report IP: ${ip}`);
                    return NextResponse.json({ success: false, error: "Too many requests" }, { status: 429 });
                }
            } catch (rateLimitErr) {
                console.warn("Rate limiter unavailable for CSP, skipping:", rateLimitErr);
            }
        }

        const body = await req.json();
        console.log("CSP Violation Report:", JSON.stringify(body, null, 2));
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}
