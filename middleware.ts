import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files, images, and Next.js internals
  const shouldSkip =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    /\.(jpg|jpeg|png|gif|svg|ico|webp|mp4|webm|mov|vtt|css|js|woff|woff2|ttf|eot)$/i.test(pathname)

  if (shouldSkip) {
    return NextResponse.next()
  }

  // Check if pathname starts with /en
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return NextResponse.next()
  }

  // Allow the internal locale route. Canonical metadata points to the public root URL.
  if (pathname.startsWith('/zh-TW/')) {
    return NextResponse.next()
  }

  if (pathname === '/zh-TW') {
    return NextResponse.next()
  }

  // Rewrite root paths to /zh-TW internally (without changing URL)
  return NextResponse.rewrite(new URL(pathname === '/' ? '/zh-TW' : `/zh-TW${pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
