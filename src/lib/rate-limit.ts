import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiter for Edge Middleware
// Note: This is per-region and per-instance on Vercel. 
// For a production-grade distributed rate limiter, use Upstash Redis.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()

const WINDOW_SIZE = 60 * 1000 // 1 minute
const MAX_REQUESTS = 20 // 20 requests per minute

export function rateLimiter(req: NextRequest) {
  // @ts-ignore - ip might not be in the type but is available in Edge Middleware
  const ip = req.ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous'
  const now = Date.now()
  
  const record = rateLimitMap.get(ip) || { count: 0, lastReset: now }
  
  if (now - record.lastReset > WINDOW_SIZE) {
    record.count = 1
    record.lastReset = now
  } else {
    record.count++
  }
  
  rateLimitMap.set(ip, record)
  
  if (record.count > MAX_REQUESTS) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': Math.ceil((record.lastReset + WINDOW_SIZE - now) / 1000).toString(),
      },
    })
  }
  
  return null
}
