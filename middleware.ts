import { NextRequest, NextResponse } from 'next/server'

const rateLimitMap = new Map<string, number[]>()

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? '127.0.0.1'
  const limit = 10
  const windowMs = 60 * 1000

  if (request.nextUrl.pathname.startsWith('/api/')) {
    const now = Date.now()
    const windowStart = now - windowMs
    
    const requests = rateLimitMap.get(ip) || []
    const recentRequests = requests.filter((time: number) => time > windowStart)
    
    if (recentRequests.length >= limit) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }
    
    recentRequests.push(now)
    rateLimitMap.set(ip, recentRequests)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
