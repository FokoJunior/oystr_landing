import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Configuration: The date after which the full site becomes public
    const LAUNCH_DATE = new Date('2026-07-15T00:00:00Z');
    const now = new Date();

    // If we are before the launch date and trying to access anything other than the root (Coming Soon)
    if (now < LAUNCH_DATE && pathname !== '/') {
        // Allow static assets, images, internal next paths, and the public marketing pages
        if (
            pathname.startsWith('/_next') ||
            pathname.startsWith('/api') ||
            pathname.startsWith('/home') ||
            pathname.startsWith('/about') ||
            pathname.startsWith('/contact') ||
            pathname.includes('.')
        ) {
            return NextResponse.next();
        }

        // Redirect to the "Coming Soon" page
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
