import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { rateLimiter } from './lib/rate-limit'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')

  // 1. Basic CSRF Protection for API routes
  if (pathname.startsWith('/api') && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    // If there's an origin, it must match the host
    if (origin && !origin.includes(host || '')) {
      return new NextResponse('Invalid Origin', { status: 403 })
    }
  }

  // 2. Rate Limiting for API routes
  if (pathname.startsWith('/api')) {
    const rateLimitResponse = rateLimiter(request)
    if (rateLimitResponse) return rateLimitResponse
  }

  const response = NextResponse.next()

  // 3. Essential Security Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
