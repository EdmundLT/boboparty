import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './i18n.config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files, images, and Next.js internals
  const shouldSkip =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    /\.(jpg|jpeg|png|gif|svg|ico|webp|css|js|woff|woff2|ttf|eot)$/i.test(pathname)

  if (shouldSkip) {
    return NextResponse.next()
  }

  // Check if pathname starts with /en
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return NextResponse.next()
  }

  // Check if pathname starts with /zh-TW and redirect to root
  if (pathname.startsWith('/zh-TW/')) {
    const newPath = pathname.replace('/zh-TW', '')
    return NextResponse.redirect(new URL(newPath || '/', request.url))
  }

  if (pathname === '/zh-TW') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Rewrite root paths to /zh-TW internally (without changing URL)
  return NextResponse.rewrite(new URL(`/zh-TW${pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
