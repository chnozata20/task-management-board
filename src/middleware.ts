import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const defaultLocale = 'tr';
const locales = ['tr', 'en'];

// Suspicious bot User-Agents
const suspiciousUserAgents = [
  'bot',
  'spider',
  'crawl',
  'curl',
  'wget',
  'scrape',
  'phantom',
  'selenium',
  'headless'
];

// Allowed bot User-Agents
const allowedBots = [
  'Googlebot',
  'Bingbot',
  'Slurp',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot'
];

function isSuspiciousBot(userAgent: string): boolean {
  // Mark as suspicious if User-Agent is missing
  if (!userAgent) return true;

  // Check for allowed bots
  if (allowedBots.some(bot => userAgent.includes(bot))) {
    return false;
  }

  // Check for suspicious bot patterns
  return suspiciousUserAgents.some(pattern => 
    userAgent.toLowerCase().includes(pattern)
  );
}

export function middleware(request: NextRequest) {
  // Create response
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Bot detection
  const userAgent = request.headers.get('user-agent') || '';
  if (isSuspiciousBot(userAgent)) {
    // Return 403 error for suspicious bot detection
    return new NextResponse(null, {
      status: 403,
      statusText: 'Forbidden',
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }

  // Get locale from URL
  const pathname = request.nextUrl.pathname;

  // Check if pathname doesn't start with a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Check browser language
    const acceptLanguage = request.headers.get('accept-language');
    let preferredLocale = defaultLocale;

    if (acceptLanguage) {
      const preferredLanguages = acceptLanguage.split(',');
      for (const language of preferredLanguages) {
        const locale = language.split(';')[0].split('-')[0];
        if (locales.includes(locale)) {
          preferredLocale = locale;
          break;
        }
      }
    }

    // Redirect to preferred language
    return NextResponse.redirect(
      new URL(`/${preferredLocale}${pathname}`, request.url)
    );
  }

  return response;
}

// Specify paths where middleware will run
export const config = {
  // All paths except those starting with /_next/ and static files (favicon.ico, robots.txt etc.)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)']
}; 