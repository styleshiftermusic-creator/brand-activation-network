import { NextResponse } from 'next/server';
import { GemmaService } from '@/lib/ai/gemma';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { z } from 'zod';

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
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per minute
  analytics: true,
}) : null;

const gemmaRequestSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  systemPrompt: z.string().optional(),
  stream: z.boolean().optional().default(false),
  model: z.enum(["gemma-4-7b", "gemma-4-26b-moe", "gemma-4-31b-dense"]).optional().default("gemma-4-26b-moe"),
});

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (ratelimit) {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.json({ error: "Too many requests. Gemma 4 is thinking hard, please wait." }, { status: 429 });
      }
    }

    // 2. Parse Request
    const body = await req.json();
    const parsed = gemmaRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { prompt, systemPrompt, stream, model } = parsed.data;

    // 3. System Instructions (Default to a helpful Brand Activation assistant)
    const finalSystemPrompt = systemPrompt || "You are an elite AI assistant for the Brand Activation Network. Your goal is to help users scale their personal brands, optimize their outreach, and master business systems using the principles of the BAN Blueprint. Be concise, strategic, and professional.";

    // 4. Execution
    if (stream) {
      const gemmaStream = await GemmaService.generateStream(finalSystemPrompt, prompt, model);
      
      // If it's a ReadableStream (from Ollama fallback)
      if (gemmaStream instanceof ReadableStream) {
        return new Response(gemmaStream, {
          headers: {
            'Content-Type': 'application/json', // Ollama returns JSON chunks
            'Cache-Control': 'no-cache',
          },
        });
      }

      // If it's an AsyncIterable (from Google SDK)
      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of gemmaStream as AsyncIterable<{ text: () => string }>) {
              const text = chunk.text();
              controller.enqueue(encoder.encode(text));
            }
            controller.close();
          } catch (err) {
            controller.error(err);
          }
        },
      });

      return new Response(readableStream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
        },
      });
    } else {
      const response = await GemmaService.generateCompletion(finalSystemPrompt, prompt, model);
      return NextResponse.json({ success: true, text: response });
    }

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process request with Gemma 4.";
    console.error("Gemma API Error:", error);
    return NextResponse.json({ 
      error: message 
    }, { status: 500 });
  }
}
